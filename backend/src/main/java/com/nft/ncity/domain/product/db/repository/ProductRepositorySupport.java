package com.nft.ncity.domain.product.db.repository;

import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.db.entity.QProduct;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public class ProductRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QProduct qProduct = QProduct.product;



    @Transactional
    public long updateProductByProductId(ProductModifyPutReq productModifyPutReq){
        long execute = jpaQueryFactory.update(qProduct)
                .set(qProduct.productTitle,productModifyPutReq.getProductTitle())
                .set(qProduct.productDesc,productModifyPutReq.getProductDesc())
                .set(qProduct.productCode, productModifyPutReq.getProductCode())
                .where(qProduct.productId.eq(productModifyPutReq.getProductId()))
                .execute();
        return execute;
    }



}
