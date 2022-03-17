package com.nft.ncity.domain.favorite.db.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class Favorite {

    @Id
    @ApiModelProperty(value ="회원 id")
    private Long userId;

    @Id
    @ApiModelProperty(value = "상품 id")
    private Long product_id;


}
