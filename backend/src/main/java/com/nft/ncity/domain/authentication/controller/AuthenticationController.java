package com.nft.ncity.domain.authentication.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.request.AuthenticationConfirmReq;
import com.nft.ncity.domain.authentication.request.AuthenticationRegisterPostReq;
import com.nft.ncity.domain.authentication.response.AuthenticationListGetRes;
import com.nft.ncity.domain.authentication.service.AuthenticationService;
import com.nft.ncity.domain.authentication.service.AwsS3Service;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.service.UserService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.security.Principal;

@Slf4j
@Api(value = "인증관리 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/authentication")
public class AuthenticationController {

    private final AwsS3Service awsS3Service;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    UserService userService;

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
        Page<AuthenticationListGetRes> authenticationListGetRes = authenticationService.getAuthenticationList(authentications);
        if(authentications.isEmpty()) {
            log.error("getAuthenticationListByType - This authType doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.status(200).body(authenticationListGetRes);
    }

    @GetMapping("/detail/{authId}")
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

    /**
     * @param authenticationRegisterPostReq
     * @param multipartFile
     * @return
     * @throws IOException
     */
    @Transactional
    @PostMapping
    @ApiOperation(value = "인증요청 등록", notes = "<strong>인증요청을 등록</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    public ResponseEntity<BaseResponseBody> authenticationRegister(@ModelAttribute AuthenticationRegisterPostReq authenticationRegisterPostReq,
                                                                   @RequestPart(value = "authFile") MultipartFile multipartFile,
                                                                   Principal principal) throws IOException {

        // 0. 인증 등록 정보를 AuthenticationRegisterPostReq에 담고, 파일 정보를 Param으로 MultipartFiles에 담아 온다.
        // 1. 인증 등록 정보를 Authentication 테이블에 저장하고, 해당 인증 ID와 함께 인증 파일들을 AuthFile 테이블에 저장한다.
        // 2. 저장 결과 성공적이면 200, 중간에 다른 정보들이 없으면 404
        log.info("AuthenticationRegister - 호출");
        Long userId = Long.valueOf(1L);
        Authentication authentication = authenticationService.AuthenticationRegister(authenticationRegisterPostReq,multipartFile, userId);

        if(!authentication.equals(null)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        }
        else {
            return ResponseEntity.status(201).body(BaseResponseBody.of(404, "등록 실패"));
        }
    }

    @GetMapping("/download/file")
    @ApiOperation(value = "인증 파일 다운로드", notes = "<strong>인증 파일 다운로드</strong>")
    public ResponseEntity<byte[]> authenticationFileDownload(@RequestParam String authUrl) throws IOException{
        log.info("authenticationFileDownload - 호출");

        return awsS3Service.downloadOnS3(authUrl);
    }

    @PatchMapping("/confirm")
    @ApiOperation(value = "인증요청 수락 및 거절", notes = "<strong>인증요청 수락 및 거절 정보</strong>를 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "인증 처리완료", response = Authentication.class),
            @ApiResponse(code = 404, message = "인증 요청 내역 없음.")
    })
    public ResponseEntity<BaseResponseBody> authenticationConfirm(@RequestBody AuthenticationConfirmReq authenticationConfirmReq) {

        log.info("AuthenticationConfirmByAuthId - 호출");

        Long execute = authenticationService.modifyUserRole(authenticationConfirmReq);

        if(execute < 1) {
            log.error("AuthenticationConfirmByAuthId - 인증 요청 내역 없음.");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"인증 요청 내역 없음."));
        }
        return ResponseEntity.status(201).body(BaseResponseBody.of(201,"인증 처리완료."));
    }

    /**
     유저 전체 정보 조회
     */
    @GetMapping()
    @ApiOperation(value = "전체 유저 정보 조회", notes = "<strong>전체 유저 정보</strong>를 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "유저 없음.")
    })
    public ResponseEntity<Page<User>>getUserList(@PageableDefault(page = 0, size = 10) Pageable pageable) {

        // 0. 받아올 유저 ID를 받음
        // 1. 해당 유저가 가진 작품 목록을 넘겨준다.

        log.info("getUserList - 호출");
        Page<User> users = userService.getUserList(pageable);

        if(users == null) {
            log.error("getUserList - User doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(users);
    }

    /**
     권한별 유저 정보 조회
     */
    @GetMapping("/user/{userRole}")
    @ApiOperation(value = "권한별 유저 정보 조회", notes = "<strong>권한별 유저 정보</strong>를 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "유저 없음.")
    })
    public ResponseEntity<Page<User>>getNewUserList(@PageableDefault(page = 0, size = 10) Pageable pageable, @PathVariable("userRole") String userRole) {

        // ROLE_NEW : 신규 유저, ROLE_REQUEST : 토큰 재충전 요청 유저

        log.info("getNewUserList - 호출");
        Page<User> users = userService.getNewUserList(pageable, userRole);

        if(users == null) {
            log.error("getNewUserList - User doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(users);
    }

    /**
     * 유저 토큰 재요청
     */
    @PutMapping("/token/request/{userId}")
    @ApiOperation(value = "유저 토큰 재지급 요청", notes = "<strong>유저 토큰 재지급 요청정보</strong>를 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "유저 없음.")
    })
    public ResponseEntity<BaseResponseBody>ModifyUserRoleByUserId(@PathVariable Long userId){

        log.info("ModifyUserRoleByUserId - 호출");
        Long execute = userService.modifyUserRoleAsRequest(userId);

        if(execute < 1) {
            log.error("ModifyUserRoleByUserId - User doesn't exist.");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"유저 없음."));
        }
        return ResponseEntity.status(201).body(BaseResponseBody.of(201,"유저 토큰 재지급 완료."));
    }

    /**
     유저 토큰 지급
     */
    @PutMapping("/token/{userId}")
    @ApiOperation(value = "유저 토큰 지급", notes = "<strong>유저 토큰 지급 정보</strong>를 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "유저 없음.")
    })
    public ResponseEntity<BaseResponseBody>ModifyUserByUserId(@PathVariable Long userId){

        log.info("ModifyUserListByUserIdList - 호출");
        Long execute = userService.modifyUserRole(userId);

        if(execute < 1) {
            log.error("ModifyUserListByUserIdList - User doesn't exist.");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"유저 없음."));
        }
        return ResponseEntity.status(201).body(BaseResponseBody.of(201,"유저 토큰 지급 완료."));
    }
}
