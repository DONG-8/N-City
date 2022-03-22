package com.nft.ncity.domain.guestbook.db.repository;

import com.nft.ncity.domain.guestbook.db.entity.QGuestbook;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
                .where(qGuestbook.guestbookId.eq(guestbookId))
                .execute();
        return execute;
    }
}
