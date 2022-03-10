package com.nft.ncity.domain.authentication.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.response.AuthenticationListGetRes;
import com.nft.ncity.domain.authentication.service.AuthenticationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "인증관리 API")
@RestController
@RequestMapping("/api/authentication")
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;

    @GetMapping("/{authType}")
    @ApiOperation(value = "인증요청 내역 조회", notes = "<strong>해당 타입의 인증요청 내역</strong>을 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = AuthenticationListGetRes.class),
            @ApiResponse(code = 404, message = "사용자 없음")
    })
    public ResponseEntity<Page<AuthenticationListGetRes>> AuthenticationList(
                                                                            @PageableDefault(page = 0, size = 10) Pageable pageable,
                                                                            @PathVariable("authType") int authType) {

        // 0. 인증 요청 내역 조회할 타입을 받아옴.
        // 1. 해당 타입에 해당하는 모든 인증 요청들을 받아옴.
        // 2. 받아온 자료들 res타입으로 변환.

        Page<Authentication> authentications = authenticationService.getAuthenticationListByType(authType, pageable);

        if(authentications.isEmpty()) return ResponseEntity.status(404).body(null);

        return ResponseEntity.status(200).body(AuthenticationListGetRes.of(authentications));
    }
}
