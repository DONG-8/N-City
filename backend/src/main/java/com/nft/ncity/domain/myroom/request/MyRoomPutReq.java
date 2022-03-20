package com.nft.ncity.domain.myroom.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "MyRoomPutReq", description = "로그인시 필요한 정보")
public class MyRoomPutReq {
    @ApiModelProperty(value = "유저 방 정보")
    String mapInfo;
}
