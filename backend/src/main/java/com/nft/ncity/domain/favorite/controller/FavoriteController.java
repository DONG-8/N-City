package com.nft.ncity.domain.favorite.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.favorite.service.FavoriteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Api(value ="좋아요")
@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {




    @Autowired
    FavoriteService favoriteService;


    // Create
    @ApiOperation(value = "좋아요 추가")
    @PostMapping("/{productId}")
    public ResponseEntity<BaseResponseBody> favoriteCreate (@ApiParam(value = "상품id") @PathVariable("productId") Long productId){
        log.info("favoriteCreate - 호출");
        // userId 토큰에서 받은 후 전달
//        favoriteService.favoriteCreate(userId, productId)

        return ResponseEntity.status(201).body(BaseResponseBody.of(200,"Success"));
    }

}
