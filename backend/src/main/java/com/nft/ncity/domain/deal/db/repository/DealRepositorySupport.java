package com.nft.ncity.domain.deal.db.repository;

import com.nft.ncity.domain.deal.db.entity.Deal;
import com.nft.ncity.domain.deal.db.entity.QDeal;
import com.nft.ncity.domain.deal.request.AuctionRegisterPostReq;
import com.nft.ncity.domain.deal.request.BuyNowRegisterPostReq;
import com.nft.ncity.domain.deal.response.DealListGetRes;
import com.nft.ncity.domain.product.db.entity.QProduct;
import com.nft.ncity.domain.product.request.TokenRegisterPutReq;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class DealRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QDeal qDeal = QDeal.deal;

    QProduct qProduct = QProduct.product;

    // 즉시구매등록 - 상품table update
    @Transactional
    public long modifyProductForBuyNowRegisterByProductId(BuyNowRegisterPostReq buyNowRegisterPostReq){
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

    //즉시구매
    @Transactional
    public long modifyProductForBuyNowByProductId(Long productId, Long userId){

        // x,y좌표, product view 초기화 해야하면 여기 추가!
        long excute = jpaQueryFactory.update(qProduct)
                .set(qProduct.userId,userId)
                .set(qProduct.productState,3)
                .set(qProduct.productPrice,0.0)
                .where(qProduct.productId.eq(productId))
                .execute();
        return excute;
    }

    //즉시구매취소
    @Transactional
    public long modifyProductForBuyNowCancelByProductId(Long productId, Long userId){

        long excute = jpaQueryFactory.update(qProduct)
                .set(qProduct.productPrice,0.0)
                .set(qProduct.productState,3)
                .where(qProduct.productId.eq(productId))
                .execute();
        return excute;
    }

    //경매 입찰
    @Transactional
    public long modifyProductForBuyAuctionByProductId(Long productId, Long userId){

        // x,y좌표, product view 초기화 해야하면 여기 추가!
        long excute = jpaQueryFactory.update(qProduct)
                .set(qProduct.userId,userId)
                .set(qProduct.productState,3)
                .set(qProduct.productPrice,0.0)
                .where(qProduct.productId.eq(productId))
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


    // READ
    // 거래내역
    @Transactional
    public Page<Deal> findDealListByProductId(Pageable pageable, Long productId){
        List<Deal> dealListQueryResults = jpaQueryFactory.select(qDeal)
                .from(qDeal)
                .where(qDeal.productId.eq(productId))
                .orderBy(qDeal.dealCreatedAt.desc())
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();
        if(dealListQueryResults.isEmpty()) return Page.empty();

        return new PageImpl<Deal>(dealListQueryResults,pageable,dealListQueryResults.size());
    }

    public Page<Deal> findDealMintedListByUserId(Long userId, Pageable pageable) {
        List<Deal> dealList = jpaQueryFactory.select(qDeal)
                .from(qDeal)
                .where(qDeal.dealType.eq(6).and(qDeal.dealTo.eq(userId)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        if(dealList.isEmpty()) return Page.empty();

        return new PageImpl<Deal>(dealList,pageable,dealList.size());
    }

    public Page<Deal> findDealListByUserId(Long userId, Pageable pageable) {
        List<Deal> deals = jpaQueryFactory.select(qDeal)
                .from(qDeal)
                .where(qDeal.dealTo.eq(userId).or(qDeal.dealFrom.eq(userId)))
                .orderBy(qDeal.dealCreatedAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        if (deals.isEmpty()) return Page.empty();

        return new PageImpl<Deal>(deals, pageable, deals.size());
    }
}
