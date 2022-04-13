package com.nft.ncity.domain.product.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.nft.ncity.domain.authentication.service.AwsS3Service;
import com.nft.ncity.domain.deal.db.entity.Deal;
import com.nft.ncity.domain.deal.db.repository.DealRepository;
import com.nft.ncity.domain.deal.db.repository.DealRepositorySupport;
import com.nft.ncity.domain.favorite.db.entity.Favorite;
import com.nft.ncity.domain.favorite.db.entity.QFavorite;
import com.nft.ncity.domain.favorite.db.repository.FavoriteRepositorySupport;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.db.entity.QProduct;
import com.nft.ncity.domain.product.db.repository.ProductRepository;
import com.nft.ncity.domain.product.db.repository.ProductRepositorySupport;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import com.nft.ncity.domain.product.request.ProductRegisterPostReq;
import com.nft.ncity.domain.product.request.TokenRegisterPutReq;
import com.nft.ncity.domain.product.response.ProductDealListGetRes;
import com.nft.ncity.domain.product.response.ProductDetailGetRes;
import com.nft.ncity.domain.product.response.ProductListGetRes;
import com.nft.ncity.domain.product.response.ProductTop10GetRes;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.db.repository.UserRepository;
import com.nft.ncity.domain.user.db.repository.UserRepositorySupport;
import com.nft.ncity.domain.user.response.UserMintProductRes;
import com.nft.ncity.domain.user.response.UserProductWithIsFavoriteRes;
import com.querydsl.core.Tuple;
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
    DealRepository dealRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    DealRepositorySupport dealRepositorySupport;
    @Autowired
    AwsS3Service awsS3Service;

    QProduct qProduct = QProduct.product;
    QFavorite qFavorite = QFavorite.favorite;


    // CREATE
    @Override
    @Transactional
    public Product productRegister(ProductRegisterPostReq productRegisterPostReq, MultipartFile productFile, MultipartFile thumbnailFile, Long userId) throws IOException {

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
                .userId(Long.valueOf(1L))
                .productTitle(productRegisterPostReq.getProductTitle())
                .productDesc(productRegisterPostReq.getProductDesc())
                .productCode(productRegisterPostReq.getCode())
                .productState(3)
                .productRegDt(LocalDateTime.now())
                .productFileUrl(productFileUrl)
                .productThumbnailUrl(productThumbnailUrl)
                .build();

        Product savedProduct = productRepository.save(product);

        Deal deal = Deal.builder()
                .productId(savedProduct.getProductId())
                .dealType(6)
                .dealFrom((long)0)
                .dealTo(Long.valueOf(1L))
                .dealCreatedAt(LocalDateTime.now())
                .build();

        dealRepository.save(deal);
        return savedProduct;
    }

    @Override
    public Long tokenRegister(TokenRegisterPutReq tokenRegisterPutReq){
        if (productRepository.findById(tokenRegisterPutReq.getProductId()).isPresent()){
            long  execute = productRepositorySupport.updateTokenByProductId(tokenRegisterPutReq);
            dealRepositorySupport.updateTokenByProductId(tokenRegisterPutReq);
            return execute;
        }else return null;
    }

    // READ
    //상품 전체조회
    @Override
    public Page<ProductListGetRes> getProductList(Pageable pageable) {
        Page<Product> products = productRepositorySupport.findProductList(pageable);
        List<ProductListGetRes> productListGetRes = new ArrayList<>();

        long total = products.getTotalElements();

        for(Product p : products.getContent()){
            ProductListGetRes productList = new ProductListGetRes();

            User user = userRepositorySupport.findMintingUserByProductId(p.getProductId());

            productList.setUserRole(user.getUserRole());
            productList.setProductTitle(p.getProductTitle());
            productList.setProductPrice(p.getProductPrice());
            productList.setProductRegDt(p.getProductRegDt());
            productList.setProductId(p.getProductId());
            productList.setProductCode(p.getProductCode());
            productList.setProductThumbnailUrl(p.getProductThumbnailUrl());
            productList.setProductFavorite(favoriteRepositorySupport.getFavoriteCount(p.getProductId()));
            productList.setProductFavoriteUser(favoriteRepositorySupport.getFavoriteUser(p.getProductId()));
            productList.setProductState(p.getProductState());
            productList.setProductAuctionEndTime(p.getProductAuctionEndTime());

            productListGetRes.add(productList);
        }
        Page<ProductListGetRes> res = new PageImpl<>(productListGetRes, pageable, total);
        return res;
    }

    // READ
    // 최신상품 10개 조회
    @Override
    public List<ProductListGetRes> getProductNew10List() {
        List<Product> products = productRepositorySupport.findProductNew10List();

        List<ProductListGetRes> productListGetRes = new ArrayList<>();

        for(Product p : products){
            ProductListGetRes productList = new ProductListGetRes();

            User user = userRepositorySupport.findMintingUserByProductId(p.getProductId());

            productList.setUserRole(user.getUserRole());
            productList.setProductTitle(p.getProductTitle());
            productList.setProductPrice(p.getProductPrice());
            productList.setProductRegDt(p.getProductRegDt());
            productList.setProductId(p.getProductId());
            productList.setProductCode(p.getProductCode());
            productList.setProductThumbnailUrl(p.getProductThumbnailUrl());
            productList.setProductFavorite(favoriteRepositorySupport.getFavoriteCount(p.getProductId()));
            productList.setProductFavoriteUser(favoriteRepositorySupport.getFavoriteUser(p.getProductId()));
            productList.setProductState(p.getProductState());

            productListGetRes.add(productList);
        }
        return productListGetRes;
    }

    @Override
    public Page<ProductListGetRes> getProductListByCode(Pageable pageable, int productCode) {
        Page<Product> products = productRepositorySupport.findProductListByCode(pageable, productCode);
        List<ProductListGetRes> productListGetRes = new ArrayList<>();

        long total = products.getTotalElements();

        for(Product p : products.getContent()){
            ProductListGetRes productList = new ProductListGetRes();

             User user = userRepositorySupport.findMintingUserByProductId(p.getProductId());

            productList.setUserRole(user.getUserRole());
            productList.setProductTitle(p.getProductTitle());
            productList.setProductPrice(p.getProductPrice());
            productList.setProductRegDt(p.getProductRegDt());
            productList.setProductId(p.getProductId());
            productList.setProductCode(p.getProductCode());
            productList.setProductThumbnailUrl(p.getProductThumbnailUrl());
            productList.setProductFavorite(favoriteRepositorySupport.getFavoriteCount(p.getProductId()));
            productList.setProductFavoriteUser(favoriteRepositorySupport.getFavoriteUser(p.getProductId()));
            productList.setProductState(p.getProductState());

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
            User user = userRepositorySupport.findMintingUserByProductId(p.getProductId());

            productDealList.setUserRole(user.getUserRole());
            productDealList.setProductTitle(p.getProductTitle());
            productDealList.setProductPrice(p.getProductPrice());
            productDealList.setProductRegDt(p.getProductRegDt());
            productDealList.setProductId(p.getProductId());
            productDealList.setProductCode(p.getProductCode());
            productDealList.setProductThumbnailUrl(p.getProductThumbnailUrl());
            productDealList.setProductState(p.getProductState());
            productDealList.setProductFavorite(favoriteRepositorySupport.getFavoriteCount(p.getProductId()));
            productDealList.setProductFavoriteUser(favoriteRepositorySupport.getFavoriteUser(p.getProductId()));

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
            User user = userRepositorySupport.findMintingUserByProductId(p.getProductId());

            productDealList.setUserRole(user.getUserRole());
            productDealList.setProductTitle(p.getProductTitle());
            productDealList.setProductPrice(p.getProductPrice());
            productDealList.setProductRegDt(p.getProductRegDt());
            productDealList.setProductId(p.getProductId());
            productDealList.setProductCode(p.getProductCode());
            productDealList.setProductThumbnailUrl(p.getProductThumbnailUrl());
            productDealList.setProductState(p.getProductState());
            productDealList.setProductFavorite(favoriteRepositorySupport.getFavoriteCount(p.getProductId()));
            productDealList.setProductFavoriteUser(favoriteRepositorySupport.getFavoriteUser(p.getProductId()));

            productDealListGetRes.add(productDealList);
        }

        Page<ProductDealListGetRes> res = new PageImpl<>(productDealListGetRes, pageable, total);

        return res;
    }

    // 상품명으로 검색
    @Override
    public Page<ProductListGetRes> getProductListByTitle(Pageable pageable, String productTitle)  {
        Page<Product> products = productRepositorySupport.findProductListByTitle(pageable, productTitle);
        List<ProductListGetRes> productListGetRes = new ArrayList<>();

        long total = products.getTotalElements();

        for(Product p : products.getContent()){
            ProductListGetRes productList = new ProductListGetRes();
            User user = userRepositorySupport.findMintingUserByProductId(p.getProductId());

            productList.setUserRole(user.getUserRole());
            productList.setProductTitle(p.getProductTitle());
            productList.setProductPrice(p.getProductPrice());
            productList.setProductRegDt(p.getProductRegDt());
            productList.setProductId(p.getProductId());
            productList.setProductCode(p.getProductCode());
            productList.setProductThumbnailUrl(p.getProductThumbnailUrl());
            productList.setProductFavorite(favoriteRepositorySupport.getFavoriteCount(p.getProductId()));
            productList.setProductFavoriteUser(favoriteRepositorySupport.getFavoriteUser(p.getProductId()));

            productListGetRes.add(productList);
        }

        Page<ProductListGetRes> res = new PageImpl<>(productListGetRes, pageable, total);

        return res;
    }


    @Override
    public ProductDetailGetRes productDetail(Long productId) {
        Product p = productRepository.findById(productId).get();

        ProductDetailGetRes productDetailGetRes = new ProductDetailGetRes();

        productDetailGetRes.setProductId(productId);
        productDetailGetRes.setUserId(p.getUserId());
        productDetailGetRes.setUserNick(productRepositorySupport.getUserNickByUserId(p.getUserId()));
        productDetailGetRes.setTokenId(p.getTokenId());
        productDetailGetRes.setProductTitle(p.getProductTitle());
        productDetailGetRes.setProductDesc(p.getProductDesc());
        productDetailGetRes.setProductCode(p.getProductCode());
        productDetailGetRes.setProductXCoordinate(p.getProductXCoordinate());
        productDetailGetRes.setProductYCoordinate(p.getProductYCoordinate());
        productDetailGetRes.setProductView(p.isProductView());
        productDetailGetRes.setProductState(p.getProductState());
        productDetailGetRes.setProductPrice(p.getProductPrice());
        productDetailGetRes.setProductRegDt(p.getProductRegDt());
        productDetailGetRes.setProductFileUrl(p.getProductFileUrl());
        productDetailGetRes.setProductThumbnailUrl(p.getProductThumbnailUrl());
        productDetailGetRes.setProductAuctionEndTime(p.getProductAuctionEndTime());
        productDetailGetRes.setMintUserId(productRepositorySupport.getMintUserIdByProductId(productId));
        productDetailGetRes.setFavoriteCount(favoriteRepositorySupport.getFavoriteCount(productId));
        return productDetailGetRes;
    }


    // 좋아요 높은 10개 상품 가져오기
    @Override
    public List<ProductListGetRes> getProductFavoriteRank(){

        List<Tuple> productList = productRepositorySupport.getFavoriteTop10Product();

        List<ProductListGetRes> res = new ArrayList<ProductListGetRes>();

        productList.forEach(product -> {

                ProductListGetRes productListGetRes = new ProductListGetRes();

//                User user = userRepositorySupport.findUserByUserId(product.get(qProduct).getUserId());
                User user = userRepositorySupport.findMintingUserByProductId(product.get(qProduct).getProductId());

                productListGetRes.setUserRole(user.getUserRole());
                productListGetRes.setProductId(product.get(qProduct).getProductId());
                productListGetRes.setProductTitle(product.get(qProduct).getProductTitle());
                productListGetRes.setProductPrice(product.get(qProduct).getProductPrice());
                productListGetRes.setProductThumbnailUrl(product.get(qProduct).getProductThumbnailUrl());
                productListGetRes.setProductFavorite(product.get(qFavorite.count()).longValue());
                productListGetRes.setProductRegDt(product.get(qProduct).getProductRegDt());
                productListGetRes.setProductCode(product.get(qProduct).getProductCode());
                productListGetRes.setProductFavoriteUser(favoriteRepositorySupport.getFavoriteUser(product.get(qProduct).getProductId()));
                productListGetRes.setProductState(product.get(qProduct).getProductState());

                res.add(productListGetRes);

                }
            );

        return res;
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

    @Override
    public long productMyroomModify(ProductModifyPutReq productModifyReq) {
        // 해당 상품이 존재하면 수정, 존재하지않으면 null 반환
        if (productRepository.findById(productModifyReq.getProductId()).isPresent()){
            long  execute = productRepositorySupport.updateProductMyroomByProductId(productModifyReq);
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

    @Override
    public Page<UserProductWithIsFavoriteRes> getProductListByUserId(Long userId, Pageable pageable) {
        Page<Product> productList = productRepositorySupport.findProductListByUserId(userId, pageable);
        List<UserProductWithIsFavoriteRes> list = new ArrayList<>();

        for(Product p : productList.getContent()) {
            User user = userRepositorySupport.findMintingUserByProductId(p.getProductId());

            UserProductWithIsFavoriteRes userProductWithIsFavoriteRes = UserProductWithIsFavoriteRes.builder()
                    .productId(p.getProductId())
                    .userId(p.getUserId())
                    .userRole(user.getUserRole())
                    .tokenId(p.getTokenId())
                    .productTitle(p.getProductTitle())
                    .productDesc(p.getProductDesc())
                    .productCode(p.getProductCode())
                    .productState(p.getProductState())
                    .productPrice(p.getProductPrice())
                    .productRegDt(p.getProductRegDt())
                    .productFileUrl(p.getProductFileUrl())
                    .productThumbnailUrl(p.getProductThumbnailUrl())
                    .isFavorite(favoriteRepositorySupport.getIsFavoriteByUserIdAndProductId(userId,p.getProductId()))
                    .productFavoriteCount(favoriteRepositorySupport.getFavoriteCount(p.getProductId()))
                    .productAuctionEndTime(p.getProductAuctionEndTime())
                    .productView(p.isProductView())
                    .productXCoordinate(p.getProductXCoordinate())
                    .productYCoordinate(p.getProductYCoordinate())
                    .build();

            list.add(userProductWithIsFavoriteRes);
        }
        if(list.isEmpty()) return Page.empty();

        return new PageImpl<UserProductWithIsFavoriteRes>(list,pageable,list.size());
    }

    @Override
    public Page<UserMintProductRes> getMintedProductList(Long userId, Pageable pageable) {
        Page<Product> productList = productRepositorySupport.findMindtedProductByUserId(userId, pageable);

        List<UserMintProductRes> list = new ArrayList<>();

        for(Product p : productList.getContent()) {
            UserMintProductRes userMintProductRes = UserMintProductRes.builder()
                    .userId(p.getUserId())
                    .userRole(userRepositorySupport.findUserByUserId(p.getUserId()).getUserRole())
                    .tokenId(p.getTokenId())
                    .productPrice(p.getProductPrice())
                    .productCode(p.getProductCode())
                    .productAuctionEndTime(p.getProductAuctionEndTime())
                    .productDesc(p.getProductDesc())
                    .productFileUrl(p.getProductFileUrl())
                    .productRegDt(p.getProductRegDt())
                    .productState(p.getProductState())
                    .productThumbnailUrl(p.getProductThumbnailUrl())
                    .productTitle(p.getProductTitle())
                    .productAuctionEndTime(p.getProductAuctionEndTime())
                    .productFavoriteCount(favoriteRepositorySupport.getFavoriteCount(p.getProductId()))
                    .isFavorite(favoriteRepositorySupport.getIsFavoriteByUserIdAndProductId(p.getUserId(),p.getProductId()))
                    .build();
            list.add(userMintProductRes);
        }
        if(list.isEmpty()) return Page.empty();

        return new PageImpl<UserMintProductRes>(list, pageable, list.size());
    }

    @Override
    public Page<Product> getFavoriteProduct(Page<Favorite> favorites) {
        List<Product> productList = new ArrayList<>();
        for(Favorite f : favorites.getContent()){
            Product product = productRepositorySupport.findProductByProductId(f.getProductId());
            productList.add(product);
        }
        Page<Product> res = new PageImpl<Product>(productList, favorites.getPageable(), productList.size());
        return res;
    }
}
