package com.nft.ncity.domain.favorite.db.entity;

import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@ApiModel(value ="Favorite", description = "좋아요 정보")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@ToString
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long favoriteId;

    @ApiModelProperty(value = "상품 id")
    Long userId;

    @ApiModelProperty(value ="회원 id")
    Long productId;


    // favorite 입장에서(Many) product가 (one)
//    @ManyToOne
//    @JoinColumn(name = "product_id")
//    @ApiModelProperty(value = "상품 id")
//    Product productId;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    @ApiModelProperty(value ="회원 id")
//    User userId;
}
