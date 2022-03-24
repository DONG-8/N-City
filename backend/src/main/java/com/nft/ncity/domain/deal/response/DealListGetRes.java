package com.nft.ncity.domain.deal.response;


import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.response.AuthenticationListGetRes;
import com.nft.ncity.domain.deal.db.entity.Deal;
import com.nft.ncity.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.mapping.ToOne;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.*;
import java.util.List;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
@ApiModel("DealListGetRes")
public class DealListGetRes {


    //User전체 보내고 싶었는데.. 객체 자체를 set 어떻게 하는지 모르겠음...ㅜ

    @ApiModelProperty(value = "보내는 사람")
    String dealFromNickName;

    @ApiModelProperty(value = "보내는 사람id")
    Long dealFrom;

    @ApiModelProperty(value = "받는 사람")
    String dealToNickName;

    @ApiModelProperty(value = "받는 사람id")
    Long dealTo;

    @ApiModelProperty(value = "거래 종류")
    @Column(columnDefinition = "TINYINT")
    int dealType;

    @ApiModelProperty(value = "가격")
    double dealPrice;

    @ApiModelProperty(value = "거래시간")
    LocalDateTime dealCreatedAt;





    public static Page<DealListGetRes> of(Page<Deal> deal) {
        List<DealListGetRes> dealListGetResList = new ArrayList<>();

        Pageable pageable = deal.getPageable();
        long total = deal.getTotalElements();

        for(Deal a : deal.getContent()) {
            DealListGetRes dealList = new DealListGetRes();

            dealList.setDealFrom(dealList.getDealFrom());
            dealList.setDealTo(dealList.getDealTo());
            dealList.setDealPrice(dealList.getDealPrice());
            dealList.setDealType(dealList.getDealType());
            dealList.setDealCreatedAt(dealList.getDealCreatedAt());

            dealListGetResList.add(dealList);
        }

        Page<DealListGetRes> res = new PageImpl<>(dealListGetResList, pageable, total);
        return res;
    }
}
