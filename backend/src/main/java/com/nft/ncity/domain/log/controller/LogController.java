package com.nft.ncity.domain.log.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.common.util.CookieUtil;
import com.nft.ncity.common.util.JwtTokenUtil;
import com.nft.ncity.common.util.RedisUtil;
import com.nft.ncity.domain.log.request.LoginPostReq;
import com.nft.ncity.domain.log.response.LoginPostRes;
import com.nft.ncity.domain.log.service.LogService;
import com.nft.ncity.domain.user.db.entity.User;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Api(value = "로그인, 로그아웃 API")
@RestController
@RequestMapping("/api")
public class LogController {


    @Autowired
    RedisUtil redisUtil;

    @Autowired
    CookieUtil cookieUtil;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @ApiOperation(value = "로그인")
    @PostMapping("/login")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = LoginPostRes.class),
            @ApiResponse(code = 401, message = "Incorrect Wallet")
    })
    public ResponseEntity<LoginPostRes> userLogin(@RequestBody @ApiParam(value = "로그인 정보", required = true) LoginPostReq loginInfo, HttpServletResponse response) {
        log.info("userLogin - Call");

        String userAddress = loginInfo.getUserAddress();
        Integer addressLength = userAddress.length();
        // 올바른 지갑 주소인지 확인
        if(!addressLength.equals(42)) {
            return ResponseEntity.status(401).body(LoginPostRes.of(401, "Incorrect Wallet", null, null,null));
        } else {
            User user = logService.getUserDetailByAddress(userAddress);
            // 토큰
            final String accessJwt = JwtTokenUtil.createAccessToken(user.getUserId(), user.getUserAddress());
            final String refreshJwt = JwtTokenUtil.createRefreshToken();

            // 쿠키
            Cookie accessToken = cookieUtil.createCookie(JwtTokenUtil.ACCESS_TOKEN_NAME, accessJwt);
            Cookie refreshToken = cookieUtil.createCookie(JwtTokenUtil.REFRESH_TOKEN_NAME, refreshJwt);

            // redis 저장
            redisUtil.setDataExpire(refreshJwt, userAddress, JwtTokenUtil.refreshTokenExpiration);

            response.addCookie(accessToken);
            response.addCookie(refreshToken);
            return ResponseEntity.status(201).body(LoginPostRes.of(201, "Success", accessJwt, user.getUserId(),user.getUserNick()));
        }
    }

    @ApiOperation(value = "로그아웃")
    @GetMapping("/logout")
    @ApiResponses({
            @ApiResponse(code = 204, message = "성공"),
            @ApiResponse(code = 400, message = "이미 로그아웃한 유저입니다.")
    })
    public ResponseEntity<? extends BaseResponseBody> userLogout(HttpServletRequest request, HttpServletResponse response) {
        log.info("userLogout - Call");

        Cookie accessCookie = cookieUtil.getCookie(request,  jwtTokenUtil.ACCESS_TOKEN_NAME);
        Cookie refreshCookie = cookieUtil.getCookie(request, jwtTokenUtil.REFRESH_TOKEN_NAME);

        // < Access Token 작업 >
        // 1. access token 담겨있는 cookie 있는지 확인
        if (accessCookie != null) { // 2. access Cookie 유효하다면 토큰 가져오기
            String accessToken = accessCookie.getValue();

            // 3. Access Token 유효한지 확인
            if (jwtTokenUtil.verify(accessToken).isResult()) {
                // 3-1. access token 유효시간 가지고와서 redis에 블랙리스트로 저장하기
                long expirationTime = jwtTokenUtil.getTokenExpirationAsLong(accessToken);
                redisUtil.setDataExpire(accessToken, "logout", expirationTime);
                log.info("userLogout - access token redis에 저장");
            }
            // 4. access Token 담겨있는 쿠키 삭제
            Cookie expiredAccessCookie = cookieUtil.removeCookie(jwtTokenUtil.ACCESS_TOKEN_NAME);
            response.addCookie(expiredAccessCookie);
        }

        // < refresh token 작업 >
        // 1. refresh token 담겨있는 쿠키 있는지 확인
        if (refreshCookie == null) {
            // 1-1. 쿠키 없으면 이미 로그아웃한 유저로 반환
            log.error("userLogout - refresh cookie 없음");
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이미 로그아웃한 유저입니다."));
        }

        // 2. 쿠키키 유효하다면 토큰 가져기
        String refreshToken = refreshCookie.getValue();

        // 3. refresh Token 담겨있는 쿠키 삭제
        Cookie expiredRefreshCookie = cookieUtil.removeCookie(jwtTokenUtil.REFRESH_TOKEN_NAME);
        response.addCookie(expiredRefreshCookie);

        // 4. refresh token redis에서 삭제
        if(redisUtil.getData(refreshToken) != null) {
            redisUtil.deleteData(refreshToken);
            log.info("userLogout - refreshToken redis에서 삭제");
            return ResponseEntity.status(204).body(BaseResponseBody.of(200, "Success"));
        } else {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이미 로그아웃한 유저입니다."));
        }
    }

    @ApiOperation(value = "로그아웃")
    @GetMapping("/test")
    @ApiResponses({
            @ApiResponse(code = 204, message = "성공"),
            @ApiResponse(code = 400, message = "이미 로그아웃한 유저입니다.")
    })
    public RedirectView test(HttpServletRequest request, HttpServletResponse response) {
        log.info("userLogout - Call");
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("localhost:3030/");
        return redirectView;
    }
}
