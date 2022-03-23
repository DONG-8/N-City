package com.nft.ncity.domain.deal.controller;

import com.nft.ncity.domain.deal.service.DealService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Api(value = "거래 관리 API")
@RestController
@RequestMapping("/api/deals")
public class DealController {

    @Autowired
    DealService dealService;


    // CREATE

    // READ

    // UPDATE

    // DELETE
}
