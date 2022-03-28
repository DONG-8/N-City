package com.nft.ncity.domain.product.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@ApiModel("TokenRegisterPutReq")
public class TokenRegisterPutReq {
    @ApiModelProperty(value="상품명")
    private Long productId;

    @ApiModelProperty(value="상품설명")
    private Long tokenId;
}
