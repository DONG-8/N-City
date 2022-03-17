package com.nft.ncity.domain.authentication.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@ToString
@ApiModel("AuthenticationRegisterPostReq")
public class AuthenticationRegisterPostReq {

    // 이름
    @ApiModelProperty(value="이름")
    String authName;

    // 이메일
    @ApiModelProperty(value="이메일")
    String authEmail;

    // 신청일
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @ApiModelProperty(value="신청일")
    LocalDateTime authRegAt;

    // 인증 타입
    @ApiModelProperty(value="인증 타입", required = true)
    int authType;

    @ApiModelProperty(value="인증파일 url")
    private String authUrl;


}
