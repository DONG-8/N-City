package com.nft.ncity.domain.log.Controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.common.util.CookieUtil;
import com.nft.ncity.common.util.JwtTokenUtil;
import com.nft.ncity.common.util.RedisUtil;
import com.nft.ncity.domain.log.request.LoginPostReq;
import com.nft.ncity.domain.log.request.LogoutGetReq;
import com.nft.ncity.domain.log.response.LoginPostRes;
import com.nft.ncity.domain.log.service.LogService;
import com.nft.ncity.domain.log.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Api(value = "로그인, 로그아웃")
@RestController
@RequestMapping("/api/users")
public class LogController {

    @Autowired
    LogService logService;

    @Autowired
    RedisUtil redisUtil;

    @Autowired
    CookieUtil cookieUtil;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @ApiOperation(value = "로그인")
    @PostMapping("/login")
    public ResponseEntity<LoginPostRes> userLogin(@RequestBody @ApiParam(value = "로그인 정보", required = true) LoginPostReq loginInfo, HttpServletResponse response) {
        log.info("userLogin - Call");

        String userAddress = loginInfo.getUserAddress();
        log.error("userAddress"+ userAddress);
        System.out.println("userAdd " + userAddress);
        Integer addressLength = userAddress.length();
        System.out.println("addressLength " + addressLength);
        System.out.println(addressLength.equals(42));
        log.error(String.valueOf(addressLength.equals(42)));
        // 올바른 지갑 주소인지 확인
        if(!addressLength.equals(42)) {
            return ResponseEntity.status(401).body(LoginPostRes.of(401, "Incorrect Wallet", null));
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
            return ResponseEntity.status(201).body(LoginPostRes.of(201, "Success", accessJwt));
        }
    }

    @ApiOperation(value = "로그아웃")
    @GetMapping("/logout")
    public ResponseEntity<? extends BaseResponseBody> userLogout( HttpServletRequest request) {
        log.info("userLogout - Call");

        String accessToken = cookieUtil.getCookie(request,  jwtTokenUtil.ACCESS_TOKEN_NAME).getValue();
        String refreshToken = cookieUtil.getCookie(request, jwtTokenUtil.REFRESH_TOKEN_NAME).getValue();

        // Access Token 유효하다면
        if (JwtTokenUtil.verify(accessToken).isResult()) {
            // access token 유효시간 가지고와서 redis에 블랙리스트로 저장하기
            long expirationTime = jwtTokenUtil.getTokenExpirationAsLong(accessToken);
            redisUtil.setDataExpire(accessToken, "logout", expirationTime);
            log.info("userLogout - access token redis에 저장");
        }

        // refresh token 삭제
        if(redisUtil.getData(refreshToken) != null) {
            redisUtil.deleteData(refreshToken);
            log.info("userLogout - refreshToken redis에서 삭제");
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

}
