package com.nft.ncity.domain.product.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import com.nft.ncity.domain.product.request.ProductRegisterPostReq;
import com.nft.ncity.domain.product.service.ProductService;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.IOException;
import java.security.Principal;

@Slf4j
@Api(value = "상품정보")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    ProductService productService;


    // Create
    @Transactional
    @ApiOperation(value = "상품 등록")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    @PostMapping
    public ResponseEntity<BaseResponseBody> productRegister(@ModelAttribute ProductRegisterPostReq productRegisterPostReq,
                                            @RequestPart(value = "productFile")MultipartFile productFile,
                                            @RequestPart(value = "thumbnailFile")MultipartFile thumbnailFile,
                                            Principal principal) throws IOException {

        // 상품 정보는 productRegisterPostReq에, 파일은 productFile, 썸네일은 thumbnailFile에 담아온다.
        // 상품 정보와 file url을 Product 테이블에 저장한다. (민팅 개념임으로 file url은 변경 할 수 없다.)
        // 저장 결과 성공적이면 200, 중간에 다른 정보들이 없으면 404

        log.info("productRegister - 호출");
        Product product = productService.productRegister(productRegisterPostReq,productFile,thumbnailFile,principal);
        if(!product.equals(null)) {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "등록 성공"));
        }
        else {
            return ResponseEntity.status(201).body(BaseResponseBody.of(404, "등록 실패"));
        }
    }



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
//    @ApiOperation(value = "상품 정보 수정")
//    @PutMapping
//    public ResponseEntity<BaseResponseBody> productModify(@RequestPart ProductModifyPutReq productModify , HttpServletRequest request){
//        log.info("productModify - 호출");
//        if (productService.productModify(productModify) == null){
//            log.error("productModify - This productId doesn't exist.");
//            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "This productId doesn't exist."));
//        } else {    // 정상 작동
//            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success")); //post나 put 요청 성공시 201 사용
//        }
//    }


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
