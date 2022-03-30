package com.nft.ncity.domain.deal.db.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@ApiModel(value = "Deal", description = "거래 정보")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@ToString
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long dealId;

    @ApiModelProperty(value = "상품 id")
    Long productId;

    @ApiModelProperty(value = "보내는 사람 id")
    Long dealFrom;

    @ApiModelProperty(value = "token Id")
    Long tokenId;

    @ApiModelProperty(value = "받는 사람 id")
    Long dealTo;

/*     거래 타입
     1 : sale
     2 : bid
     3 : list
     4 : offer
     5 : transfer
     6 : minted
 */
    @Column(name = "deal_type", columnDefinition = "TINYINT")
    @ApiModelProperty(value = "거래 타입")
    int dealType;

    @ApiModelProperty(value = "금액")
    double dealPrice;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @ApiModelProperty(value="거래 요청시간")
    LocalDateTime dealCreatedAt;
}
