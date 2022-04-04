package com.nft.ncity.domain.product.response;

import com.nft.ncity.domain.favorite.db.repository.FavoriteRepositorySupport;
import com.nft.ncity.domain.favorite.service.FavoriteService;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.user.db.entity.User;
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

    @ApiModelProperty(value = "상품Id")
    Long productId;

    @ApiModelProperty(value = "상품명")
    String productTitle;

    @ApiModelProperty(value = "상품가격")
    double productPrice;

    @ApiModelProperty(value = "상품 썸네일 URL")
    String productThumbnailUrl;

    @ApiModelProperty(value = "상품 생성일")
    LocalDateTime productRegDt;

    @ApiModelProperty(value = "상품 카테고리")
    int productCode;

    @ApiModelProperty(value = "좋아요 수")
    Long productFavorite;

    @ApiModelProperty(value = "좋아요 누른 사람")
    List<User> productFavoriteUser;

    @ApiModelProperty(value = "유저 종류")
    String userRole;

    @ApiModelProperty(value = "상품 거래상태")
    int productState;
}
