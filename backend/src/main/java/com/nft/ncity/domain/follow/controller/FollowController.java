package com.nft.ncity.domain.follow.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.request.AuthenticationRegisterPostReq;
import com.nft.ncity.domain.follow.db.entity.Follow;
import com.nft.ncity.domain.follow.service.FollowService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@Slf4j
@Api(value = "팔로우 관리 API")
@RestController
@RequestMapping("/api/follow")
public class FollowController {

    @Autowired
    FollowService followService;

    @PostMapping("/{followFollowee}")
    @ApiOperation(value = "팔로우 신청", notes = "<strong>팔로우 신청</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "신청 성공"),
            @ApiResponse(code = 404, message = "신청 실패")
    })
    public ResponseEntity<BaseResponseBody> FollowRegister(@PathVariable(value = "followFollowee") Long followeeId,
                                                           Principal principal){

        // 0. 토큰으로부터 내 userId와 팔로우 신청할 유저의 Id(followeeId)를 받아온다.
        // 1. Follow 테이블에 추가.

        log.info("FollowRegister - 호출");
        Long userId = Long.valueOf(principal.getName());

        Follow follow = followService.FollowRegister(followeeId,userId);


        if(null != follow) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "신청 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "신청 실패"));
        }
    }

    @DeleteMapping("/{followFollowee}")
    @ApiOperation(value = "팔로우 취소", notes = "<strong>팔로우 취소</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "취소 성공"),
            @ApiResponse(code = 404, message = "취소 실패")
    })
    public ResponseEntity<BaseResponseBody> FollowRemove(@PathVariable(value = "followFollowee") Long followeeId,
                                                         Principal principal){

        // 0. 토큰으로부터 내 userId와 팔로우 신청할 유저의 Id(followeeId)를 받아온다.
        // 1. Follow 테이블에서 삭제.
        log.info("FollowRemove - 호출");
        Long userId = Long.valueOf(principal.getName());
        Follow follow = followService.FollowRemove(followeeId,userId);

        if(null != follow) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "취소 성공"));
        }
        else {
            return ResponseEntity.status(201).body(BaseResponseBody.of(404, "취소 실패"));
        }
    }
}
