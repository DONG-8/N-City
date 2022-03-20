package com.nft.ncity.domain.myroom.service;

import com.nft.ncity.domain.myroom.db.entity.MyRoom;

public interface MyRoomService {
    MyRoom getUserRoom(long userId);
    Boolean modifyMyRoom(Integer code, Long userId, String myRoomInfo);
}
