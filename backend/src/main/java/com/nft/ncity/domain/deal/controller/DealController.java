package com.nft.ncity.domain.deal.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.deal.request.AuctionRegisterPostReq;
import com.nft.ncity.domain.deal.request.BuyNowRegisterPostReq;
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

    // Register 이지만 민팅때 생성된 Deal table 'UPDATE'
    @Transactional
    @ApiOperation(value = "즉시구매 등록 ")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    @PostMapping("/buyNow")
    public ResponseEntity<BaseResponseBody> buyNowRegister(@RequestBody BuyNowRegisterPostReq buyNowRegisterPostReq, Principal principal){

        log.info("dealRegister - 호출");

        Long res = dealService.buyNowRegister(buyNowRegisterPostReq,principal);
        if(!res.equals(null)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "등록 실패"));
        }

    }
    @Transactional
    @ApiOperation(value = "경매 등록 ")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    @PostMapping("/auction")
    public ResponseEntity<BaseResponseBody> auctionRegister(@RequestBody AuctionRegisterPostReq auctionRegisterPostReq, Principal principal){

        log.info("dealRegister - 호출");

        Long res = dealService.auctionRegister(auctionRegisterPostReq,principal);
        if(!res.equals(null)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "등록 실패"));
        }

    }
    // 거래 생성 bid, 거래 완료 모두 create로

    // 옥션 가격제안 type =

    // READ
    // productId에 해당하는 지난 거래 내역들 조회


    // UPDATE


    // DELETE
    // 거래 종료?
}
