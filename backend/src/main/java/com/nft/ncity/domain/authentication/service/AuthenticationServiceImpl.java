package com.nft.ncity.domain.authentication.service;

import com.amazonaws.AmazonClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;
import com.nft.ncity.domain.authentication.db.entity.AuthFile;
import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.db.repository.AuthFileRepository;
import com.nft.ncity.domain.authentication.db.repository.AuthenticationRepository;
import com.nft.ncity.domain.authentication.db.repository.AuthenticationRepositorySupport;
import com.nft.ncity.domain.authentication.request.AuthenticationRegisterPostReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service("AuthenticationService")
public class AuthenticationServiceImpl implements AuthenticationService{

    // 버킷 이름 동적 할당
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    @Autowired
    AuthenticationRepositorySupport authenticationRepositorySupport;

    @Autowired
    AuthenticationRepository authenticationRepository;

    @Autowired
    AuthFileRepository authFileRepository;

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
    public Authentication AuthenticationRegister(AuthenticationRegisterPostReq authenticationRegisterPostReq, MultipartFile multipartFile) throws IOException{

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
        String fileName = createFileName(multipartFile.getOriginalFilename());

        // 파일 객체 생성
        // System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
        File file = new File(System.getProperty("user.dir") + fileName);

        multipartFile.transferTo(file);

        // S3 파일 업로드
        uploadOnS3(fileName, file);
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

        return authentication;
    }

    private void uploadOnS3(final String findName, final File file) {
        // AWS S3 전송 객체 생성
        final TransferManager transferManager = TransferManagerBuilder.standard()
                .withS3Client(amazonS3Client)
                .build();
        // 요청 객체 생성
        final PutObjectRequest request = new PutObjectRequest(bucket, findName, file);
        // 업로드 시도
        final Upload upload = transferManager.upload(request);

        try {
            upload.waitForCompletion();
        } catch (AmazonClientException amazonClientException) {
            log.error(amazonClientException.getMessage());
        } catch (InterruptedException e) {
            log.error(e.getMessage());
        }
    }

    public void deleteFile(String fileName) {
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }

    private String createFileName(String fileName) { // 먼저 파일 업로드 시, 파일명을 난수화하기 위해 random으로 돌립니다.
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) { // file 형식이 잘못된 경우를 확인하기 위해 만들어진 로직이며, 파일 타입과 상관없이 업로드할 수 있게 하기 위해 .의 존재 유무만 판단하였습니다.
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }
}
