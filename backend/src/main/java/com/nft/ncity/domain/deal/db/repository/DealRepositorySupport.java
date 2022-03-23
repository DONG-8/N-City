package com.nft.ncity.domain.deal.db.repository;

import com.nft.ncity.domain.deal.db.entity.QDeal;
import com.nft.ncity.domain.deal.request.DealRegisterPostReq;
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
    public long updateProductByProductId(DealRegisterPostReq dealRegisterPostReq){
        long excute = jpaQueryFactory.update(qProduct)
                .set(qProduct.productState,dealRegisterPostReq.getDealType())
                .set(qProduct.productPrice,dealRegisterPostReq.getPrice())
                .where(qProduct.productId.eq(dealRegisterPostReq.getProductId()))
                .execute();
        return excute;
    }


}
