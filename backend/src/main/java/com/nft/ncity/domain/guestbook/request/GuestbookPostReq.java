package com.nft.ncity.domain.guestbook.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "GuestbookPostReq", description = "방명록 작성 시 필요한 정보")
public class GuestbookPostReq {

    @ApiModelProperty(value = "방명록 주인 id")
    private Long guestbookOwnerId;

    @ApiModelProperty(value = "방명록 작성자 id")
    private Long guestbookWriterId;

    @ApiModelProperty(value = "방명록 내용")
    private String guestbookContents;
}
