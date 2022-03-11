package com.nft.ncity.domain.authentication.db.repository;

import com.nft.ncity.domain.authentication.db.entity.Authentication;
import org.hibernate.sql.Delete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthenticationRepository extends JpaRepository<Authentication, Long> {
    
}
