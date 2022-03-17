package com.nft.ncity.domain.product.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "ProductModifyPutReq",description = "상품정보 수정시  필요한 정보 ")
public class ProductModifyPutReq {


    // 초기화가 안된 attribute들은 update가 안되는거 맞나??
    // title , desc , code , x, y, view, state
    @ApiModelProperty(value = "상품 id")
    Long productId;

    @ApiModelProperty(value = "제목")
    String productTitle;

    @ApiModelProperty(value = "설명")
    String productDesc;

    @ApiModelProperty(value = "카테고리_그림001...")
    int productCode;

    @ApiModelProperty(value = "상품 X좌표 in Myroom")
    int productXCoordinate;

    @ApiModelProperty(value = "상품 Y좌표 in Myroom")
    int productYCoordinate;

    @ApiModelProperty(value = "상품 표시여부")
    boolean productView;

    @ApiModelProperty(value = "상품 상태_판매중001...")
    int productState;
}
