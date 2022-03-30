package com.nft.ncity.domain.myroom.response;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@ApiModel(value = "MyRoomGetRes", description = "유저 룸 방문시 반환하는 정보")
public class MyRoomGetRes extends BaseResponseBody {

    @ApiModelProperty(value = "회원 id")
    Long userId;

    @ApiModelProperty(value = "맵 정보")
    Map myRoomBackground;

    @ApiModelProperty(value = "캐릭터 이미지 경로")
    String myRoomCharacter;

    @ApiModelProperty(value = "오늘 방문자 수")
    Integer myRoomTodayCnt;

    @ApiModelProperty(value = "총 방문자 수 ")
    Integer myRoomTotalCnt;

    public static MyRoomGetRes of(Integer statusCode, String message, MyRoom myRoom, Map map) {
        MyRoomGetRes myRoomGetRes = new MyRoomGetRes();
        myRoomGetRes.setMyRoomBackground(map);
        myRoomGetRes.setUserId(myRoom.getUserId());
        myRoomGetRes.setMyRoomCharacter(myRoom.getMyRoomCharacter());
        myRoomGetRes.setMyRoomTodayCnt(myRoom.getMyRoomTodayCnt());
        myRoomGetRes.setMyRoomTotalCnt(myRoom.getMyRoomTotalCnt());
        myRoomGetRes.setStatusCode(statusCode);
        myRoomGetRes.setMessage(message);
        return myRoomGetRes;
    }
}
