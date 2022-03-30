package com.nft.ncity.domain.user.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Builder
@ApiModel("UserMintProductRes")
public class UserMintProductRes {

    // 유저 아이디
    private Long userId;

    // 토큰 아이디
    private Long tokenId;

    // 상품 제목
    private String productTitle;

    // 상품 설명
    private String productDesc;

    // 상품 카테고리(1 : 그림, 2 : 음악, 3: 영상, 4 : 마이룸 배경, 5 : 캐릭터 관련)
    private int productCode;

    // 마이룸에 표시여부
    private boolean productView;

    // 상품 상태 ( 1 : 경매중, 2 : 판매, 3 : 거래중아님)
    private int productState;

    // 상품 가격
    private double productPrice;
    
    // 상품 생성 일자
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime productRegDt;

    // 상품 파일 URL
    private String productFileUrl;

    // 상품 썸네일 URL
    private String productThumbnailUrl;

    // 상품 경매 종료 시간
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime productAuctionEndTime;

    @ApiModelProperty(value = "상품 좋아요 여부")
    private boolean isFavorite;

    @ApiModelProperty(value = "상품 좋아요 수")
    private Long productFavoriteCount;
}
