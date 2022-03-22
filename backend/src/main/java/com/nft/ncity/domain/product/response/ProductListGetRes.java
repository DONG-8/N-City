package com.nft.ncity.domain.product.response;

import com.nft.ncity.domain.favorite.db.repository.FavoriteRepositorySupport;
import com.nft.ncity.domain.favorite.service.FavoriteService;
import com.nft.ncity.domain.product.db.entity.Product;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("ProductListGetRes")
public class ProductListGetRes {


    @ApiModelProperty(value = "상품명")
    String productTitle;

    @ApiModelProperty(value = "상품가격")
    double productPrice;

    @ApiModelProperty(value = "상품 썸네일 URL")
    String productThumbnailUrl;

    @ApiModelProperty(value = "상품 생성일")
    LocalDateTime productRegDt;

    @ApiModelProperty(value = "좋아요 수")
    Long productFavorite;

    @ApiModelProperty(value = "상품 카테고리")
    int productCode;


    public static Page<ProductListGetRes> of(Page<Product> products){
        List<ProductListGetRes> productListGetRes = new ArrayList<>();

        Pageable pageable = products.getPageable();
        long total = products.getTotalElements();

        for(Product p : products.getContent()){
            ProductListGetRes productList = new ProductListGetRes();

            productList.setProductTitle(p.getProductTitle());
            productList.setProductPrice(p.getProductPrice());
            productList.setProductRegDt(p.getProductRegDt());
            productList.setProductThumbnailUrl(p.getProductThumbnailUrl());

            productListGetRes.add(productList);
        }

        Page<ProductListGetRes> res = new PageImpl<>(productListGetRes, pageable, total);

        return res;
    }
}
