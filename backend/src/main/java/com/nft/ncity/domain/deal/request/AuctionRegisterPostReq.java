package com.nft.ncity.domain.deal.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@ApiModel("AuctionRegisterPostReq")
public class AuctionRegisterPostReq {

    @ApiModelProperty(value = "상품id")
    private Long productId;
//
//    @ApiModelProperty(value = "거래 타입",notes = " 1 : auction 경매 등록\n" +
//            "- 2 : bid  경매 참여\n" +
//            "- 3 : list   즉시구매\n" +
//            "- 4 : offer  즉시구매 흥정 -> 추후 구현\n" +
//            "- 5 : transfer  권한 전달\n" +
//            "- 6 : minted  상품 최초 등록")
//    private int dealType;

    @ApiModelProperty(value = "금액")
    private double dealPrice;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime productAuctionEndTime;


}
