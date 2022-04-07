package com.nft.ncity.domain.guestbook.db.repository;

import com.nft.ncity.domain.guestbook.db.entity.QGuestbook;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Repository
@Transactional
public class GuestbookRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QGuestbook qGuestbook = QGuestbook.guestbook;

    public Long modifyGuestbook(Long guestbookId, String guestbookContents) {
        Long execute = 0L;
        execute =  jpaQueryFactory.update(qGuestbook)
                .set(qGuestbook.guestbookContents, guestbookContents)
                .set(qGuestbook.guestbookCreatedAt, LocalDateTime.now())
                .where(qGuestbook.guestbookId.eq(guestbookId))
                .execute();
        return execute;
    }
}
