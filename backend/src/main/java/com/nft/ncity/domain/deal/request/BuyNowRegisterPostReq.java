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
@ApiModel("BuyNowRegisterPostReq")
public class BuyNowRegisterPostReq {

    @ApiModelProperty(value = "상품id")
    private Long productId;

    @ApiModelProperty(value = "금액")
    private double dealPrice;
}
