package com.nft.ncity.domain.authentication.service;

import com.nft.ncity.domain.authentication.db.entity.AuthFile;
import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.db.repository.AuthenticationRepository;
import com.nft.ncity.domain.authentication.db.repository.AuthenticationRepositorySupport;
import com.nft.ncity.domain.authentication.request.AuthenticationRegisterPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service("AuthenticationService")
public class AuthenticationServiceImpl implements AuthenticationService{

    @Autowired
    AuthenticationRepositorySupport authenticationRepositorySupport;

    @Autowired
    AuthenticationRepository authenticationRepository;

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
    public Authentication AuthenticationRegister(AuthenticationRegisterPostReq authenticationRegisterPostReq, MultipartFile multipartFile) {

        // 1. 인증 등록 정보를 Authentication 테이블에 저장하고, 해당 인증 ID와 함께 인증 파일들을 AuthFile 테이블에 저장한다.
        // 2. 저장 결과 성공적이면 200, 중간에 다른 정보들이 없으면 404

        Authentication authentication = Authentication.builder()
                .authName(authenticationRegisterPostReq.getAuthName())
                .authEmail(authenticationRegisterPostReq.getAuthEmail())
                .authType(authenticationRegisterPostReq.getAuthType())
                .authRegAt(LocalDateTime.now())
                .build();

        Authentication savedAuthentication = authenticationRepository.save(authentication);

        String fileurl = "";

        AuthFile authFile = AuthFile.builder()
                .authId(savedAuthentication)
                .fileName(multipartFile.getOriginalFilename())
                .fileSize(multipartFile.getSize())
                .fileContentType(multipartFile.getContentType())
                .fileUrl(multipartFile.)
                .regDt(LocalDateTime.now())
                .build();



        return null;
    }
}
