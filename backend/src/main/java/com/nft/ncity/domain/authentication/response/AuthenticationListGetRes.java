package com.nft.ncity.domain.authentication.response;


import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.authentication.db.entity.Authentication;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@Setter
@ApiModel("AuthenticationListGetRes")
public class AuthenticationListGetRes {

    @ApiModelProperty(value="인증 ID")
    // 인증 id
    Long authId;

    // 이름
    @ApiModelProperty(value="이름")
    String authName;

    // 이메일
    @ApiModelProperty(value="이메일")
    String authEmail;

    // 신청일
    @ApiModelProperty(value="신청일")
    LocalDateTime authRegAt;

    // 인증 타입
    @ApiModelProperty(value="인증 타입")
    int authType;

    public static Page<AuthenticationListGetRes> of(Page<Authentication> authentication) {
        List<AuthenticationListGetRes> authenticationListGetRes = new ArrayList<>();

        Pageable pageable = authentication.getPageable();
        long total = authentication.getTotalElements();

        for(Authentication a : authentication.getContent()) {
            AuthenticationListGetRes authList = new AuthenticationListGetRes();

            authList.setAuthId(a.getAuthId());
            authList.setAuthName(a.getAuthName());
            authList.setAuthEmail(a.getAuthEmail());
            authList.setAuthType(a.getAuthType());
            authList.setAuthRegAt(a.getAuthRegAt());

            authenticationListGetRes.add(authList);
        }

        Page<AuthenticationListGetRes> res = new PageImpl<>(authenticationListGetRes, pageable, total);
        return res;
    }
}
