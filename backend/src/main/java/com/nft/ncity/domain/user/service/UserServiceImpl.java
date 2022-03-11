package com.nft.ncity.domain.user.service;

import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Override
    public User getUserByEmail(String userEmail) {
        // 디비에 유저 정보 조회 (userEmail 를 통한 조회).
        User user = userRepositorySupport.findByEmail(userEmail).orElse(null);

        System.out.println(user); // 추가
        return user;
    }

}


