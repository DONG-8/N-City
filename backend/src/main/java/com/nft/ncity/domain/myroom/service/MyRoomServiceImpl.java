package com.nft.ncity.domain.myroom.service;

import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import com.nft.ncity.domain.myroom.db.repository.MyRoomRepository;
import com.nft.ncity.domain.myroom.db.repository.MyRoomRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MyRoomServiceImpl implements MyRoomService{

    @Autowired
    MyRoomRepository myRoomRepository;

    @Override
    public MyRoom getUserRoom(Integer code, Long userId) {
        Optional<MyRoom> myRoom = null;

        if(code == 1) { // userId 통해 유저 방 정보 가져오기
             myRoom = myRoomRepository.findById(userId);
        } else if(code == 2) {  // 유저 방 정보 랜덤으로 가져오기
            myRoom = myRoomRepository.getMyRoomByRandom();
            userId = myRoom.get().getUserId();
        }

        if(myRoom.isPresent()) {
            MyRoom myRoomGet = myRoom.get();

            MyRoom myRoomAddVisit = MyRoom.builder()
                    .userId(userId)
                    // 기존 값 넣기
                    .myRoomBackground(myRoomGet.getMyRoomBackground())
                    .myRoomCharacter(myRoomGet.getMyRoomCharacter())
                    // totday, total +1
                    .myRoomTodayCnt(myRoomGet.getMyRoomTodayCnt() + 1)
                    .myRoomTotalCnt(myRoomGet.getMyRoomTotalCnt() + 1)
                    .build();

            myRoomRepository.save(myRoomAddVisit);

            return myRoomAddVisit;
        }
        return null;
    }

    @Override
    public Boolean modifyMyRoom(Integer code, Long userId, String changeInfo) {
        MyRoom myOldRoom = myRoomRepository.getById(userId);

        String myRoomBackground = myOldRoom.getMyRoomBackground();
        String myRoomCharacter = myOldRoom.getMyRoomCharacter();

        if (code == 1) {    // 방 테마 변경
            myRoomBackground = changeInfo;
        } else if (code == 2) { // 캐릭터 변경
            myRoomCharacter = changeInfo;
        }

        MyRoom myNewRoom = MyRoom.builder()
                .userId(myOldRoom.getUserId())
                .myRoomBackground(myRoomBackground)
                .myRoomCharacter(myRoomCharacter)
                // 기존값 넣기
                .myRoomTodayCnt(myOldRoom.getMyRoomTodayCnt())
                .myRoomTotalCnt(myOldRoom.getMyRoomTotalCnt())
                .build();

        myRoomRepository.save(myNewRoom);

        return true;
    }

    @Override
    public List<MyRoom> getMyRoomRank() { return myRoomRepository.findTop5ByOrderByMyRoomTotalCntDesc(); }

    @Override
    public MyRoom getUserCharacter(Long userId) {
        MyRoom myRoom = myRoomRepository.findMyRoomByUserId(userId).orElse(null);

        if(myRoom == null) {
            return null;
        }
        return myRoom;
    }


}
