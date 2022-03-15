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
    @Builder.Default
    // 회원 id
    Long userId = null;

    // 인증 id
    @ApiModelProperty(value = "회원 인증 id")
    @Builder.Default
    Long authId = null;

    @ApiModelProperty(value = "회원 지갑 주소", required = true)
    // 유저 지갑 주소
    String userAddress;

    /* 회원 코드
        - ROLE_ADMIN : 사이트 관리자
        - ROLE_USER : 일반 회원
        - ROLE_ENTERPRISE : 기업
        - ROLE_ARTIST : 아티스트
        - ROLE_INFLUENCER : 인플루언서
     */
    @ApiModelProperty(value = "회원 구분 코드 (" +
                                                "ROLE_ADMIN : 사이트 관리자, " +
                                                "ROLE_USER : 일반회원 (default), " +
                                                "ROLE_ENTERPRISE : 기업, " +
                                                "ROLE_ARTIST : 아티스트, " +
                                                "ROLE_INFLUENCER : 인플루언서)")
    String userRole;

    // 닉네임
    @ApiModelProperty(value="회원 닉네임")
    @Column(name = "user_nick")
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
