package com.nft.ncity.domain.product.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@ApiModel("ProductRegsterPostReq")
public class ProductRegisterPostReq {

    @ApiModelProperty(value="상품명")
    private String productTitle;

    @ApiModelProperty(value="상품설명")
    private String productDesc;

    @ApiModelProperty(value="카테고리")
    private int code;

}
