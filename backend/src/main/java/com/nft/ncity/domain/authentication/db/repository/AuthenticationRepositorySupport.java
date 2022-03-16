package com.nft.ncity.domain.authentication.db.repository;

import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.db.entity.QAuthentication;
import com.nft.ncity.domain.follow.request.AuthenticationConfirmReq;
import com.nft.ncity.domain.user.db.entity.QUser;
import com.nft.ncity.domain.user.db.entity.User;
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

    QUser qUser = QUser.user;

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

    public Long updateUserRoleByAuth(AuthenticationConfirmReq authenticationConfirmReq) {
        Long authId = authenticationConfirmReq.getAuthId();
        String authRole = "ROLE_USER";
        Long execute = 0L;
        // 수락 이면
        if(authenticationConfirmReq.isConfirm()) {
            int authType = authenticationConfirmReq.getAuthType();

            if(authType == 3) authRole = "ROLE_ENTERPRISE";
            else if(authType == 4) authRole = "ROLE_ARTIST";
            else if(authType == 5) authRole = "ROLE_INFLUENCER";
            execute = jpaQueryFactory.update(qUser)
                    .set(qUser.userRole, authRole)
                    .where(qUser.authId.eq(authId))
                    .execute();
        }
        else {
            execute = jpaQueryFactory.update(qUser)
                    .set(qUser.userRole, authRole)
                    .where(qUser.authId.eq(authId))
                    .execute();
        }

        return execute;
    }
}
