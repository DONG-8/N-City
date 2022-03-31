package com.nft.ncity.domain.deal.service;

import com.nft.ncity.domain.deal.db.entity.Deal;
import com.nft.ncity.domain.deal.request.AuctionRegisterPostReq;
import com.nft.ncity.domain.deal.request.BuyNowRegisterPostReq;
import com.nft.ncity.domain.deal.response.DealListGetRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.security.Principal;

public interface DealService {
    //CREATE
    Long buyNowRegister(BuyNowRegisterPostReq buyNowRegisterPostReq, Long userId);
    Long auctionRegister(AuctionRegisterPostReq auctionRegisterPostReq, Long userId);
    Deal bidRegister(BuyNowRegisterPostReq buyNowRegisterPostReq,Long userId);
    Deal buyNow(Long productId,Long userId);
    Deal buyAuction(Long productId,Long userId);

    //READ
    Page<DealListGetRes> getDealListByProductId(Pageable pageable,Long productId);
    Page<Deal> getDealMintedListByUserId(Long userId, Pageable pageable);
    Page<Deal> getDealListByUserId(Long userId, Pageable pageable);
}
