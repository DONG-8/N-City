package com.nft.ncity.domain.myroom.service;

import com.nft.ncity.domain.myroom.db.entity.MyRoom;

import java.util.Optional;

public interface MyRoomService {
    Optional<MyRoom> getUserRoom(long userId);
}
