package com.nft.ncity.domain.product.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.nft.ncity.domain.authentication.service.AwsS3Service;
import com.nft.ncity.domain.favorite.db.repository.FavoriteRepositorySupport;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.db.repository.ProductRepository;
import com.nft.ncity.domain.product.db.repository.ProductRepositorySupport;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import com.nft.ncity.domain.product.request.ProductRegisterPostReq;
import com.nft.ncity.domain.product.response.ProductDealListGetRes;
import com.nft.ncity.domain.product.response.ProductListGetRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;
import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService{

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductRepositorySupport productRepositorySupport;

    @Autowired
    FavoriteRepositorySupport favoriteRepositorySupport;

    @Autowired
    AwsS3Service awsS3Service;



    // CREATE
    @Override
    @Transactional
    public Product productRegister(ProductRegisterPostReq productRegisterPostReq, MultipartFile productFile, MultipartFile thumbnailFile, Principal principal) throws IOException {

        // 상품 파일 처리

        // 실제 파일 이름을 받아서 랜덤한 이름으로 변경해준다.
        String fileName = awsS3Service.createFileName(productFile.getOriginalFilename());

        // 파일 객체 생성
        // System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
        File file = new File(System.getProperty("user.dir") + fileName);

        // 파일 저장
        productFile.transferTo(file);

        // S3 파일 업로드
        awsS3Service.uploadOnS3(fileName, file);
        // 주소 할당
        String productFileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

        // 파일 삭제
        file.delete();


        // 상품 썸네일 처리

        // 실제 파일 이름을 받아서 랜덤한 이름으로 변경해준다.
        String thumbnailFileName = awsS3Service.createFileName(thumbnailFile.getOriginalFilename());

        // 파일 객체 생성
        // System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
        File file2 = new File(System.getProperty("user.dir") + thumbnailFileName);

        // 파일 저장
        thumbnailFile.transferTo(file2);

        // S3 파일 업로드
        awsS3Service.uploadOnS3(thumbnailFileName, file2);
        // 주소 할당
        String productThumbnailUrl = amazonS3Client.getUrl(bucket, thumbnailFileName).toString();

        // 파일 삭제
        file2.delete();

        Product product = Product.builder()
                .userId(Long.valueOf(principal.getName()))
                .productTitle(productRegisterPostReq.getProductTitle())
                .productDesc(productRegisterPostReq.getProductDesc())
                .productCode(productRegisterPostReq.getCode())
                .productRegDt(LocalDateTime.now())
                .productFileUrl(productFileUrl)
                .productThumbnailUrl(productThumbnailUrl)
                .build();

        Product savedProduct = productRepository.save(product);

        return savedProduct;
    }


    // READ

    @Override
    public Page<ProductListGetRes> getProductList(Pageable pageable) {
        Page<Product> products = productRepositorySupport.findProductList(pageable);
        List<ProductListGetRes> productListGetRes = new ArrayList<>();

        long total = products.getTotalElements();

        for(Product p : products.getContent()){
            ProductListGetRes productList = new ProductListGetRes();

            productList.setProductTitle(p.getProductTitle());
            productList.setProductPrice(p.getProductPrice());
            productList.setProductRegDt(p.getProductRegDt());
            productList.setProductThumbnailUrl(p.getProductThumbnailUrl());
            productList.setProductFavorite(favoriteRepositorySupport.getFavoriteCount(p.getProductId()));

            productListGetRes.add(productList);
        }

        Page<ProductListGetRes> res = new PageImpl<>(productListGetRes, pageable, total);

        return res;

    }

    @Override
    public Page<ProductListGetRes> getProductListByCode(Pageable pageable, int productCode) {
        Page<Product> products = productRepositorySupport.findProductListByCode(pageable, productCode);
        List<ProductListGetRes> productListGetRes = new ArrayList<>();

        long total = products.getTotalElements();

        for(Product p : products.getContent()){
            ProductListGetRes productList = new ProductListGetRes();

            productList.setProductTitle(p.getProductTitle());
            productList.setProductPrice(p.getProductPrice());
            productList.setProductRegDt(p.getProductRegDt());
            productList.setProductThumbnailUrl(p.getProductThumbnailUrl());
            productList.setProductFavorite(favoriteRepositorySupport.getFavoriteCount(p.getProductId()));

            productListGetRes.add(productList);
        }

        Page<ProductListGetRes> res = new PageImpl<>(productListGetRes, pageable, total);

        return res;
    }

    @Override
    public Page<ProductDealListGetRes> getProductDealList(Pageable pageable) {
        Page<Product> products = productRepositorySupport.findProductDealList(pageable);
        List<ProductDealListGetRes> productDealListGetRes = new ArrayList<>();

        long total = products.getTotalElements();

        for(Product p : products.getContent()){
            ProductDealListGetRes productDealList = new ProductDealListGetRes();

            productDealList.setProductTitle(p.getProductTitle());
            productDealList.setProductPrice(p.getProductPrice());
            productDealList.setProductRegDt(p.getProductRegDt());
            productDealList.setProductThumbnailUrl(p.getProductThumbnailUrl());
            productDealList.setProductState(p.getProductState());
            productDealList.setProductFavorite(favoriteRepositorySupport.getFavoriteCount(p.getProductId()));

            productDealListGetRes.add(productDealList);
        }

        Page<ProductDealListGetRes> res = new PageImpl<>(productDealListGetRes, pageable, total);

        return res;

    }

    @Override
    public Page<ProductDealListGetRes> getProductDealListByCode(Pageable pageable, int productCode) {
        Page<Product> products = productRepositorySupport.findProductDealListByCode(pageable, productCode);
        List<ProductDealListGetRes> productDealListGetRes = new ArrayList<>();

        long total = products.getTotalElements();

        for(Product p : products.getContent()){
            ProductDealListGetRes productDealList = new ProductDealListGetRes();

            productDealList.setProductTitle(p.getProductTitle());
            productDealList.setProductPrice(p.getProductPrice());
            productDealList.setProductRegDt(p.getProductRegDt());
            productDealList.setProductThumbnailUrl(p.getProductThumbnailUrl());
            productDealList.setProductState(p.getProductState());
            productDealList.setProductFavorite(favoriteRepositorySupport.getFavoriteCount(p.getProductId()));

            productDealListGetRes.add(productDealList);
        }

        Page<ProductDealListGetRes> res = new PageImpl<>(productDealListGetRes, pageable, total);

        return res;
    }

    // 상품명으로 검색
    @Override
    public Page<ProductListGetRes> getProductListByTitle(Pageable pageable, String productTitle) {
        Page<Product> products = productRepositorySupport.findProductListByTitle(pageable, productTitle);
        List<ProductListGetRes> productListGetRes = new ArrayList<>();

        long total = products.getTotalElements();

        for(Product p : products.getContent()){
            ProductListGetRes productList = new ProductListGetRes();

            productList.setProductTitle(p.getProductTitle());
            productList.setProductPrice(p.getProductPrice());
            productList.setProductRegDt(p.getProductRegDt());
            productList.setProductThumbnailUrl(p.getProductThumbnailUrl());
            productList.setProductFavorite(favoriteRepositorySupport.getFavoriteCount(p.getProductId()));

            productListGetRes.add(productList);
        }

        Page<ProductListGetRes> res = new PageImpl<>(productListGetRes, pageable, total);

        return res;
    }


    @Override
    public Product productDetail(Long productId) {
        Product product = productRepository.findById(productId).get();
        product.setFavoriteCount(favoriteRepositorySupport.getFavoriteCount(productId));
        return product;
    }



    // UPDATE
    @Override
    public long productModify(ProductModifyPutReq productModifyReq) {
        // 해당 상품이 존재하면 수정, 존재하지않으면 null 반환
        if (productRepository.findById(productModifyReq.getProductId()).isPresent()){
            long  execute = productRepositorySupport.updateProductByProductId(productModifyReq);
            return execute;
        }else return 0;
    }

    // DELETE
    @Override
    public boolean productRemove(Long productId) {
        //해당 상품이 존재하면 삭제후 true 반환, 그렇지 않으면 false반환
        if (productRepository.findById(productId).isPresent()){
            productRepository.deleteById(productId);
            return true;
        }else return false;
    }
}
