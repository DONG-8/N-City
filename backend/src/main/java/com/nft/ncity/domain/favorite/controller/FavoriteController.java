package com.nft.ncity.domain.favorite.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.favorite.db.entity.Favorite;
import com.nft.ncity.domain.favorite.service.FavoriteService;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Slf4j
@Api(value ="좋아요")
@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    FavoriteService favoriteService;

    // Create
    @PostMapping("/{productId}")
    @ApiOperation(value = "상품 좋아요 추가")
    @ApiResponses({
            @ApiResponse(code = 201,message = "신청 성공"),
            @ApiResponse(code = 404, message = "신청 실패")
    })
    public ResponseEntity<BaseResponseBody> favoriteRegister (Principal principal,
                                                              @ApiParam(value = "상품id") @PathVariable("productId") Long productId){
        log.info("favoriteRegister - 호출");
        Long userId = Long.valueOf(principal.getName());

        Favorite favorite = favoriteService.favoriteRegister(userId, productId);

        if(null != favorite){
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"신청 성공"));
        }else{
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "신청 실패"));
        }
    }

    // Read
    // 1. 좋아요 했는지 여부
    // 2. 좋아요한 수
    // 3. 내가 좋아요한 상품 리스트 -> User에 있네??
    @GetMapping("/{productId}")
    @ApiOperation(value = "내가 좋아요한 여부")
    @ApiResponses({
            @ApiResponse(code = 201 , message = "반환 성공"),
            @ApiResponse(code = 404 , message = "반환 실패")
    })
    public boolean getFavoriteUserUse ( Principal principal,
                                 @ApiParam(value = "상품id") @PathVariable("productId") Long productId){
        log.info("favoriteGet - 호출");
        Long userId = Long.valueOf(principal.getName());

        if( favoriteService.getFavoriteUserUse(userId, productId)){
            return true;
        }else{
            return false;
        }

    }

    @GetMapping("/{productId}/count")
    @ApiOperation(value = "좋아요 수")
    @ApiResponses({
            @ApiResponse(code = 201 , message = "반환 성공"),
            @ApiResponse(code = 404 , message = "반환 실패")
    })
    public Long getFavoriteCount (@ApiParam(value = "상품id") @PathVariable("productId") Long productId){
        log.info("getFavoriteCount - 호출");
        return favoriteService.getFavoriteCount(productId);
    }



    // Delete
    @DeleteMapping("/{productId}")
    @ApiOperation(value = "좋아요취소")
    @ApiResponses({
            @ApiResponse(code = 201 , message = "취소 성공"),
            @ApiResponse(code = 404 , message = "취소 실패")
    })
    public ResponseEntity<BaseResponseBody> favoriteRemove(@ApiParam(value ="상품id") @PathVariable("productId") Long productId,
                                                           Principal principal){
        log.info("favoriteRemove - 호출");
        Long userId = Long.valueOf(principal.getName());
        Favorite favorite = favoriteService.favoriteRemove(userId,productId);

        if(null != favorite){
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"신청 성공"));
        }else{
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "신청 실패"));
        }
    }
}