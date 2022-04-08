package com.nft.ncity.domain.authentication.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("AuthenticationConfirmReq")
public class AuthenticationConfirmReq {

    @ApiModelProperty(value = "인증 신청 아이디")
    Long authId;
    @ApiModelProperty(value = "인증 신청 타입 3 : 기업, 4 : 아티스트, 5 : 인플루언서")
    int authType;
    @ApiModelProperty(value = "허가 여부 1 = 허가, 0 = 거절")
    int isConfirm;
}
