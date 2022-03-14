package com.nft.ncity.domain.log.Controller;

import com.nft.ncity.common.util.CookieUtil;
import com.nft.ncity.common.util.JwtTokenUtil;
import com.nft.ncity.common.util.RedisUtil;
import com.nft.ncity.domain.log.request.LoginPostReq;
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

    @ApiOperation(value = "로그인")
    @PostMapping("/login")
    public ResponseEntity<LoginPostRes> userLogin(@RequestBody @ApiParam(value = "로그인 정보", required = true) LoginPostReq loginInfo,
                                                  HttpServletRequest request, HttpServletResponse response) {
        log.info("userLogin - Call");

        String userAddress = loginInfo.getUserAddress();
        // 올바른 지갑 주소인지 확인
        if(userAddress.length() == 42) {
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
}
