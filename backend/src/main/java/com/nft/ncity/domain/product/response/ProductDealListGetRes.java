package com.nft.ncity.domain.product.response;

import com.nft.ncity.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ApiModel("ProductDealListGetRes")
public class ProductDealListGetRes {

    @ApiModelProperty(value = "상품ID")
    Long productId;

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

    @ApiModelProperty(value = "상품 거래상태")
    @Column(name = "product_state", columnDefinition = "TINYINT")
    int productState;


    @ApiModelProperty(value = "좋아요 누른 사람")
    List<User> productFavoriteUser;

}
