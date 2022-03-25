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
    Long buyNowRegister(BuyNowRegisterPostReq buyNowRegisterPostReq, Principal principal);
    Long auctionRegister(AuctionRegisterPostReq auctionRegisterPostReq, Principal principal);
    Deal bidRegister(BuyNowRegisterPostReq buyNowRegisterPostReq,Principal principal);
    Deal buyNow(Long productId,Principal principal);



    //READ

    Page<DealListGetRes> getDealListByProductId(Pageable pageable,Long productId);

    //UPDATE

    //DELETE
}
