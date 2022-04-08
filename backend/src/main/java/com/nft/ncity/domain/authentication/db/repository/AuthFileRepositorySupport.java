package com.nft.ncity.domain.authentication.db.repository;


import com.nft.ncity.domain.authentication.db.entity.QAuthFile;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public class AuthFileRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    QAuthFile qAuthFile = QAuthFile.authFile;

    @Transactional
    public void deleteAuthFileByAuthId(Long authId) {

        jpaQueryFactory.delete(qAuthFile)
                .where(qAuthFile.authId.authId.eq(authId))
                .execute();
    }
}
