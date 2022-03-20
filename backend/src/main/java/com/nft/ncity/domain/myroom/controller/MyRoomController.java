package com.nft.ncity.domain.myroom.controller;

import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import com.nft.ncity.domain.myroom.request.MyRoomPutReq;
import com.nft.ncity.domain.myroom.service.MyRoomService;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@Slf4j
@Api(value = "마이룸 API")
@RestController
@RequestMapping("/api/myroom")
public class MyRoomController {

    @Autowired
    MyRoomService myRoomService;

    @ApiOperation(value = "유저 방 입장하기")
    @PostMapping("/{userId}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = MyRoom.class),
            @ApiResponse(code = 404, message = "존재하지 않는 userId 입니다.")
    })
    public ResponseEntity<MyRoom> getUserRoom(@PathVariable @ApiParam(value = "방 주인의 유저 id", required = true) Long userId) {
        log.info("getMyRoom - Call");

        MyRoom userRoom = myRoomService.getUserRoom(userId);
        if(userRoom == null) {  // userId 존재하지 않는 경우
            return ResponseEntity.status(404).body(null);
        } else {

            return ResponseEntity.status(200).body(userRoom);
        }
    }

    @ApiOperation(value = "유저 방 꾸미기")
    @PutMapping
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "로그인해주세요")
    })
    public ResponseEntity<MyRoom> modifyUserRoom(@RequestBody MyRoomPutReq myRoomInfo, Principal principal) {
        log.info("modifyUserRoom - Call");

        Long userId = Long.valueOf(principal.getName());
        log.warn(String.valueOf(userId));
        if (myRoomService.modifyMyRoom(1, userId, myRoomInfo.getMapInfo()) == true) {
            return ResponseEntity.status(200).body(null);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }
}
