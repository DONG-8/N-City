package com.nft.ncity.domain.myroom.service;

import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import com.nft.ncity.domain.myroom.db.repository.MyRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyRoomServiceImpl implements MyRoomService{

    @Autowired
    MyRoomRepository myRoomRepository;

    @Override
    public Optional<MyRoom> getUserRoom(long userId) {
        Optional<MyRoom> myRoom = myRoomRepository.findById(userId);
        return myRoom;
    }
}
