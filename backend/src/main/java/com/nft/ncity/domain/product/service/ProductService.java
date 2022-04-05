package com.nft.ncity.domain.product.service;

import com.nft.ncity.domain.deal.db.entity.Deal;
import com.nft.ncity.domain.favorite.db.entity.Favorite;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import com.nft.ncity.domain.product.request.ProductRegisterPostReq;
import com.nft.ncity.domain.product.request.TokenRegisterPutReq;
import com.nft.ncity.domain.product.response.ProductDealListGetRes;
import com.nft.ncity.domain.product.response.ProductDetailGetRes;
import com.nft.ncity.domain.product.response.ProductListGetRes;
import com.nft.ncity.domain.product.response.ProductTop10GetRes;
import com.nft.ncity.domain.user.response.UserMintProductRes;
import com.nft.ncity.domain.user.response.UserProductWithIsFavoriteRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

public interface ProductService {

    // create
    Product productRegister(ProductRegisterPostReq productRegisterPostReq,
                            MultipartFile productFile,
                            MultipartFile thumbnailFile,
                            Long userId) throws IOException;
    Long tokenRegister(TokenRegisterPutReq tokenRegisterPutReq);

    // read
    Page<ProductListGetRes> getProductList(Pageable pageable); // 상품 전체 조회
    Page<ProductListGetRes> getProductListByCode(Pageable pageable, int productCode); // 카테고리별 상품 전체조회
    Page<ProductDealListGetRes> getProductDealList(Pageable pageable); // 거래상품 전체 조회
    Page<ProductDealListGetRes> getProductDealListByCode(Pageable pageable, int productCode); // 카테고리별 거래상품 전체조회
    Page<ProductListGetRes> getProductListByTitle(Pageable pageable, String productTitle); // 상품명 검색조회

    ProductDetailGetRes productDetail(Long productId); // 상품 상세 조회

    List<ProductListGetRes> getProductFavoriteRank(); // 상품 좋아요 높은 top10 받아오기

    // update
    long productModify(ProductModifyPutReq productModify);
    long productMyroomModify(ProductModifyPutReq productModify);

    // delete
    boolean productRemove(Long productId);

    Page<UserProductWithIsFavoriteRes> getProductListByUserId(Long userId, Pageable pageable);
    Page<UserMintProductRes> getMintedProductList(Long userId, Pageable pageable);
    Page<Product> getFavoriteProduct(Page<Favorite> favorites);
}
