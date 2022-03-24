package com.nft.ncity.domain.deal.service;

import com.nft.ncity.domain.deal.db.entity.Deal;
import com.nft.ncity.domain.deal.db.repository.DealRepository;
import com.nft.ncity.domain.deal.db.repository.DealRepositorySupport;
import com.nft.ncity.domain.deal.request.AuctionRegisterPostReq;
import com.nft.ncity.domain.deal.request.BuyNowRegisterPostReq;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.db.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.time.LocalDateTime;

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

    //CREATE

    @Override
    @Transactional
    public Long buyNowRegister(BuyNowRegisterPostReq buyNowRegisterPostReq, Principal principal){

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
                   .dealFrom(Long.valueOf(principal.getName()))
                   .tokenId(product.getTokenId())
                   .dealCreatedAt(LocalDateTime.now())
                           .build();
           Deal savedDeal = dealRepository.save(deal);

            // 2. product 테이블 updates
            return dealRepositorySupport.updateProductForBuyNowByProductId(buyNowRegisterPostReq);
        }else{
            return  null;
        }
    }

    @Override
    @Transactional
    public Long auctionRegister(AuctionRegisterPostReq auctionRegisterPostReq, Principal principal){

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
                    .dealFrom(Long.valueOf(principal.getName()))
                    .tokenId(product.getTokenId())
                    .dealCreatedAt(LocalDateTime.now())
                    .build();
            Deal savedDeal = dealRepository.save(deal);

            // 2. product 테이블 updates
            return dealRepositorySupport.updateProductForAuctionByProductId(auctionRegisterPostReq);
        }else{
            return  null;
        }
    }

    //READ

    //UPDATE

    //DELETE


}
