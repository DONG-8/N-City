package com.nft.ncity.domain.user.db.repository;

import com.nft.ncity.domain.user.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
    Optional<User> findUserByUserId(Long userId);
    Optional<User> findUserByUserNick(String userNick);
    Optional<User> findByUserEmail(String userEmail);
    Optional<User> findUserByAuthId(Long authId);
    List<User> findTop15ByUserNickContaining(String userNick);
}