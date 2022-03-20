package com.nft.ncity.domain.product.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.nft.ncity.domain.authentication.service.AwsS3Service;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.db.repository.ProductRepository;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import com.nft.ncity.domain.product.request.ProductRegisterPostReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;

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
    AwsS3Service awsS3Service;



    // CREATE
    @Override
    public Product productRegister(ProductRegisterPostReq productRegisterPostReq, MultipartFile productFile, MultipartFile thumbnailFile, Principal principal) throws IOException {

        // 상품 파일 처리

        // 실제 파일 이름을 받아서 랜덤한 이름으로 변경해준다.
        String fileName = awsS3Service.createFileName(productFile.getOriginalFilename());

        // 파일 객체 생성
        // System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
        File file = new File(System.getProperty("user.dir") + fileName);

        // 파일 저장
//        productFile.transferTo(file);

        // S3 파일 업로드
        awsS3Service.uploadOnS3(fileName, file);
        // 주소 할당
        String productFileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

        // 파일 삭제
//        file.delete();


        // 상품 썸네일 처리

        // 실제 파일 이름을 받아서 랜덤한 이름으로 변경해준다.
        String thumbnailFileName = awsS3Service.createFileName(thumbnailFile.getOriginalFilename());

        // 파일 객체 생성
        // System.getProperty => 시스템 환경에 관한 정보를 얻을 수 있다. (user.dir = 현재 작업 디렉토리를 의미함)
        File file2 = new File(System.getProperty("user.dir") + thumbnailFileName);

        // 파일 저장
//        productFile.transferTo(file);

        // S3 파일 업로드
        awsS3Service.uploadOnS3(thumbnailFileName, file2);
        // 주소 할당
        String productThumbnailUrl = amazonS3Client.getUrl(bucket, thumbnailFileName).toString();

        // 파일 삭제
//        file.delete();
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
    public Page<Product> productList(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page -1 , size , Sort.by("productId").descending());
        Page<Product> productList = productRepository.findAll(pageRequest);
        return productList;
    }
    @Override
    public Product productDetail(Long productId) {
        return productRepository.findById(productId).get();
    }

    // UPDATE
//    @Override
//    public Product productModify(ProductModifyPutReq productModify) {
//        // 해당 상품이 존재하면 수정, 존재하지않으면 null 반환
//        if (productRepository.findById(productModify.getProductId()).isPresent()){
//            Product product = new Product();
//
//            product = productRepository.findById(productModify.getProductId()).get(); // 객체로 전부 가져옴
//            product.setProductTitle(productModify.getProductTitle());
//            product.setProductDesc(productModify.getProductDesc());
//
//            // 수정할 것들 더 수정하고 ui 확인후...
//
//            return productRepository.save(product);
//        }else return null;
//    }

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
