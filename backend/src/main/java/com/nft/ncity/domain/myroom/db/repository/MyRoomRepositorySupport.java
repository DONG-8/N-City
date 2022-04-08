package com.nft.ncity.domain.myroom.db.repository;

import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import com.nft.ncity.domain.myroom.db.entity.QMyRoom;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    public List<MyRoom> findTop5ByOrderByMyRoomTotalCntDesc() {
        return jpaQueryFactory.select(qMyRoom)
                .from(qMyRoom)
                .limit(5)
                .fetch();
    }
}
