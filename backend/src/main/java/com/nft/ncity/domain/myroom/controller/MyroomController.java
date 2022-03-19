package com.nft.ncity.domain.myroom.controller;

import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import com.nft.ncity.domain.myroom.service.MyRoomService;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@Slf4j
@Api(value = "마이룸 API")
@RestController
@RequestMapping("/api/myroom")
public class MyroomController {

    @Autowired
    MyRoomService myRoomService;

    @ApiOperation(value = "유저 방 입장하기")
    @PostMapping("/{userId}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = MyRoom.class),
            @ApiResponse(code = 404, message = "존재하지 않는 userId")
    })
    public ResponseEntity<Optional<MyRoom>> getUserRoom(@PathVariable @ApiParam(value = "방 주인의 유저 id", required = true) Long userId) {
        log.info("getMyRoom - Call");

        Optional<MyRoom> userRoom = myRoomService.getUserRoom(userId);
        if(userRoom == null) {  // userId 존재하지 않는 경우
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(200).body(userRoom);
    }

}
