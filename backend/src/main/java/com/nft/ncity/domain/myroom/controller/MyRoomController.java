package com.nft.ncity.domain.myroom.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import com.nft.ncity.domain.myroom.db.repository.MyRoomRepositorySupport;
import com.nft.ncity.domain.myroom.request.MyRoomBackgroundPutReq;
import com.nft.ncity.domain.myroom.request.MyRoomCharacterPutReq;
import com.nft.ncity.domain.myroom.response.MyRoomGetRes;
import com.nft.ncity.domain.myroom.service.MyRoomService;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@EnableScheduling
@Slf4j
@Api(value = "마이룸 API")
@RestController
@RequestMapping("/api/myroom")
public class MyRoomController {

    @Autowired
    MyRoomService myRoomService;

    @Autowired
    MyRoomRepositorySupport myRoomRepositorySupport;

    @ApiOperation(value = "유저 방 입장하기")
    @PostMapping("/{userId}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = MyRoom.class),
            @ApiResponse(code = 404, message = "존재하지 않는 userId 입니다.")
    })
    public ResponseEntity<MyRoomGetRes> getUserRoom(@PathVariable @ApiParam(value = "방 주인의 유저 id", required = true) Long userId) throws JsonProcessingException {
        log.info("getUserRoom - Call");

        MyRoom userRoom = myRoomService.getUserRoom(1, userId);

        if(userRoom == null) {  // userId 존재하지 않는 경우
            return ResponseEntity.status(404).body(null);
        } else {
            // json으로 변환하기
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> mapInfo = mapper.readValue(userRoom.getMyRoomBackground(), Map.class);

            return ResponseEntity.status(200).body(MyRoomGetRes.of(200, "마이룸 불러오기 성공", userRoom, mapInfo));
        }
    }

    @ApiOperation(value = "유저 방 변경")
    @PutMapping("/background")
    @ApiResponses({
            @ApiResponse(code = 204, message = "배경 변경 성공"),
            @ApiResponse(code = 401, message = "로그인 해주세요")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyMyRoomBackground(@RequestBody @ApiParam(value = "방 변경 정보", required = true) MyRoomBackgroundPutReq myRoomBackgroundInfo) throws IOException {
        log.info("modifyMyRoomBackground - Call");

        Long userId = Long.valueOf(1);

        // JSON -> String
        ObjectMapper mapper = new ObjectMapper();
        String jsonInString = mapper.writeValueAsString(myRoomBackgroundInfo.getMyRoomBackground());

        if (myRoomService.modifyMyRoom(1, userId, jsonInString) == true) {
            return ResponseEntity.status(204).body(BaseResponseBody.of(204, "배경 변경 성공"));
        } else {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "로그인 해주세요"));
        }
    }

    @ApiOperation(value = "유저 캐릭터 변경")
    @PutMapping("/character")
    @ApiResponses({
            @ApiResponse(code = 204, message = "캐릭터 변경 성공"),
            @ApiResponse(code = 401, message = "로그인 해주세요")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyMyRoomCharacter(@RequestBody @ApiParam(value = "캐릭터 변경 정보", required = true) MyRoomCharacterPutReq myRoomCharacterInfo,
                                                    Principal principal) {
        log.info("modifyMyRoomCharacter - Call");

        Long userId = Long.valueOf(principal.getName());

        if (myRoomService.modifyMyRoom(2, userId, myRoomCharacterInfo.getMyRoomCharacter()) == true) {
            return ResponseEntity.status(204).body(BaseResponseBody.of(204, "캐릭터 변경 성공"));
        } else {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "로그인 해주세요"));
        }
    }

    @ApiOperation(value = "총 방문수가 높은 방 5개 반환")
    @GetMapping
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = MyRoom.class),
    })
    public ResponseEntity<List<MyRoom>> getMyRoomRank() {
        log.info("getMyRoomRank - Call");

        List<MyRoom> myRoom = myRoomService.getMyRoomRank();
        return ResponseEntity.status(200).body(myRoom);
    }

    @ApiOperation(value = "랜덤으로 유저 방 입장")
    @PostMapping("/random")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = MyRoom.class),
    })
    public ResponseEntity<MyRoom> getUserRoomByRandom() {
        log.info("getUserRoomByRandom - Call");

        MyRoom myRoom = myRoomService.getUserRoom(2, null);
        return ResponseEntity.status(200).body(myRoom);
    }

    // 자정마다 today 리셋시켜주기
    @Scheduled(cron = "0 0 0 * * *", zone="Asia/Seoul")
    public void resetMyRoomToday() {
        myRoomRepositorySupport.resetMyRoomToday();
    }
}
