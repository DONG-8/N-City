package com.nft.ncity.domain.authentication.db.repository;

import com.nft.ncity.domain.authentication.db.entity.AuthFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthFileRepository extends JpaRepository<AuthFile, Long> {
    void deleteAuthFileByAuthId(Long authId);
}
