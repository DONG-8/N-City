package com.nft.ncity.domain.myroom.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@ApiModel(value = "MyRoomTop5GetRes", description = "방문자수 상위 5개 방 정보 반환")
public class MyRoomTop5GetRes{
        @ApiModelProperty(value = "회원 id")
        Long userId;

        @ApiModelProperty(value = "회원 닉네임")
        String userNick;

        @ApiModelProperty(value = "캐릭터 이미지 경로")
        String myRoomCharacter;

        @ApiModelProperty(value = "오늘 방문자 수")
        Integer myRoomTodayCnt;

        @ApiModelProperty(value = "총 방문자 수 ")
        Integer myRoomTotalCnt;
}
