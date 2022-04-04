package com.nft.ncity.domain.user.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@ApiModel("UserFollowerTop5GetRes")
public class UserFollowerTop5GetRes {

    @ApiModelProperty(value = "유저 아이디")
    Long userId;

    @ApiModelProperty(value = "유저 닉네임")
    String userNick;

    @ApiModelProperty(value = "유저 프로필 이미지")
    String userImgUrl;

    @ApiModelProperty(value = "유저 팔로워 수")
    int userFollowerCnt;
}
