package com.nft.ncity.domain.myroom.response;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.log.response.LoginPostRes;
import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
@Setter
@ApiModel(value = "MyRoomGetRes", description = "유저 룸 방문시 반환하는 정보")
public class MyRoomGetRes extends BaseResponseBody {

    @ApiModelProperty(value = "유저 룸 정보")
    MyRoom myRoom;

    public static MyRoomGetRes of(Integer statusCode, String message, MyRoom myRoom) {
        MyRoomGetRes myRoomGetRes = new MyRoomGetRes();
        myRoomGetRes.setStatusCode(statusCode);
        myRoomGetRes.setMessage(message);
        myRoomGetRes.setMyRoom(myRoom);
        return myRoomGetRes;
    }
}
