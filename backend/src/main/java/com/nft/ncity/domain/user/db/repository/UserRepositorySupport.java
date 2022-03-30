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
     * @param profileImg
     * @return
     */
    public Long userUpdateWithProfileImg(UserModifyUpdateReq userInfo, MultipartFile profileImg) throws IOException {

        // 실제 파일 이름을 받아서 랜덤한 이름으로 변경해준다.
        String fileName = awsS3Service.createFileName(profileImg.getOriginalFilename());

        // 파일 객체 생성
        // System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
        File file = new File(System.getProperty("user.dir") + fileName);

        // 파일 변환
        profileImg.transferTo(file);

        // S3 파일 업로드
        awsS3Service.uploadOnS3(fileName, file);
        // 주소 할당
        String fileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

        // 파일 삭제
        file.delete();

        long execute = jpaQueryFactory.update(qUser)
                .set(qUser.userEmail, userInfo.getUserEmail())
                .set(qUser.userNick, userInfo.getUserNick())
                .set(qUser.userDescription, userInfo.getUserDescription())
                .set(qUser.userImgUrl, fileUrl)
                .where(qUser.userId.eq(userInfo.getUserId()))
                .execute();
        return execute;

    }

    /**
     * 프로필 이미지 빼고 변경
     * @param userInfo
     * @return
     */
    public Long userUpdateNoProfileImg(UserModifyUpdateReq userInfo) {

        long execute = jpaQueryFactory.update(qUser)
                .set(qUser.userEmail, userInfo.getUserEmail())
                .set(qUser.userNick, userInfo.getUserNick())
                .set(qUser.userDescription, userInfo.getUserDescription())
                .set(qUser.userImgUrl, userInfo.getUserImgUrl())
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

    public Page<User> findNewUserList(Pageable pageable) {
        List<User> userList = jpaQueryFactory.select(qUser)
                .from(qUser)
                .where(qUser.userRole.eq("ROLE_NEW"))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        if(userList == null) return Page.empty();

        return new PageImpl<User>(userList,pageable,userList.size());
    }

    public Long updateUserRole(Long userId) {

        Long execute = jpaQueryFactory.update(qUser)
                .where(qUser.userId.eq(userId))
                .set(qUser.userRole,"ROLE_USER")
                .execute();

        return execute;
    }

    public User findUserByUserId(Long userId) {
        User user = jpaQueryFactory.select(qUser)
                .from(qUser)
                .where(qUser.userId.eq(userId))
                .fetchOne();

        return user;
    }
}
