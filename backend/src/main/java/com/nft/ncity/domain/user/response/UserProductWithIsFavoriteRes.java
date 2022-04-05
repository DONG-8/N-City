package com.nft.ncity.domain.user.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Builder
@ApiModel("UserFavoriteProductRes")
public class UserProductWithIsFavoriteRes {

    // 상품 아이디
    private Long productId;

    // 상품 소유한 유저 아이디
    private Long userId;

    // 상품의 토큰 아이디
    private Long tokenId;

    // 상품 제목
    private String productTitle;

    // 상품 설명
    private String productDesc;

    // 상품 카테고리 코드
    private int productCode;

    // 상품 판매 상태 1 : 경매, 2 : 즉시가로 판매, 3 : 판매중 아님
    private int productState;

    // 판매중이라면 상품 가격
    private double productPrice;

    // 상품 생성 날짜
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime productRegDt;

    // 상품 URL 주소
    private String productFileUrl;

    // 상품 썸네일 URL 주소
    private String productThumbnailUrl;

    // 상품 경매 종료 시간
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime productAuctionEndTime;

    @ApiModelProperty(value = "상품 좋아요 여부")
    private boolean isFavorite;

    @ApiModelProperty(value = "상품 좋아요 수")
    private Long productFavoriteCount;

    @ApiModelProperty(value = "유저 종류")
    private String userRole;
}
