package com.nft.ncity.domain.product.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@ApiModel("ProductRegisterPostReq")
public class ProductRegisterPostReq {

    @ApiModelProperty(value="상품명")
    private String productTitle;

    @ApiModelProperty(value="상품설명")
    private String productDesc;

    @ApiModelProperty(value="카테고리")
    private int code;
}
