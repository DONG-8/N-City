package com.nft.ncity.domain.deal.service;

import com.nft.ncity.domain.deal.db.entity.Deal;
import com.nft.ncity.domain.deal.db.repository.DealRepository;
import com.nft.ncity.domain.deal.db.repository.DealRepositorySupport;
import com.nft.ncity.domain.deal.request.DealRegisterPostReq;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.db.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;

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

    // 내부 로직은 민팅때 생성된 deal Table 'UPDATE'
    @Override
    @Transactional
    public Long dealRegister(DealRegisterPostReq dealRegisterPostReq, Principal principal){

        // 0. product 테이블에 productId에 해당하는 row있는지 검사 && 판매가능한 상품인지 검사
        // 1. deal 테이블에 productId 맞게 update
        // 2. product 테이블에서 productId에 해당하는 row 업데이트
            // 2.1 product type - 1.list, 2.auction
            // 2.2 product price - 가격 수정  단, auction의 경우 bid 가격 계속 업데이트!

        // 0
        Product product =  productRepository.getById(dealRegisterPostReq.getProductId());
        if(productRepository.findById(dealRegisterPostReq.getProductId()).isPresent() &&
        product.getProductState() == 3 ){

            // 1
           Long res = dealRepositorySupport.updateDealByProductId(dealRegisterPostReq);

            // 2. product 테이블 update
            dealRepositorySupport.updateProductByProductId(dealRegisterPostReq);


            return res;
        }else{
            return  null;
        }

    }

    //READ

    //UPDATE

    //DELETE


}