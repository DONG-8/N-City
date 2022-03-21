package com.nft.ncity.domain.myroom.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "MyRoomBackgroundPutReq", description = "방 꾸미기 시 필요한 정보")
public class MyRoomBackgroundPutReq {
    @ApiModelProperty(value = "유저 방 정보")
    String myRoomBackground;
}
