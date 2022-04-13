package com.nft.ncity.domain.myroom.service;

import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import com.nft.ncity.domain.myroom.response.MyRoomTop5GetRes;

import java.util.List;

public interface MyRoomService {
    MyRoom getUserRoom(Integer code, Long userId);    // 유저 방 정보 가져오기
    Boolean modifyMyRoom(Integer code, Long userId, String myRoomInfo); // 방 배경 또는 캐릭터 수정
    List<MyRoomTop5GetRes> getMyRoomRank();  // 총 방문수가 높은 방 5개 가져오기
    MyRoom getUserCharacter(Long userId);
}
