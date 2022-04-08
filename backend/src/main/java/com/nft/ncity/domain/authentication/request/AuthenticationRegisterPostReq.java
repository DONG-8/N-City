package com.nft.ncity.domain.authentication.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@ApiModel("AuthenticationRegisterPostReq")
public class AuthenticationRegisterPostReq {

    // 이름
    @ApiModelProperty(value="이름")
    String authName;

    // 이메일
    @ApiModelProperty(value="이메일")
    String authEmail;

    // 인플루언서는 SNS 주소 or 디자이너는 포트폴리오
    @ApiModelProperty(value="SNS주소 or 포트폴리오 주소")
    String authExtra;

//    신청일
//    @CreatedDate
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
//    @ApiModelProperty(value="신청일")
//    LocalDateTime authRegAt;

    // 인증 타입
    @ApiModelProperty(value="인증 타입", required = true)
    int authType;

}
