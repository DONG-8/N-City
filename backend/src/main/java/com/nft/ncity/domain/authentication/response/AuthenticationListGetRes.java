package com.nft.ncity.domain.authentication.response;


import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.authentication.db.entity.Authentication;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@ApiModel("AuthenticationListGetRes")
public class AuthenticationListGetRes {

    @ApiModelProperty(value="인증 ID")
    // 인증 id
    Authentication authentication;

    // 유저 닉네임
    @ApiModelProperty(value="인증 타입")
    String userNick;
}
