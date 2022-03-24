package com.nft.ncity.domain.deal.service;

import com.nft.ncity.domain.deal.db.entity.Deal;
import com.nft.ncity.domain.deal.request.AuctionRegisterPostReq;
import com.nft.ncity.domain.deal.request.BuyNowRegisterPostReq;

import java.security.Principal;

public interface DealService {

    //CREATE
    Long buyNowRegister(BuyNowRegisterPostReq buyNowRegisterPostReq, Principal principal);
    Long auctionRegister(AuctionRegisterPostReq auctionRegisterPostReq, Principal principal);
    Deal bidRegister(BuyNowRegisterPostReq buyNowRegisterPostReq,Principal principal);
    //READ

    //UPDATE

    //DELETE
}
