package com.nft.ncity.domain.user.request;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("EmailAuthConfirmReq")
public class EmailAuthConfirmReq {
    String email;
    String authToken;
}
