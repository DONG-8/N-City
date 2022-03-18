package com.nft.ncity.domain.favorite.db.entity;

import com.nft.ncity.domain.product.db.entity.Product;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@ApiModel(value ="Favorite", description = "좋아요 정보")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Favorite {

    @Id
    @ApiModelProperty(value ="회원 id")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    기본키 생성을 AI 로 하게 만든다는건데 .. 참조만 하는데 필요없는거 아님?
    Long userId;

    @ApiModelProperty(value = "상품 id")
    Long productId;


    // favorite 입장에서(Many) product가 (one)
//    @ManyToOne
//    @JoinColumn(name = "product_id")
//    Product product;

}
