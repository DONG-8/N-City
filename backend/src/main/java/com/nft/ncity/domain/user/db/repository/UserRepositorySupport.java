package com.nft.ncity.domain.user.db.repository;

import com.amazonaws.services.s3.AmazonS3Client;
import com.nft.ncity.domain.authentication.service.AwsS3Service;
import com.nft.ncity.domain.user.db.entity.QUser;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.request.UserModifyUpdateReq;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@RequiredArgsConstructor
@Repository
@Transactional
public class UserRepositorySupport {
    // 버킷 이름 동적 할당
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    @Autowired
    AwsS3Service awsS3Service;

    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;


    public Optional<User> findByEmail(String userEmail) {
        // Querydsl
        // JPQL과 Querydsl에서 동일한 작업(특정 회원 1명 조회)를 하는 코드이다.
        // 두 개의 큰 차이점으로 쿼리 문법 오류를 JPQL은 실행 시점에 발견할 수 있으며, Querydsl은 컴파일 시점에 발견 가능
        User user = jpaQueryFactory.select(qUser).from(qUser)   // 2차 오류 원인 가능
                .where(qUser.userEmail.eq(userEmail)).fetchOne(); // fetchOne() : 단건 조회시 사용

        if (null == user) return Optional.empty(); // user 비어있음
        return Optional.ofNullable(user); // 비어있지 않음
    }

    /**
     * 프로필 이미지도 변경
     * @param userInfo
     * @return
     */
    public Long userUpdateWithProfileImg(UserModifyUpdateReq userInfo, String userEmail) throws IOException {

        long execute = jpaQueryFactory.update(qUser)
                .set(qUser.userEmail, userEmail)
                .set(qUser.userNick, userInfo.getUserNick())
                .set(qUser.userDescription, userInfo.getUserDescription())
                .set(qUser.userImgUrl, userInfo.getUserImgUrl())
                .set(qUser.userEmailConfirm, true)
                .where(qUser.userId.eq(userInfo.getUserId()))
                .execute();
        return execute;
    }

    public Page<User> findUserList(Pageable pageable) {
        List<User> userList = jpaQueryFactory.select(qUser)
                .from(qUser)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        if(userList == null) return Page.empty();

        return new PageImpl<User>(userList,pageable,userList.size());
    }

    public Page<User> findNewUserList(Pageable pageable,String userRole) {

        List<User> userList;

        if(userRole.equals("ROLE_REQUEST")) {
            userList = jpaQueryFactory.select(qUser)
                    .from(qUser)
                    .where(qUser.userTokenRequest.eq(true))
                    .limit(pageable.getPageSize())
                    .offset(pageable.getOffset())
                    .fetch();
        }
        else {
            userList = jpaQueryFactory.select(qUser)
                    .from(qUser)
                    .where(qUser.userRole.eq(userRole))
                    .limit(pageable.getPageSize())
                    .offset(pageable.getOffset())
                    .fetch();
        }

        if(userList == null) return Page.empty();

        return new PageImpl<User>(userList,pageable,userList.size());
    }

    public Long updateUserRole(Long userId) {

        User user = jpaQueryFactory.select(qUser).from(qUser).where(qUser.userId.eq(userId)).fetchOne();

        Long execute = 0L;
        // 신규 유저이면 일반 등급으로 변경
        if(user.getUserRole().equals("ROLE_NEW")) {
            execute = jpaQueryFactory.update(qUser)
                    .where(qUser.userId.eq(userId))
                    .set(qUser.userRole,"ROLE_USER")
                    .execute();
        }
        // 그 외 일반등급 유저가 토큰 재요청한거면 해당유저 토큰 지급처리
        else if (user.getUserTokenRequest()){
            execute = jpaQueryFactory.update(qUser)
                    .where(qUser.userId.eq(userId))
                    .set(qUser.userTokenRequest,false)
                    .execute();
        }
        return execute;
    }

    public User findUserByUserId(Long userId) {
        User user = jpaQueryFactory.select(qUser)
                .from(qUser)
                .where(qUser.userId.eq(userId))
                .fetchOne();

        return user;
    }

    public Long updateUserTokenRequest(Long userId) {
        Long execute = jpaQueryFactory.update(qUser)
                .where(qUser.userId.eq(userId))
                .set(qUser.userTokenRequest,true)
                .execute();

        return execute;
    }
}
