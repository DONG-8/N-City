package com.nft.ncity.domain.log.service;

import com.nft.ncity.domain.log.db.repository.LogRepository;
import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import com.nft.ncity.domain.myroom.db.repository.MyRoomRepository;
import com.nft.ncity.domain.user.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LogServiceImpl implements LogService{

    @Autowired
    private LogRepository logRepository;

    @Autowired
    private MyRoomRepository myRoomRepository;

    @Override
    public User getUserDetailByAddress(String userAddress) {
        Optional<User> user = logRepository.findUserByUserAddress(userAddress);

        if(user.isPresent()) {  // 이미 한번 로그인한 유저라면
            return user.get();
        } else {    // 처음 로그인한 유저라면
            User newUser = User.builder()   // 유저 정보 빌드
                    .userAddress(userAddress)
                    .userNick("noname") // 닉네임 초기 설정
                    .userRole("ROLE_USER") // 유저 역할 초기 설정 (일반 유저)
                    .userEmailConfirm(false)
                    .build();

            User nowOldUser = logRepository.save(newUser); // db에 유저 정보 저장

            MyRoom newRoom = MyRoom.builder()   // 유저 방 생성
                    .userId(nowOldUser.getUserId())
                    .myRoomTodayCnt(0)
                    .myRoomTotalCnt(0)
                    .build();
            myRoomRepository.save(newRoom);

            return nowOldUser;
        }
    }

    @Override
    public User getUserDetailById(long userId) {
        Optional<User> user = logRepository.findById(userId);
        if(user.isPresent()) {  // 이미 한번 로그인한 유저라면
            return user.get();
        } else {    // 처음 로그인한 유저라면
            return null;
        }
    }

}
