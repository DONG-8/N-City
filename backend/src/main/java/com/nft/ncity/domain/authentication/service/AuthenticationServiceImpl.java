package com.nft.ncity.domain.authentication.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.nft.ncity.domain.authentication.db.entity.AuthFile;
import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.db.repository.AuthFileRepository;
import com.nft.ncity.domain.authentication.db.repository.AuthenticationRepository;
import com.nft.ncity.domain.authentication.db.repository.AuthenticationRepositorySupport;
import com.nft.ncity.domain.authentication.request.AuthenticationRegisterPostReq;
import com.nft.ncity.domain.authentication.request.AuthenticationConfirmReq;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Service("AuthenticationService")
public class AuthenticationServiceImpl implements AuthenticationService{

    // 버킷 이름 동적 할당
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    @Autowired
    AwsS3Service awsS3Service;

    @Autowired
    AuthenticationRepositorySupport authenticationRepositorySupport;

    @Autowired
    AuthenticationRepository authenticationRepository;

    @Autowired
    AuthFileRepository authFileRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Page<Authentication> getAuthenticationListByType(int authType, Pageable pageable) {

        Page<Authentication> authentications = authenticationRepositorySupport.findAuthenticationListByType(authType, pageable);

        return authentications;
    }

    @Override
    public Authentication getAuthenticationDetailByAuthId(Long authId) {

        Authentication authentication = authenticationRepositorySupport.findAuthenticationDetailByAuthId(authId);

        return authentication;
    }


    @Override
    @Transactional
    public Authentication AuthenticationRegister(AuthenticationRegisterPostReq authenticationRegisterPostReq, MultipartFile multipartFile, Long userId) throws IOException{

        // 1. 인증 등록 정보를 Authentication 테이블에 저장하고, 해당 인증 ID와 함께 인증 파일들을 AuthFile 테이블에 저장한다.
        // 2. 저장 결과 성공적이면 200, 중간에 다른 정보들이 없으면 404

        Authentication authentication = Authentication.builder()
                .authName(authenticationRegisterPostReq.getAuthName())
                .authEmail(authenticationRegisterPostReq.getAuthEmail())
                .authType(authenticationRegisterPostReq.getAuthType())
                .authRegAt(LocalDateTime.now())
                .build();

        // 인증 등록정보 저장
        Authentication savedAuthentication = authenticationRepository.save(authentication);

        String fileUrl;

        // 실제 파일 이름을 받아서 랜덤한 이름으로 변경해준다.
        String fileName = awsS3Service.createFileName(multipartFile.getOriginalFilename());

        // 파일 객체 생성
        // System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
        File file = new File(System.getProperty("user.dir") + fileName);

        // 파일 변환
        multipartFile.transferTo(file);

        // S3 파일 업로드
        awsS3Service.uploadOnS3(fileName, file);
        // 주소 할당
        fileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

        // 파일 삭제
        file.delete();

        AuthFile authFile = AuthFile.builder()
                .authId(savedAuthentication)
                .fileName(fileName)
                .fileSize(multipartFile.getSize())
                .fileContentType(multipartFile.getContentType())
                .fileUrl(fileUrl)
                .regDt(LocalDateTime.now())
                .build();

        // 인증 등록에 사용된 파일 저장.
        authFileRepository.save(authFile);

        // 인증등록한 파일 url 인증등록 정보에도 저장.
        savedAuthentication.authUrlRegister(fileUrl);

        /**
         * 유저 아이디 받아와서 해당 유저에 인증 id 넣어야함.
         */
        // 등록한 인증 Id를 유저 테이블에도 저장

        User user = userRepository.findUserByUserId(userId).get();
        user.authIdRegister(savedAuthentication.getAuthId());
        //userRepository.save(user);

        return authentication;
    }

    @Override
    public Long modifyUserRole(AuthenticationConfirmReq authenticationConfirmReq) {
        Long execute = authenticationRepositorySupport.updateUserRoleByAuth(authenticationConfirmReq);

        return execute;
    }
}
