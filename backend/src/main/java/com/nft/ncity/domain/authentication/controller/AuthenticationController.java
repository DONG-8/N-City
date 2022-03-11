package com.nft.ncity.domain.authentication.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.request.AuthenticationRegisterPostReq;
import com.nft.ncity.domain.authentication.response.AuthenticationListGetRes;
import com.nft.ncity.domain.authentication.service.AuthenticationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Api(value = "인증관리 API")
@RestController
@RequestMapping("/api/authentication")
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;



    @GetMapping("/{authType}")
    @ApiOperation(value = "인증요청 내역 전체 조회", notes = "<strong>해당 타입의 인증요청 내역 목록</strong>을 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = AuthenticationListGetRes.class),
            @ApiResponse(code = 404, message = "인증요청 내역 없음.")
    })
    public ResponseEntity<Page<AuthenticationListGetRes>> getAuthenticationListByType(
                                                                            @PageableDefault(page = 0, size = 10) Pageable pageable,
                                                                            @PathVariable("authType") int authType) {

        // 0. 인증 요청 내역 조회할 타입을 받아옴.
        // 1. 해당 타입에 해당하는 모든 인증 요청들을 받아옴.
        // 2. 받아온 자료들 res타입으로 변환.
        log.info("getAuthenticationListByType - 호출");
        Page<Authentication> authentications = authenticationService.getAuthenticationListByType(authType, pageable);

        if(authentications.isEmpty()) {
            log.error("getAuthenticationListByType - This authType doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.status(200).body(AuthenticationListGetRes.of(authentications));
    }

    @GetMapping("/{authId}")
    @ApiOperation(value = "인증요청 내역 상세 조회", notes = "<strong>인증요청 상세 정보</strong>를 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = Authentication.class),
            @ApiResponse(code = 404, message = "인증요청 내역 없음.")
    })
    public ResponseEntity<Authentication> getAuthenticationDetailByAuthId(@PathVariable("authId") Long authId) {

        log.info("getAuthenticationDetailByAuthId - 호출");
        Authentication authentication = authenticationService.getAuthenticationDetailByAuthId(authId);

        if(authentication.equals(null)) {
            log.error("getAuthenticationDetailByAuthId - This authId doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.status(200).body(authentication);
    }

    @PostMapping
    @ApiOperation(value = "인증요청 등록", notes = "<strong>인증요청을 등록</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "인증요청 첨부파일 없음.")
    })
    public ResponseEntity<BaseResponseBody> AuthenticationRegister(@RequestBody AuthenticationRegisterPostReq authenticationRegisterPostReq,
                                                                 @RequestParam List<MultipartFile> multipartFiles) {

        // 0. 인증 등록 정보를 AuthenticationRegisterPostReq에 담고, 파일 정보를 Param으로 MultipartFiles에 담아 온다.
        // 1. 인증 등록 정보를 Authentication 테이블에 저장하고, 해당 인증 ID와 함께 인증 파일들을 AuthFile 테이블에 저장한다.
        // 2. 저장 결과 성공적이면 200, 중간에 다른 정보들이 없으면 404
        log.info("AuthenticationRegister - 호출");

        Authentication authentication = authenticationService.AuthenticationRegister(authenticationRegisterPostReq,multipartFiles);

        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
    }
}
