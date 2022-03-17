package com.nft.ncity.domain.myroom.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.log.response.LoginPostRes;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@Api(value = "마이룸 API")
@RestController
@RequestMapping("/api/myroom")
public class MyroomController {

    @ApiOperation(value = "유저 방 입장하기")
    @PostMapping("/{userId}")
    public ResponseEntity<? extends BaseResponseBody> getMyRoom(@PathVariable ) {
        log.info("getMyRoom - Call");


            return ResponseEntity.status(201).body(LoginPostRes.of(201, "Success", accessJwt, user.getUserId()));
        }
    }
}
