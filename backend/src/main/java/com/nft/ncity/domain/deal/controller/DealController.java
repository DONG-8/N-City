package com.nft.ncity.domain.deal.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.deal.db.entity.Deal;
import com.nft.ncity.domain.deal.request.AuctionRegisterPostReq;
import com.nft.ncity.domain.deal.request.BuyNowRegisterPostReq;
import com.nft.ncity.domain.deal.response.DealListGetRes;
import com.nft.ncity.domain.deal.service.DealService;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/register/buyNow")
    public ResponseEntity<BaseResponseBody> buyNowRegister(@RequestBody BuyNowRegisterPostReq buyNowRegisterPostReq, Principal principal){

        log.info("dealRegister - 호출");
        Long userId = Long.valueOf(1L);
        Long res = dealService.buyNowRegister(buyNowRegisterPostReq,userId);
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
    @PostMapping("/register/auction")
    public ResponseEntity<BaseResponseBody> auctionRegister(@RequestBody AuctionRegisterPostReq auctionRegisterPostReq, Principal principal){

        log.info("dealRegister - 호출");
        Long userId = Long.valueOf(1L);
        Long res = dealService.auctionRegister(auctionRegisterPostReq,userId);
        if(!res.equals(null)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "등록 실패"));
        }
    }

    // auction 참가 (bid)
    @PostMapping("/auction")
    @ApiOperation(value = "경매참가")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    public ResponseEntity<BaseResponseBody> bidRegister(@RequestBody BuyNowRegisterPostReq buyNowRegisterPostReq, Principal principal){
        log.info("bidRegister - 호출");
        Long userId = Long.valueOf(1L);
        Deal deal = dealService.bidRegister(buyNowRegisterPostReq,userId);
        if(!deal.equals(null)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "등록 실패"));
        }
    }

    // 즉시 구매
    @PostMapping("/buy/now/{productId}")
    @ApiOperation(value = "즉시구매")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    public ResponseEntity<BaseResponseBody> buyNow( @ApiParam(value = "상품id") @PathVariable("productId") Long productId, Principal principal){
        log.info("buyNow - 호출");
        Long userId = Long.valueOf(1L);
        Deal deal = dealService.buyNow(productId,userId);
        if(!deal.equals(null)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "등록 실패"));
        }
    }

    // 즉시 구매 취소
    @PostMapping("/buy/cancel/{productId}")
    @ApiOperation(value = "즉시구매 등록 취소")
    @ApiResponses({
            @ApiResponse(code = 201, message = "취소 성공"),
            @ApiResponse(code = 404, message = "취소 실패")
    })
    public ResponseEntity<BaseResponseBody> buyNowCancel(@ApiParam(value = "상품id") @PathVariable("productId") Long proudctId, Principal principal){
        log.info("buyNowCancel - 호출");
        Long userId = Long.valueOf(1L);
        Deal deal = dealService.buyNowCancel(proudctId,userId);
        if(!deal.equals(null)){
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "등록 실패"));
        }
    }

    // 경매 입찰
    @PostMapping("/buy/auction/{productId}")
    @ApiOperation(value = "경매 입찰")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    public ResponseEntity<BaseResponseBody> buyAuction( @ApiParam(value = "상품id") @PathVariable("productId") Long productId, Principal principal){
        log.info("buyAuction - 호출");
        Long userId = Long.valueOf(1L);
        Deal deal = dealService.buyAuction(productId,userId);
        if(!deal.equals(null)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "등록 실패"));
        }
    }

    // READ
    // productId에 해당하는 지난 거래 내역들 조회
    @ApiOperation(value = "지난 거래내역 조회")
    @GetMapping("/{productId}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = DealListGetRes.class),
            @ApiResponse(code = 404, message = "상품 없음.")
    })
    public ResponseEntity<Page<DealListGetRes>> getDealList(@PageableDefault(page=0 ,size = 10) Pageable pageable ,
                                                            @ApiParam(value = "상품id") @PathVariable("productId") Long productId){
        log.info("getDealList - 호출 ");
        Page<DealListGetRes> dealList = dealService.getDealListByProductId(pageable,productId);

        if(dealList.isEmpty()) {
            log.error("getDealListByProductId - dealList doesn't exist on this productId");
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.status(200).body(dealList);
    }
}
