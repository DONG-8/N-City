package com.nft.ncity.domain.user.db.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.nft.ncity.domain.authentication.db.entity.Authentication;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@ApiModel(value = "User", description = "회원 정보")
//@MappedSuperclass
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "user")
@Builder
public class User {

    @ApiModelProperty(value = "회원 id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 회원 id
    Long userId = null;

    // 인증 id
    @ApiModelProperty(value = "회원 인증 id")
    Long authId = null;

    @ApiModelProperty(value = "회원 지갑 주소", required = true)
    // 유저 지갑 주소
    String userAddress;

    /* 회원 코드
        1 : 사이트 관리자
        2 : 일반회원 (default)
        3 : 기업
        4 : 아티스트
        5 : 인플루언서
     */
    @ApiModelProperty(value = "회원 구분 코드 (1 : 사이트 관리자, 2 : 일반회원 (default), 3 : 기업, 4 : 아티스트, 5 : 인플루언서)")
    int userCode;

    // 닉네임
    @ApiModelProperty(value="회원 닉네임")
    String userNick;

    // 이메일
    @ApiModelProperty(value = "회원 이메일")
    String userEmail;

    // 프로필 설명란
    @ApiModelProperty(value = "회원 프로필 설명란")
    String userDescription;

    // 프로필 이미지 url
    @ApiModelProperty(value = "회원 프로필 이미지 url")
    String userImgUrl;

}
