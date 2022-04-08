package com.nft.ncity.domain.authentication.db.repository;

import com.nft.ncity.domain.authentication.db.entity.Authentication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface AuthenticationRepository extends JpaRepository<Authentication,Long> {
    
}
