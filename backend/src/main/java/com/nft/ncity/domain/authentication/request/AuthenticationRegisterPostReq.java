package com.nft.ncity.domain.authentication.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
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

}
