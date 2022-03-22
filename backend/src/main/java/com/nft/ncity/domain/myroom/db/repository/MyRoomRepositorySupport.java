package com.nft.ncity.domain.myroom.db.repository;

import com.nft.ncity.domain.myroom.db.entity.QMyRoom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class MyRoomRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QMyRoom qMyRoom = QMyRoom.myRoom;

    public Long resetMyRoomToday() {
        return  jpaQueryFactory.update(qMyRoom)
                .set(qMyRoom.myRoomTodayCnt, 0)
                .execute();
    }
}
