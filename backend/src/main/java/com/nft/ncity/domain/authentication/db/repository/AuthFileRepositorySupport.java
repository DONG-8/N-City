package com.nft.ncity.domain.authentication.db.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AuthFileRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    QAuthFile qAuthFile = QAuthFile.authFile;


}
