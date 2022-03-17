package com.nft.ncity.domain.follow.response;

import com.nft.ncity.domain.follow.db.entity.Follow;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.db.repository.UserRepository;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("EmailAuthConfirmReq")
public class FollowerListGetRes {

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

    // 프로필 설명란
    @ApiModelProperty(value = "회원 프로필 설명란")
    String userDescription;

    // 프로필 이미지 url
    @ApiModelProperty(value = "회원 프로필 이미지 url")
    String userImgUrl;

    public static List<FollowerListGetRes> of(List<Follow> followList) {

        List<FollowerListGetRes> temp = new ArrayList<>();

        for(int idx = 0; idx < followList.size(); idx++) {

            Follow follow = followList.get(idx);
            // 내가 팔로우 하는 사람.
            User user = follow.getFollowFollowee();

            FollowerListGetRes flg = new FollowerListGetRes();
            // 지갑 주소
            flg.setUserAddress(user.getUserAddress());
            flg.setUserRole(user.getUserRole());
            flg.setUserNick(user.getUserNick());

            if(null != user.getUserDescription())   flg.setUserDescription(user.getUserDescription());
            if(null != user.getUserEmail())   flg.setUserEmail(user.getUserEmail());
            if(null != user.getUserImgUrl())   flg.setUserImgUrl(user.getUserImgUrl());

            temp.add(flg);
        }
        return temp;
    }
}
