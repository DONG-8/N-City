package com.nft.ncity.domain.authentication.db.repository;

import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.db.entity.QAuthentication;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AuthenticationRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QAuthentication qAuthentication = QAuthentication.authentication;

    public Page<Authentication> findAuthenticationListByType(int authType, Pageable pageable) {
        List<Authentication> authenticationQueryResults = jpaQueryFactory.select(qAuthentication)
                .from(qAuthentication)
                .where(qAuthentication.authType.eq(authType))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        if(authenticationQueryResults.isEmpty()) return Page.empty();

        return new PageImpl<Authentication>(authenticationQueryResults, pageable, authenticationQueryResults.size());

    }

    public Authentication findAuthenticationDetailByAuthId(Long authId) {
        Authentication authentication = jpaQueryFactory.select(qAuthentication)
                .from(qAuthentication)
                .where(qAuthentication.authId.eq(authId))
                .fetchOne();

        if(authentication.equals(null)) return null;

        return authentication;

    }

}
