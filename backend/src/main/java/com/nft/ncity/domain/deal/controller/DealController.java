package com.nft.ncity.domain.deal.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.deal.db.entity.Deal;
import com.nft.ncity.domain.deal.request.DealRegisterPostReq;
import com.nft.ncity.domain.deal.service.DealService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.security.Principal;

@Slf4j
@Api(value = "거래 관리 API")
@RestController
@RequestMapping("/api/deals")
public class DealController {

    @Autowired
    DealService dealService;


    // CREATE
    // 거래등록  type = 6(minted) 보내는사람 - x 받는 사람 - 자기로 초기화 , 상품table -> 상품상태 변경

    @Transactional
    @ApiOperation(value = "거래 등록")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    @PostMapping
    public ResponseEntity<BaseResponseBody> dealRegister(@RequestBody DealRegisterPostReq dealRegisterPostReq, Principal principal){
        log.info("dealRegister - 호출");

        Deal deal = dealService.dealRegister(dealRegisterPostReq,principal);
        if(!deal.equals(null)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        }
        else {
            return ResponseEntity.status(201).body(BaseResponseBody.of(404, "등록 실패"));
        }

    }

    // 옥션 가격제안 type =

    // READ
    // productId에 해당하는 지난 거래 내역들 조회

    // UPDATE



    // DELETE
    // 거래 종료?
}
