package com.nft.ncity.domain.deal.db.repository;

import com.nft.ncity.domain.deal.db.entity.QDeal;
import com.nft.ncity.domain.deal.request.AuctionRegisterPostReq;
import com.nft.ncity.domain.deal.request.BuyNowRegisterPostReq;
import com.nft.ncity.domain.product.db.entity.QProduct;
import com.nft.ncity.domain.product.request.TokenRegisterPutReq;
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


    // 즉시구매등록 - 상품table update
    @Transactional
    public long modifyProductForBuyNowByProductId(BuyNowRegisterPostReq buyNowRegisterPostReq){
        long excute = jpaQueryFactory.update(qProduct)
                .set(qProduct.productState,2)
                .set(qProduct.productPrice, buyNowRegisterPostReq.getDealPrice())
                .where(qProduct.productId.eq(buyNowRegisterPostReq.getProductId()))
                .execute();
        return excute;
    }

    // 경매등록 -  상품table update
    @Transactional
    public long modifyProductForAuctionByProductId(AuctionRegisterPostReq auctionRegisterPostReq){
        long excute = jpaQueryFactory.update(qProduct)
                .set(qProduct.productState,1)
                .set(qProduct.productAuctionEndTime, auctionRegisterPostReq.getProductAuctionEndTime())
                .set(qProduct.productPrice, auctionRegisterPostReq.getDealPrice())
                .where(qProduct.productId.eq(auctionRegisterPostReq.getProductId()))
                .execute();
        return excute;
    }

    // 경매참가 -  상품table 가격update
    @Transactional
    public long modifyProductPriceByProductId(BuyNowRegisterPostReq buyNowRegisterPostReq){
        long excute = jpaQueryFactory.update(qProduct)
                .set(qProduct.productPrice, buyNowRegisterPostReq.getDealPrice())
                .where(qProduct.productId.eq(buyNowRegisterPostReq.getProductId()))
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
