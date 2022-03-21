package com.nft.ncity.domain.product.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import com.nft.ncity.domain.product.service.ProductService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Api(value = "상품정보")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    ProductService productService;


    // Create
    // 상품등록이라 multipart/form-data로 수정해야 할 듯!
//    @ApiOperation(value = "상품 등록")
//    @PostMapping
//    public ResponseEntity<> productRegister(@RequestPart ProductRegisterPostReq productRegister, HttpServletRequest request){
//        log.info("productRegister - 호출");
//        productService.productRegister(productRegister);
//
//        return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success")); // BaseResponseBody를 맞추던가.. 아니면 보고 바꿔야 겠는데..
//    }




    // Read
    // 프런트와 pagable 어떻게 구현할지 얘기
    // 카테고리별 조회 기능을 추가 해야함
    // 좋아요 기능 구현후 같이 던져줘야 함
    @ApiOperation(value = "상품 전체 조회")
    @GetMapping
    public Page<Product> productList (@ApiParam(value = "페이지 번호")@RequestParam int page, @ApiParam(value = "페이지당 게시글 개수") @RequestParam int size){
        log.info("productList - 호출");
        return productService.productList(page, size);
    }


    @ApiOperation(value = "상품 상세 조회")
    @GetMapping("/detail/{productId}")
    public Product productDetail(@ApiParam(value = "상품 ID") @PathVariable("productId") Long productId){
        log.info("productDetail - 호출");
        return productService.productDetail(productId);
    }



    // Update
    // multipart가 put이 안되서 post해야 한다고 들었는데...
    @ApiOperation(value = "상품 정보 수정")
    @PutMapping
    public ResponseEntity<BaseResponseBody> productModify(@RequestPart ProductModifyPutReq productModify , HttpServletRequest request){
        log.info("productModify - 호출");
        if (productService.productModify(productModify) == null){
            log.error("productModify - This productId doesn't exist.");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "This productId doesn't exist."));
        } else {    // 정상 작동
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success")); //post나 put 요청 성공시 201 사용
        }
    }


    // Delete
    @ApiOperation(value="상품 삭제")
    @DeleteMapping("/{productId}")
    public ResponseEntity<BaseResponseBody> productRemove(@ApiParam(value = "상품 번호") @PathVariable Long productId){
        log.info("productRemove - 호출");
        if (productService.productRemove(productId)) {  // 정상 작동
            return ResponseEntity.status(201).body(BaseResponseBody.of(200, "Success"));
        } else {    // 해당 상품이 존재하지 않는 경우
            log.error("qnaQuestionRemove - This questionId doesn't exist.");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "This productId doesn't exist."));
        }

    }






}
