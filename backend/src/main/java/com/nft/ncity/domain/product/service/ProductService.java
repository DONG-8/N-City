package com.nft.ncity.domain.product.service;

import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import com.nft.ncity.domain.product.request.ProductRegisterPostReq;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

public interface ProductService {

    // create
    Product productRegister(ProductRegisterPostReq productRegisterPostReq,
                            MultipartFile productFile,
                            MultipartFile thumbnailFile,
                            Principal principal) throws IOException;

    // read
    Page<Product> productList(int page, int size); // 상품 전체 조회
    Product productDetail(Long productId); // 상품 상세 조회

    // update
//    Product productModify(ProductModifyPutReq productModify);

    // delete
    boolean productRemove(Long productId);

}
