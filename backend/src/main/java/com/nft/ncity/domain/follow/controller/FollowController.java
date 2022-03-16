package com.nft.ncity.domain.follow.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.request.AuthenticationRegisterPostReq;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Api(value = "팔로우 관리 API")
@RestController
@RequestMapping("/api/follow")
public class FollowController {

    @PostMapping("/{followFollowee}")
    @ApiOperation(value = "팔로우 신청", notes = "<strong>팔로우 신청</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "신청 성공"),
            @ApiResponse(code = 404, message = "신청 실패")
    })
    public ResponseEntity<BaseResponseBody> FollowRegister(@PathVariable(value = "followFollowee") Long followeeId) throws IOException {

        // 0. 인증 등록 정보를 AuthenticationRegisterPostReq에 담고, 파일 정보를 Param으로 MultipartFiles에 담아 온다.
        // 1. 인증 등록 정보를 Authentication 테이블에 저장하고, 해당 인증 ID와 함께 인증 파일들을 AuthFile 테이블에 저장한다.
        // 2. 저장 결과 성공적이면 200, 중간에 다른 정보들이 없으면 404
        log.info("FollowRegister - 호출");


        if(false) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "신청 성공"));
        }
        else {
            return ResponseEntity.status(201).body(BaseResponseBody.of(404, "신청 실패"));
        }
    }

    @DeleteMapping("/{followFollowee}")
    @ApiOperation(value = "팔로우 신청", notes = "<strong>팔로우 신청</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "신청 성공"),
            @ApiResponse(code = 404, message = "신청 실패")
    })
    public ResponseEntity<BaseResponseBody> FollowRemove(@PathVariable(value = "followFollowee") Long followeeId) throws IOException {

        // 0. 인증 등록 정보를 AuthenticationRegisterPostReq에 담고, 파일 정보를 Param으로 MultipartFiles에 담아 온다.
        // 1. 인증 등록 정보를 Authentication 테이블에 저장하고, 해당 인증 ID와 함께 인증 파일들을 AuthFile 테이블에 저장한다.
        // 2. 저장 결과 성공적이면 200, 중간에 다른 정보들이 없으면 404
        log.info("FollowRemove - 호출");


        if(false) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "신청 성공"));
        }
        else {
            return ResponseEntity.status(201).body(BaseResponseBody.of(404, "신청 실패"));
        }
    }
}
