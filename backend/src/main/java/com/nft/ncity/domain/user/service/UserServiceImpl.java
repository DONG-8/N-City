package com.nft.ncity.domain.user.service;

import com.nft.ncity.domain.authentication.service.AwsS3Service;
import com.nft.ncity.domain.user.db.entity.EmailAuth;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.db.repository.UserRepositorySupport;
import com.nft.ncity.domain.user.request.UserModifyUpdateReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    AwsS3Service awsS3Service;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Override
    public User getUserByEmail(String userEmail) {
        // 디비에 유저 정보 조회 (userEmail 를 통한 조회).
        User user = userRepositorySupport.findByEmail(userEmail).orElse(null);
        System.out.println(user); // 추가
        return user;
    }

    /**
     * 프로필 이미지 변경 포함
     * @param userInfo
     * @param profileImg
     * @return Long (수정 성공한 행 개수)
     */
    @Override
    public Long userUpdateWithProfileImg(UserModifyUpdateReq userInfo, MultipartFile profileImg) throws IOException {
        Long execute = userRepositorySupport.userUpdateWithProfileImg(userInfo, profileImg);

        return execute;
    }

    /**
     * 프로필 이미지 포함하지 않음.
     * @param userInfo
     * @return Long (수정 성공한 행 개수)
     */
    @Override
    public Long userUpdateNoProfileImg(UserModifyUpdateReq userInfo) {
        Long execute = userRepositorySupport.userUpdateNoProfileImg(userInfo);
        return execute;
    }

    @Override
    public EmailAuth EmailAuthRegister(String emailAuthEmail) {
        return null;
    }

}


