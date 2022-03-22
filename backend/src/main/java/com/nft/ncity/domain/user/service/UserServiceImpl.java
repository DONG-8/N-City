package com.nft.ncity.domain.user.service;

import com.nft.ncity.domain.authentication.service.AwsS3Service;
import com.nft.ncity.domain.follow.db.repository.FollowRepositorySupport;
import com.nft.ncity.domain.user.db.entity.EmailAuth;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.db.repository.EmailAuthRepositorySupport;
import com.nft.ncity.domain.user.db.repository.UserRepository;
import com.nft.ncity.domain.user.db.repository.UserRepositorySupport;
import com.nft.ncity.domain.user.request.UserModifyUpdateReq;
import com.nft.ncity.domain.user.response.UserInfoRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    AwsS3Service awsS3Service;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    EmailAuthRepositorySupport emailAuthRepositorySupport;

    @Autowired
    FollowRepositorySupport followRepositorySupport;

    @Autowired
    EmailService emailService;

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
        EmailAuth emailAuth = emailAuthRepositorySupport.emailAuthRegister(emailAuthEmail);

        // 해당 이메일로 인증메일 전송
        emailService.send(emailAuth.getEmailAuthEmail(),emailAuth.getEmailAuthToken());
        return emailAuth;
    }

    @Override
    @Transactional
    public void confirmEmail(String emailAuthEmail, String authToken) {
        // emailAuth 테이블 갱신
        EmailAuth emailAuth = emailAuthRepositorySupport.findValidAuthByEmail(emailAuthEmail,authToken, LocalDateTime.now()).get();
        emailAuth.useToken();

        User user = userRepository.findByUserEmail(emailAuthEmail).get();
        user.emailVerifiedSuccess();

    }

    @Override
    public UserInfoRes getUserInfo(User user) {

        // userId를 팔로우 하는사람 수
        Long followerCnt = followRepositorySupport.getFollowerCount(user.getUserId());

        // userId가 팔로우 하는사람 수
        Long followeeCnt = followRepositorySupport.getFolloweeCount(user.getUserId());

        UserInfoRes userInfoRes = UserInfoRes.builder()
                .userId(user.getUserId())
                .authId(user.getAuthId())
                .followerCnt(followerCnt)
                .followeeCnt(followeeCnt)
                .userAddress(user.getUserAddress())
                .userDescription(user.getUserDescription())
                .userImgUrl(user.getUserImgUrl())
                .userEmail(user.getUserEmail())
                .userEmailConfirm(user.getUserEmailConfirm())
                .userNick(user.getUserNick())
                .userRole(user.getUserRole())
                .build();

        return userInfoRes;
    }

    @Override
    public List<User> searchUser(String userNick) {
        return userRepository.findTop15ByUserNickContaining(userNick);
    }

}


