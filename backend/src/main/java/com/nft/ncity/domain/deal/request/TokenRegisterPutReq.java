package com.nft.ncity.domain.deal.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@ApiModel(value = "TokenRegisterPutReq",description = "token등록시 필요한 정보 ")
public class TokenRegisterPutReq {

    @ApiModelProperty(value = "상품 id")
    Long productId;

    @ApiModelProperty(value = "토큰 id")
    Long tokenId;

}
