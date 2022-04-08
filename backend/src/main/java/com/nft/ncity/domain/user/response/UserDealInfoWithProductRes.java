package com.nft.ncity.domain.user.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import org.checkerframework.checker.units.qual.A;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@Builder
@ApiModel("UserDealInfoWithProductRes")
public class UserDealInfoWithProductRes {

    @ApiModelProperty(value = "거래 id")
    Long dealId;

    @ApiModelProperty(value = "상품 id")
    Long productId;

    @ApiModelProperty(value = "보내는 사람 id")
    Long dealFrom;

    @ApiModelProperty(value = "token Id")
    Long tokenId;

    @ApiModelProperty(value = "받는 사람 id")
    Long dealTo;

    /*     거래 타입
         1 : sale
         2 : bid
         3 : list
         4 : offer
         5 : transfer
         6 : minted
     */
    @Column(name = "deal_type", columnDefinition = "TINYINT")
    @ApiModelProperty(value = "거래 타입")
    int dealType;

    @ApiModelProperty(value = "금액")
    double dealPrice;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @ApiModelProperty(value="거래 요청시간")
    LocalDateTime dealCreatedAt;

    @ApiModelProperty(value = "상품 썸네일")
    private String productThumbnailUrl;

    @ApiModelProperty(value = "상품 제목")
    private String productTitle;

    @ApiModelProperty(value = "판매자 닉네임")
    private String dealFromUserNick;

    @ApiModelProperty(value = "구매자 닉네임")
    private String dealToUserNick;

    @ApiModelProperty(value = "상품 좋아요 수")
    private Long productFavoriteCount;

    @ApiModelProperty(value = "경매 종료시간")
    private LocalDateTime productAuctionEndTime;
}
