package com.nft.ncity.domain.deal.db.repository;

import com.nft.ncity.domain.deal.db.entity.QDeal;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DealRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QDeal qDeal = QDeal.deal;



}
