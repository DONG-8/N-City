package com.nft.ncity.domain.deal.service;

import com.nft.ncity.domain.deal.db.entity.Deal;
import com.nft.ncity.domain.deal.request.DealRegisterPostReq;

import java.security.Principal;

public interface DealService {

    //CREATE
    Long dealRegister(DealRegisterPostReq dealRegisterPostReq, Principal principal);
    //READ

    //UPDATE

    //DELETE
}
