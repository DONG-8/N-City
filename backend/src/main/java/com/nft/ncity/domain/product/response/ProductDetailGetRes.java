package com.nft.ncity.domain.product.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Setter
@Getter
@ApiModel("ProductDetailGetRes")
public class ProductDetailGetRes {

    @ApiModelProperty(value = "상품Id")
    private Long productId;

    @ApiModelProperty(value = "userId")
    private Long userId;

    @ApiModelProperty(value = "user닉네임")
    private String userNick;

    @ApiModelProperty(value = "tokenId")
    private Long tokenId;

    @ApiModelProperty(value = "상품명")
    private String productTitle;

    @ApiModelProperty(value = "상품설명")
    private String productDesc;

    @ApiModelProperty(value = "상품카테고리")
    private int productCode;

    @ApiModelProperty(value = "상품x좌표")
    private int productXCoordinate;

    @ApiModelProperty(value = "상품 y좌표")
    private int productYCoordinate;

    @ApiModelProperty(value = "상품 표시여부")
    private boolean productView;

    @ApiModelProperty(value = "상품 상태")
    @Column(name = "product_state", columnDefinition = "TINYINT")
    private int productState;

    @ApiModelProperty(value = "상품 가격")
    private double productPrice;

    @ApiModelProperty(value = "상품 민팅일")
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime productRegDt;

    @ApiModelProperty(value = "상품 url")
    @Column(name = "product_file_url")
    private String productFileUrl;

    @ApiModelProperty(value = "상품 썸네일url")
    @Column(name = "product_thumbnail_url")
    private String productThumbnailUrl;

    @ApiModelProperty(value = "상품 경매 종료시간")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime productAuctionEndTime;

    @ApiModelProperty(value = "상품 민팅한 사람")
    private Long mintUserId;

    @ApiModelProperty(value = "상품 좋아요 수")
    private Long favoriteCount;
}
