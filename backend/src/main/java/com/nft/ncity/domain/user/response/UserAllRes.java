package com.nft.ncity.domain.user.response;


import com.nft.ncity.domain.follow.db.entity.Follow;
import com.nft.ncity.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@ApiModel("UserAllRes")
public class UserAllRes {

    @ApiModelProperty(value = "유저")
    User user;

    @ApiModelProperty(value = "팔로워")
    List<Follow> follower;

    @ApiModelProperty(value = "팔로이")
    List<Follow> followee;

}
