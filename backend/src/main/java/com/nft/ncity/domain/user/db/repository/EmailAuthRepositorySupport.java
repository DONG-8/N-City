package com.nft.ncity.domain.user.db.repository;

import com.nft.ncity.domain.user.db.entity.EmailAuth;
import com.nft.ncity.domain.user.db.entity.QEmailAuth;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Repository
@Transactional
public class EmailAuthRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QEmailAuth qEmailAuth = QEmailAuth.emailAuth;

    @Autowired
    EmailAuthRepository emailAuthRepository;

    public Optional<EmailAuth> findValidAuthByEmail(String email, String authToken, LocalDateTime currentTime) {

        System.out.println("서포트 진영");
        System.out.println(email);
        System.out.println(authToken);
        System.out.println(currentTime);

        EmailAuth emailAuth = jpaQueryFactory
                .select(qEmailAuth)
                .from(qEmailAuth)
                .where(qEmailAuth.emailAuth.emailAuthEmail.eq(email)
                                .and(qEmailAuth.emailAuth.emailAuthToken.eq(authToken))
                                .and(qEmailAuth.emailAuth.emailAuthExpireDate.goe(currentTime))
                                .and(qEmailAuth.emailAuth.emailAuthExpired.eq(false)))
                .fetchFirst();

        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        System.out.println(emailAuth);
        return Optional.ofNullable(emailAuth);
    }

    public EmailAuth emailAuthRegister(String emailAuthEmail) {

        EmailAuth emailAuth = EmailAuth.builder()
                .emailAuthEmail(emailAuthEmail)
                .emailAuthToken(UUID.randomUUID().toString())
                .emailAuthExpired(false)
                .build();

        emailAuthRepository.save(emailAuth);

        return emailAuth;
    }
}
