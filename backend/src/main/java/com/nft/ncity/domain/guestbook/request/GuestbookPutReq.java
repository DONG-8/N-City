package com.nft.ncity.domain.guestbook.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "GuestbookPutReq", description = "방명록 수정 시 필요한 정보")
public class GuestbookPutReq {

    @ApiModelProperty(value = "방명록 구분 id")
    private Long guestbookId;

    @ApiModelProperty(value = "방명록 내용")
    private String guestbookContents;
}
