package com.nft.ncity.domain.user.request;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("EmailAuthRegisterReq")
public class EmailAuthRegisterReq {
    Long userId;
    String emailAuthEmail;
}
