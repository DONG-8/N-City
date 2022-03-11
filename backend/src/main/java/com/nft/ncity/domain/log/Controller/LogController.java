package com.nft.ncity.domain.log.Controller;

import com.nft.ncity.common.util.JwtTokenUtil;
import com.nft.ncity.domain.log.request.LoginPostReq;
import com.nft.ncity.domain.log.response.LoginPostRes;
import com.nft.ncity.domain.log.service.LogService;
import com.nft.ncity.domain.user.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Api(value = "QNA 답변")
@RestController
@RequestMapping("/api/users")
public class LogController {

    @Autowired
    LogService logService;

    @ApiOperation(value = "로그인")
    @PostMapping("/login")
    public ResponseEntity<LoginPostRes> userLogin(@RequestBody @ApiParam(value = "로그인 정보", required = true) LoginPostReq loginInfo) {
        log.info("userLogin - Call");

        String userAddress = loginInfo.getUserAddress();
        // 올바른 지갑 주소인지 확인
        if(userAddress.length() == 42) {
            return ResponseEntity.status(401).body(LoginPostRes.of(401, "Incorrect Wallet", null));
        } else {
            User user = logService.getUserDetail(userAddress);
            return ResponseEntity.status(201).body(LoginPostRes.of(201, "Success", JwtTokenUtil.getUserLoginToken(user.getUserId(), userAddress)));
        }
    }
}
