package com.nft.ncity.domain.user.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nft.ncity.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Getter
@Builder
@ApiModel("UserInfoRes")
public class UserInfoRes {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 회원 id
    Long userId;

    // 인증 id
    @ApiModelProperty(value = "회원 인증 id")
    Long authId;

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
    String userNick;

    // 이메일
    @ApiModelProperty(value = "회원 이메일")
    String userEmail;

    // 이메일 인증여부
    @ApiModelProperty(value = "회원 이메일 인증여부")
    Boolean userEmailConfirm;

    // 프로필 설명란
    @ApiModelProperty(value = "회원 프로필 설명란")
    String userDescription;

    // 프로필 이미지 url
    @ApiModelProperty(value = "회원 프로필 이미지 url")
    String userImgUrl;

    // 팔로워수
    @ApiModelProperty(value="나를 팔로우하는 사람 수")
    Long followerCnt;

    // 팔로잉수
    @ApiModelProperty(value="내가 팔로우 하는 사람 수")
    Long followeeCnt;

}
