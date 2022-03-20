package com.nft.ncity.domain.myroom.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "MyRoomCharacterPutReq", description = "캐릭터 변경 시 필요한 정보")
public class MyRoomCharacterPutReq {
    @ApiModelProperty(value = "유저 캐릭터 정보")
    String myRoomCharacter;
}
