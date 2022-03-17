package com.nft.ncity.domain.user.db.repository;

import com.nft.ncity.domain.user.db.entity.EmailAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailAuthRepository extends JpaRepository<EmailAuth, Long> {
}
