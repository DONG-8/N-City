package com.nft.ncity.domain.user.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@ApiModel("UserModifyUpdateReq")
public class UserModifyUpdateReq {

    // 회원 ID
    @ApiModelProperty(value="회원 Id")
    Long userId;

    // 닉네임
    @ApiModelProperty(value="회원 닉네임")
    String userNick;

    // 이메일
    @ApiModelProperty(value = "회원 이메일")
    String userEmail;

    // 프로필 설명란
    @ApiModelProperty(value = "회원 프로필 설명란")
    String userDescription;

    // 프로필 이미지 url
    @ApiModelProperty(value = "회원 프로필 이미지 url")
    String userImgUrl;
}
