package com.nft.ncity.domain.log.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "LoginPostRes", description = "로그인 시 필요한 정보")
public class LoginPostReq {
    @ApiModelProperty(value = "유저 지갑 주소", example = "0x462c2D22e9AF266AB1F235D3cEa7902D8BbdEC6A")
    String userAddress;
}
