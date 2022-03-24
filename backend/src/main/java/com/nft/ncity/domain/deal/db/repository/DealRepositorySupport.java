package com.nft.ncity.domain.deal.db.repository;

import com.nft.ncity.domain.deal.db.entity.QDeal;
import com.nft.ncity.domain.deal.request.DealRegisterPostReq;
import com.nft.ncity.domain.deal.request.TokenRegisterPutReq;
import com.nft.ncity.domain.product.db.entity.QProduct;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public class DealRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QDeal qDeal = QDeal.deal;

    QProduct qProduct = QProduct.product;

    @Transactional
    public long updateDealByProductId(DealRegisterPostReq dealRegisterPostReq){
        long excute = jpaQueryFactory.update(qDeal)
                .set(qDeal.dealType,dealRegisterPostReq.getDealType())
                .set(qDeal.dealPrice,dealRegisterPostReq.getDealPrice())
                .where(qDeal.productId.eq(dealRegisterPostReq.getProductId()))
                .execute();
        return excute;
    }

    @Transactional
    public long updateProductByProductId(DealRegisterPostReq dealRegisterPostReq){
        long excute = jpaQueryFactory.update(qProduct)
                .set(qProduct.productState,dealRegisterPostReq.getDealType())
                .set(qProduct.productPrice,dealRegisterPostReq.getDealPrice())
                .where(qProduct.productId.eq(dealRegisterPostReq.getProductId()))
                .execute();
        return excute;
    }
    @Transactional
    public long updateTokenByProductId(TokenRegisterPutReq tokenRegisterPutReq){
        long execute = jpaQueryFactory.update(qDeal)
                .set(qDeal.tokenId,tokenRegisterPutReq.getTokenId())
                .where(qDeal.productId.eq(tokenRegisterPutReq.getProductId()))
                .execute();
        return execute;
    }

}
