package com.nft.ncity.domain.user.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.user.db.entity.EmailAuth;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.db.repository.UserRepository;
import com.nft.ncity.domain.user.request.EmailAuthRegisterReq;
import com.nft.ncity.domain.user.request.UserModifyUpdateReq;
import com.nft.ncity.domain.user.service.UserService;
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

import java.io.IOException;
import java.util.Optional;

@Slf4j
@Api(value = "유저 정보 API")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/{userId}")
    @ApiOperation(value = "유저 정보 조회", notes = "<strong>해당 유저의 정보</strong>을 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<User> getUserDetailById(@PathVariable("userId") Long userId) {

        // 0. 받아올 유저 ID를 받음
        // 1. 해당 하는 유저에 대한 정보를 넘겨준다.

        log.info("getUserDetailById - 호출");
        User user = userRepository.getById(userId);

        if(user.equals(null)) {
            log.error("getUserDetailById - This userId doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(user);
    }


    /**
        Product 생성 된 후에 가능.
     */
    @GetMapping("/{userId}/collected")
    @ApiOperation(value = "유저가 가진 작품 조회", notes = "<strong>해당 유저가 가진 작품 목록</strong>을 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<Page<User>>getProductListByUserId(@PathVariable("userId") Long userId,
                                                       @PageableDefault(page = 0, size = 10) Pageable pageable) {

        // 0. 받아올 유저 ID를 받음
        // 1. 해당 유저가 가진 작품 목록을 넘겨준다.

        log.info("getProductListByUserId - 호출");
        User user = userRepository.getById(userId);
        //Product product = productRepository.getById();

        if(user.equals(null)) {
            log.error("getProductListByUserId - This userId doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(null);
    }

    /**
     Remix에서 값들을 받아와서 저장부터 해야함.? DB에도 저장 하나?
     */
    @GetMapping("/{userId}/created")
    @ApiOperation(value = "유저가 생성한 작품 조회", notes = "<strong>해당 유저가 생성한 작품 목록</strong>을 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<Page<User>>getCreatedProductListByUserId(@PathVariable("userId") Long userId,
                                                            @PageableDefault(page = 0, size = 10) Pageable pageable) {

        // 0. 받아올 유저 ID를 받음
        // 1. 해당 유저가 생성한 작품 목록을 넘겨준다.

        log.info("getCreatedProductListByUserId - 호출");
        User user = userRepository.getById(userId);
        //Product product = productRepository.getById();

        if(user.equals(null)) {
            log.error("getCreatedProductListByUserId - This userId doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(null);
    }

    /**
      상품좋아요(favorite) 테이블이 완료 되어야 진행 가능함.
     */
    @GetMapping("/{userId}/favorites")
    @ApiOperation(value = "유저가 좋아요한 작품 조회", notes = "<strong>해당 유저가 좋아요한 작품 목록</strong>을 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<Page<User>> getFavoritesProductListByUserId(@PathVariable("userId") Long userId,
                                                                      @PageableDefault(page = 0, size = 10) Pageable pageable) {

        // 0. 받아올 유저 ID를 받음
        // 1. 해당 유저가 생성한 작품 목록을 넘겨준다.

        log.info("getFavoritesProductListByUserId - 호출");
        User user = userRepository.getById(userId);
        //Product product = productRepository.getById();

        if(user.equals(null)) {
            log.error("getFavoritesProductListByUserId - This userId doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(null);
    }

    /**
     거래내역(deal) 테이블이 완료 되어야 진행 가능함.
     */
    @GetMapping("/{userId}/activities")
    @ApiOperation(value = "해당 유저의 거래 내역 조회", notes = "<strong>해당 유저의 거래 내역</strong>을 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<Page<User>> getActivityListByUserId(@PathVariable("userId") Long userId,
                                                                      @PageableDefault(page = 0, size = 10) Pageable pageable) {

        // 0. 유저 ID를 받음.
        // 1. 해당 유저의 거래 내역 DB에서 받아와서 보내주기.

        log.info("getActivityListByUserId - 호출");
        User user = userRepository.getById(userId);
        //Product product = productRepository.getById();

        if(user.equals(null)) {
            log.error("getActivityListByUserId - This userId doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(null);
    }

    /**
     * Post : 리소스의 생성을 담당, 요청 시 마다 새로운 리소스가 생성
     * Put : 리소스의 생성과 수정을 담당, 요청 시 마다 같은 리소스를 반환, 리소스의 모든 속성을 수정
     * Patch : 수정만 담당, 리소스의 일부분만 수정
     */
    @PatchMapping("/change-info")
    @ApiOperation(value = "해당 유저의 회원정보 변경", notes = "<strong>해당 유저의 회원정보</strong>를 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 404, message = "해당 유저 없음."),
            @ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<BaseResponseBody> modifyUserInfoByUserId(@RequestPart(value = "body") UserModifyUpdateReq userInfo,
                                                                   @RequestPart(value = "profileFile", required = false) MultipartFile profileImg) throws IOException {

        // 0. 유저 ID를 받음.
        // 1. 해당 유저의 거래 내역 DB에서 받아와서 보내주기.

        log.info("modifyUserInfoByUserId - 호출");

        Long execute;
        // 프로필 이미지 변경 할 경우
        if(null != profileImg) {
            execute = userService.userUpdateWithProfileImg(userInfo,profileImg);
        }

        // 변경 안할 경우
        else {
            execute = userService.userUpdateNoProfileImg(userInfo);
        }

        // 이메일 인증 확인
        User user = userRepository.getById(userInfo.getUserId());
        // 인증이 안되었으면
        if(!user.getUserEmailConfirm()){
            log.error("modifyUserInfoByUserId - 이메일 인증을 해주세요.");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"이메일 인증 필요."));
        }


        // 수정한게 없다.
        if(execute < 1) {
            log.error("modifyUserInfoByUserId - This userId doesn't exist.");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"해당 유저 없음."));
        }
        else {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"성공"));
        }
    }

    /**
     닉네임 중복 체크
     */
    @GetMapping("/{userNick}/duplicate")
    @ApiOperation(value = "닉네임 중복 체크", notes = "<strong>닉네임 중복 체크</strong>")
    @ApiResponses({
            @ApiResponse(code = 201, message = "닉네임 변경 가능."),
            @ApiResponse(code = 404, message = "닉네임 변경 불가능.")
    })
    public ResponseEntity<BaseResponseBody> getUserNickName(@PathVariable(value = "userNick") String userNick) {

        log.info("getUserNickName - 호출");

        Optional<User> user = userRepository.findUserByUserNick(userNick);

        if(user.isPresent()) {
            log.error("getUserNickName - This userNickName exists.");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"닉네임 변경 불가능."));
        }
        return ResponseEntity.status(201).body(BaseResponseBody.of(201,"닉네임 변경 가능."));
    }

    @PostMapping("/confirm")
    @ApiOperation(value = "이메일 인증 요청하기", notes = "<strong>이메일 인증 요청하기</strong>")
    @ApiResponses({
            @ApiResponse(code = 201, message = "이메일 인증 등록 및 확인 메일 보내기 완료."),
            @ApiResponse(code = 403, message = "이미 존재하는 이메일.")
    })
    public ResponseEntity<BaseResponseBody> EmailAuthRegister(@RequestBody EmailAuthRegisterReq emailAuthRegisterReq) {

        // 0. 이메일을 입력하고 이메일 인증 신청 버튼을 클릭한다.
        // 1. 해당 이메일이 user 테이블에 이미 존재하는지 확인
        // 2. 존재하지 않는다면 해당 이메일 EmailAuth 테이블에 등록
        // 2-1 존재 한다면 에러메세지 응답.

        log.info("EmailAuthRegister - 호출");
        // 해당 이메일이 존재하면
        if(userRepository.findByUserEmail(emailAuthRegisterReq.getEmailAuthEmail()).isPresent()) {
            return ResponseEntity.status(403).body(BaseResponseBody.of(403,"이미 존재하는 이메일."));
        }

        // 그렇다면 이미 인증을 완료한 상태에서 이메일을 변경한다면?
        User user = userRepository.findUserByUserId(emailAuthRegisterReq.getUserId()).get();
        // 다시 인증상태 false로 변경
        user.updateEmail(emailAuthRegisterReq.getEmailAuthEmail());
        // 변경한거 DB에 저장.
        userRepository.save(user);

        // 이메일 인증 테이블에 해당 이메일 등록하고 인증 확인 메일 보내기.
        EmailAuth emailAuth = userService.EmailAuthRegister(emailAuthRegisterReq.getEmailAuthEmail());

        return ResponseEntity.status(201).body(BaseResponseBody.of(201,"이메일 인증 등록 및 확인 메일 보내기 완료."));
    }

    @GetMapping("/confirm-email")
    @ApiOperation(value = "이메일 인증 수락", notes = "<strong>이메일 인증 수락</strong>")
    @ApiResponses({
            @ApiResponse(code = 201, message = "이메일 인증 수락."),
            @ApiResponse(code = 404, message = "이메일 인증 수락 불가능.")
    })
    public ResponseEntity<BaseResponseBody> EmailAuthConfirm(@RequestParam(name = "email") String emailAuthEmail,
                                                             @RequestParam(name = "authToken") String authToken) {

        // 이메일 인증 처리.
        log.info("EmailAuthConfirm - 호출");
        userService.confirmEmail(emailAuthEmail, authToken);

        return ResponseEntity.status(201).body(BaseResponseBody.of(201,"닉네임 변경 가능."));
    }
}
