package com.nft.ncity.domain.product.db.repository;

import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.db.entity.QProduct;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import com.nft.ncity.domain.product.request.TokenRegisterPutReq;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Locale;

@Repository
public class ProductRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    QProduct qProduct = QProduct.product;

    //CREATE
    @Transactional
    public long updateTokenByProductId(TokenRegisterPutReq tokenRegisterPutReq){
        long execute = jpaQueryFactory.update(qProduct)
                .set(qProduct.tokenId,tokenRegisterPutReq.getTokenId())
                .where(qProduct.productId.eq(tokenRegisterPutReq.getProductId()))
                .execute();
        return execute;
    }


    //READ
    public  Page<Product> findProductList(Pageable pageable) {
        List<Product> productQueryResults = jpaQueryFactory.select(qProduct)
                .from(qProduct)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        if(productQueryResults.isEmpty()) return Page.empty();

        return new PageImpl<Product>(productQueryResults, pageable, productQueryResults.size());

    }

    public Page<Product> findProductListByCode(Pageable pageable, int productCode) {
        List<Product> productQueryResults = jpaQueryFactory.select(qProduct)
                .from(qProduct)
                .where(qProduct.productCode.eq(productCode))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        if(productQueryResults.isEmpty()) return Page.empty();

        return new PageImpl<Product>(productQueryResults, pageable, productQueryResults.size());

    }

    public  Page<Product> findProductDealList(Pageable pageable) {
        List<Product> productQueryResults = jpaQueryFactory.select(qProduct)
                .from(qProduct)
                .where(qProduct.productState.eq(1).or(qProduct.productState.eq(2)))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        if(productQueryResults.isEmpty()) return Page.empty();

        return new PageImpl<Product>(productQueryResults, pageable, productQueryResults.size());

    }
    public Page<Product> findProductDealListByCode(Pageable pageable, int productCode) {
        List<Product> productQueryResults = jpaQueryFactory.select(qProduct)
                .from(qProduct)
                .where(qProduct.productCode.eq(productCode).and(qProduct.productState.eq(1).or(qProduct.productState.eq(2))))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        if(productQueryResults.isEmpty()) return Page.empty();

        return new PageImpl<Product>(productQueryResults, pageable, productQueryResults.size());

    }



    // 상품명으로 검색
    public Page<Product> findProductListByTitle(Pageable pageable, String productTitle) {

        // 대소문자 구문안하려고 무조건 대문자로 변경해서 검색
        String upperProductTitle = productTitle.toUpperCase(Locale.ROOT);

        List<Product> productQueryResults = jpaQueryFactory.select(qProduct)
                .from(qProduct)
                .where(qProduct.productTitle.upper().like("%"+upperProductTitle+"%"))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        if(productQueryResults.isEmpty()) return Page.empty();

        return new PageImpl<Product>(productQueryResults, pageable, productQueryResults.size());

    }

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


    public Page<Product> findProductListByUserId(Long userId, Pageable pageable) {

        List<Product> productList = jpaQueryFactory.select(qProduct)
                .from(qProduct)
                .where(qProduct.userId.eq(userId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        if(productList.isEmpty()) return Page.empty();

        return  new PageImpl<Product>(productList,pageable, productList.size());

    }

    public Product findProductByUserId(Long productId) {

        Product product = jpaQueryFactory.select(qProduct)
                .from(qProduct)
                .where(qProduct.productId.eq(productId))
                .fetchOne();

        return product;
    }
}
