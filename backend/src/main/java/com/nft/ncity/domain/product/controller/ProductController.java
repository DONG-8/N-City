package com.nft.ncity.domain.product.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.response.AuthenticationListGetRes;
import com.nft.ncity.domain.favorite.db.repository.FavoriteRepositorySupport;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import com.nft.ncity.domain.product.request.ProductRegisterPostReq;
import com.nft.ncity.domain.product.response.ProductListGetRes;
import com.nft.ncity.domain.product.service.ProductService;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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


    // CREATE
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



    // READ
    @ApiOperation(value = "상품전체조회")
    @GetMapping
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ProductListGetRes.class),
            @ApiResponse(code = 404, message = "상품 없음.")
    })
    public ResponseEntity<Page<ProductListGetRes>> getProductList(@PageableDefault(page = 0, size = 10) Pageable pageable){
        log.info("getProductList - 호출");
        Page<ProductListGetRes> products = productService.getProductList(pageable);

        if(products.isEmpty()) {
            log.error("getProductList - Products doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.status(200).body(products);
    }


    @GetMapping("/{productCode}")
    @ApiOperation(value = "카테고리별 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ProductListGetRes.class),
            @ApiResponse(code = 404, message = "상품 없음.")
    })
    public ResponseEntity<Page<ProductListGetRes>> getProductListByCode(    @PageableDefault(page = 0, size = 10) Pageable pageable,
                                                                            @ApiParam(value = "카테고리")@PathVariable("productCode") int productCode){
        log.info("getProductListByCode - 호출");
        Page<ProductListGetRes> products = productService.getProductListByCode(pageable,productCode);

        if(products.isEmpty()) {
            log.error("getProductListByCode - Products doesn't exist on this category");
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.status(200).body(products);
    }


    @GetMapping("/search/{productTitle}")
    @ApiOperation(value = "상품 이름으로 검색")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ProductListGetRes.class),
            @ApiResponse(code = 404, message = "상품 없음.")
    })
    public ResponseEntity<Page<ProductListGetRes>> getProductListByTitle(@PageableDefault(page = 0, size = 10) Pageable pageable,
                                                                        @ApiParam(value = "상품명") @PathVariable("productTitle") String productTitle){


        log.info("productTitle - 호출");
        Page<ProductListGetRes> products = productService.getProductListByTitle(pageable,productTitle);

        if(products.isEmpty()){
            log.error("getProductListByTitle - Products doesn't exit on this Title");
            return ResponseEntity.status(404).body(null);
        }

        return ResponseEntity.status(200).body(products);


    }

    @ApiOperation(value = "상품 상세 조회")
    @GetMapping("/detail/{productId}")
    public Product productDetail(@ApiParam(value = "상품 ID") @PathVariable("productId") Long productId){
        log.info("productDetail - 호출");
        return productService.productDetail(productId);
    }





    // UPDATE
    // 제목, 설명, 카테고리, 상품id 무조건 던져줘야함! 안주면 0으로 초기화... 된다..
    @ApiOperation(value = "상품 정보 수정")
    @PutMapping
    public ResponseEntity<BaseResponseBody> productModify(@RequestBody ProductModifyPutReq productModifyPutReq ){
        log.info("productModify - 호출");
        if (productService.productModify(productModifyPutReq) == 0){
            log.error("productModify - This productId doesn't exist.");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "This productId doesn't exist."));
        } else {    // 정상 작동
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success")); //post나 put 요청 성공시 201 사용
        }
    }

    // 


    // DELETE
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
