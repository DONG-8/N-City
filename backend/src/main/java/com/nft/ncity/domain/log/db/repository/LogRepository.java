package com.nft.ncity.domain.log.db.repository;

import com.nft.ncity.domain.log.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LogRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUserAddress(String userAddress);
}
