package com.nft.ncity.domain.deal.service;

import com.nft.ncity.domain.deal.db.repository.DealRepository;
import com.nft.ncity.domain.deal.db.repository.DealRepositorySupport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service("DealService")
public class DealServiceImpl implements DealService{

    @Autowired
    DealRepository dealRepository;

    @Autowired
    DealRepositorySupport dealRepositorySupport;



}
