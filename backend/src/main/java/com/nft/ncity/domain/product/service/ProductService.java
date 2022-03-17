package com.nft.ncity.domain.product.service;

import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import org.springframework.data.domain.Page;

public interface ProductService {

    Page<Product> productList(int page, int size); // 상품 전체 조회
    Product productDetail(Long productId); // 상품 상세 조회
    Product productModify(ProductModifyPutReq productModify);
    boolean productRemove(Long productId);

}
