package com.nft.ncity.domain.deal.service;

import com.nft.ncity.domain.deal.db.entity.Deal;
import com.nft.ncity.domain.deal.db.repository.DealRepository;
import com.nft.ncity.domain.deal.db.repository.DealRepositorySupport;
import com.nft.ncity.domain.deal.request.AuctionRegisterPostReq;
import com.nft.ncity.domain.deal.request.BuyNowRegisterPostReq;
import com.nft.ncity.domain.deal.response.DealListGetRes;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.db.repository.ProductRepository;
import com.nft.ncity.domain.product.response.ProductDealListGetRes;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.db.repository.UserRepository;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.transaction.Transactional;
import java.util.List;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Slf4j
@RequiredArgsConstructor
@Service("DealService")
public class DealServiceImpl implements DealService{

    @Autowired
    DealRepository dealRepository;

    @Autowired
    DealRepositorySupport dealRepositorySupport;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    //CREATE

    @Override
    @Transactional
    public Long buyNowRegister(BuyNowRegisterPostReq buyNowRegisterPostReq, Long userId){

        // 0. product 테이블에 productId에 해당하는 row있는지 검사 && 판매가능한 상품인지 검사
        // 1. deal 테이블의 productId에 맞게 update
        // 2. product 테이블에서 productId에 해당하는 row 업데이트
        // fromId 만 userId에서 넣으면 됨

        // 0
        Product product =  productRepository.getById(buyNowRegisterPostReq.getProductId());
        if(productRepository.findById(buyNowRegisterPostReq.getProductId()).isPresent() &&
        product.getProductState() == 3 ){

            // 1 deal 테이블 insert
           Deal deal = Deal.builder()
                   .productId(buyNowRegisterPostReq.getProductId())
                   .dealType(2)
                   .dealPrice(buyNowRegisterPostReq.getDealPrice())
                   .dealFrom(Long.valueOf(userId))
                   .tokenId(product.getTokenId())
                   .dealCreatedAt(LocalDateTime.now())
                           .build();
           Deal savedDeal = dealRepository.save(deal);

            // 2. product 테이블 updates
            return dealRepositorySupport.modifyProductForBuyNowRegisterByProductId(buyNowRegisterPostReq);
        }else{
            return  null;
        }
    }

    @Override
    @Transactional
    public Long auctionRegister(AuctionRegisterPostReq auctionRegisterPostReq, Long userId){

        // 0. product 테이블에 productId에 해당하는 row있는지 검사 && 판매가능한 상품인지 검사
        // 1. deal 테이블의 productId에 맞게 update
        // 2. product 테이블에서 productId에 해당하는 row 업데이트
        // fromId 만 userId에서 넣으면 됨

        // 0
        Product product =  productRepository.getById(auctionRegisterPostReq.getProductId());
        if(productRepository.findById(auctionRegisterPostReq.getProductId()).isPresent() &&
                product.getProductState() == 3 ){

            // 1 deal 테이블 insert
            Deal deal = Deal.builder()
                    .productId(auctionRegisterPostReq.getProductId())
                    .dealType(1)
                    .dealPrice(auctionRegisterPostReq.getDealPrice())
                    .dealFrom(Long.valueOf(userId))
                    .tokenId(product.getTokenId())
                    .dealCreatedAt(LocalDateTime.now())
                    .build();
            Deal savedDeal = dealRepository.save(deal);

            // 2. product 테이블 updates
            return dealRepositorySupport.modifyProductForAuctionByProductId(auctionRegisterPostReq);
        }else{
            return  null;
        }
    }

    @Override
    @Transactional
    public Deal bidRegister(BuyNowRegisterPostReq buyNowRegisterPostReq,Long userId){
        Product product =  productRepository.getById(buyNowRegisterPostReq.getProductId());

        // 기존가격보다 더 클때
        if(product.getProductPrice() < buyNowRegisterPostReq.getDealPrice()){

        Deal deal = Deal.builder()
                .productId(buyNowRegisterPostReq.getProductId())
                .dealFrom(Long.valueOf(userId))
                .dealType(3)
                .tokenId(product.getTokenId())
                .dealPrice(buyNowRegisterPostReq.getDealPrice())
                .dealCreatedAt(LocalDateTime.now())
                .build();
        Deal savedDeal = dealRepository.save(deal);
        //기존가격 update
        dealRepositorySupport.modifyProductPriceByProductId(buyNowRegisterPostReq);

        return savedDeal;
        }
        return null;
    }

    //즉시구매
    @Override
    @Transactional
    public Deal buyNow(Long productId,Long userId){

        Product product = productRepository.getById(productId);

        if(product.getProductState() == 2){
            //Deal transfer 생성
            Deal deal = Deal.builder()
                    .dealFrom(product.getUserId())
                    .dealTo(Long.valueOf(userId))
                    .dealType(5)
                    .dealPrice(product.getProductPrice())
                    .dealCreatedAt(LocalDateTime.now())
                    .tokenId(product.getTokenId())
                    .productId(productId)
                    .build();
            Deal savedDeal = dealRepository.save(deal);

            // product update
            dealRepositorySupport.modifyProductForBuyNowByProductId(productId, userId);
            return savedDeal;
        }
        return null;
    }

    // 즉시 구매 취소
    @Override
    @Transactional
    public Deal buyNowCancel(Long productId, Long userId) {
        Product product = productRepository.getById(productId);

        if(product.getProductState() == 2) {
            //Deal cancel 생성
            Deal deal = Deal.builder()
                    .dealFrom(product.getUserId())
                    .dealTo(product.getUserId())
                    .dealType(4)
                    .dealPrice(0.0)
                    .dealCreatedAt(LocalDateTime.now())
                    .tokenId(product.getTokenId())
                    .productId(productId)
                    .build();
            Deal savedDeal = dealRepository.save(deal);

            // product update
            dealRepositorySupport.modifyProductForBuyNowCancelByProductId(productId, userId);
            return savedDeal;
        }
        return null;
    }

    // 경매 입찰
    @Override
    @Transactional
    public Deal buyAuction(Long productId,Long userId){

        Product product = productRepository.getById(productId);

        if(product.getProductState() == 1){
            //Deal transfer 생성
            Deal deal = Deal.builder()
                    .dealFrom(product.getUserId())
                    .dealTo(Long.valueOf(userId))
                    .dealType(5)
                    .dealPrice(product.getProductPrice())
                    .dealCreatedAt(LocalDateTime.now())
                    .tokenId(product.getTokenId())
                    .productId(productId)
                    .build();
            Deal savedDeal = dealRepository.save(deal);

            // product update
            dealRepositorySupport.modifyProductForBuyAuctionByProductId(productId, userId);
            return savedDeal;
        }
        return null;
    }

    //READ
    // 해당상품 지난 거래내역

    @Override
    @Transactional
    public Page<DealListGetRes> getDealListByProductId(Pageable pageable, Long productId) {
        Page<Deal> deals = dealRepositorySupport.findDealListByProductId(pageable,productId);
        List<DealListGetRes> dealListGetRes = new ArrayList<>();

        long total = deals.getTotalElements();

        for(Deal d : deals.getContent()){
            DealListGetRes dealList = new DealListGetRes();

            dealList.setDealFrom(0L);
            dealList.setDealFromNickName("NullAddress");
            dealList.setDealTo(0L);
            dealList.setDealToNickName("NullAddress");
            if(d.getDealFrom() != null && d.getDealFrom() != 0){
                User userFrom = userRepository.getById(d.getDealFrom());
                dealList.setDealFrom(userFrom.getUserId());
                dealList.setDealFromNickName(userFrom.getUserNick());
            }
            if( d.getDealTo() != null && d.getDealTo() != 0){
                User userTo = userRepository.getById(d.getDealTo());
                dealList.setDealTo(userTo.getUserId());
                dealList.setDealToNickName(userTo.getUserNick());
            }
            dealList.setDealPrice(d.getDealPrice());
            dealList.setDealType(d.getDealType());
            dealList.setDealCreatedAt(d.getDealCreatedAt());

            dealListGetRes.add(dealList);
        }

        Page<DealListGetRes> res = new PageImpl<>(dealListGetRes,pageable,total);

        return res;
    }

    @Override
    public Page<Deal> getDealMintedListByUserId(Long userId, Pageable pageable) {
        Page<Deal> dealList = dealRepositorySupport.findDealMintedListByUserId(userId,pageable);
        return dealList;
    }

    @Override
    public Page<Deal> getDealListByUserId(Long userId, Pageable pageable) {
        Page<Deal> dealList = dealRepositorySupport.findDealListByUserId(userId,pageable);
        return dealList;
    }
}
