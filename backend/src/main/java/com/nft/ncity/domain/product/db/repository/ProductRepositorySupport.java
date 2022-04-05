package com.nft.ncity.domain.product.db.repository;

import com.nft.ncity.domain.deal.db.entity.QDeal;
import com.nft.ncity.domain.favorite.db.entity.QFavorite;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.db.entity.QProduct;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import com.nft.ncity.domain.product.request.TokenRegisterPutReq;
import com.nft.ncity.domain.product.response.ProductTop10GetRes;
import com.nft.ncity.domain.user.db.entity.QUser;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPAExpressions;
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

    QDeal qDeal = QDeal.deal;

    QUser qUser = QUser.user;

    QFavorite qFavorite = QFavorite.favorite;

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

        if(productQueryResults.isEmpty()){
            return Page.empty();
        }

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


    @Transactional
    public long updateProductMyroomByProductId(ProductModifyPutReq productModifyPutReq){
        long execute = jpaQueryFactory.update(qProduct)
                .set(qProduct.productXCoordinate, productModifyPutReq.getProductXCoordinate())
                .set(qProduct.productYCoordinate, productModifyPutReq.getProductYCoordinate())
                .set(qProduct.productView,productModifyPutReq.isProductView())
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

        return new PageImpl<Product>(productList,pageable, productList.size());
    }

    public Page<Product> findMindtedProductByUserId(Long userId, Pageable pageable) {

        // deal 테이블에서 type이 6 minted, deal_from, deal_to = userId
        List<Product> products = jpaQueryFactory.select(qProduct)
                .from(qProduct)
                .where(qProduct.productId.in(
                                JPAExpressions.select(qDeal.productId)
                                        .from(qDeal)
                                        .where(qDeal.dealType.eq(6).and(qDeal.dealTo.eq(userId)))))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        if(products.isEmpty()) return Page.empty();

        return new PageImpl<Product>(products, pageable, products.size());
    }


    public List<Tuple> getFavoriteTop10Product(){

        List<Tuple> res = jpaQueryFactory.select(qProduct,qFavorite.count())
                .from(qProduct)
                .join(qFavorite)
                .on(qProduct.productId.eq(qFavorite.productId))
                .groupBy(qFavorite.productId)
                .orderBy(qFavorite.count().desc())
                .limit(10)
                .fetch();
        return res;
    }


    // 밑으로는 상세페이지 표시용
    public Product findProductByProductId(Long productId) {

        Product product = jpaQueryFactory.select(qProduct)
                .from(qProduct)
                .where(qProduct.productId.eq(productId))
                .fetchOne();
        return product;
    }


    public String getUserNickByUserId(Long userId){
        String userNick = jpaQueryFactory.select(qUser.userNick)
                .from(qUser)
                .where(qUser.userId.eq(userId))
                .fetchOne();
        return userNick;
    }

    public Long getMintUserIdByProductId(Long productId){
        Long mintUserId = jpaQueryFactory.select(qDeal.dealTo)
                .from(qDeal)
                .where(qDeal.productId.eq(productId))
                .limit(1)
                .fetchOne();
        return mintUserId;
    }

    public List<Product> findProductNew10List() {
        List<Product> productList = jpaQueryFactory.select(qProduct)
                .from(qProduct)
                .where(qProduct.productId.in(
                        jpaQueryFactory.select(qDeal.productId)
                                .from(qDeal)
                                .where(qDeal.dealType.eq(6))
                                .orderBy(qDeal.dealCreatedAt.desc())
                                .limit(10)
                                .fetch()
                ))
                .fetch();

        return productList;
    }
}
