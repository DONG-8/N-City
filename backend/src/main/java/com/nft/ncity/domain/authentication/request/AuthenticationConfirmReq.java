package com.nft.ncity.domain.authentication.request;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("AuthenticationConfirmReq")
public class AuthenticationConfirmReq {
    Long authId;
    int authType;
    boolean isConfirm;
}
