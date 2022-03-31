package com.nft.ncity.domain.follow.db.entity;

import com.nft.ncity.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@ApiModel(value = "Follow", description = "팔로우 정보")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Follow {

    @ApiModelProperty(value = "팔로우 Id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 회원 id
    Long followId;

    @ManyToOne
    @JoinColumn(name = "follow_follower")
    @ApiModelProperty(value = "팔로우 요청하는 사람 id")
    User followFollower;

    @ManyToOne
    @JoinColumn(name = "follow_followee")
    @ApiModelProperty(value = "팔로우 요청받는 사람 id")
    User followFollowee;

//    @Id
//    @ManyToOne
//    @JoinColumns({
//            @JoinColumn(name = "userId"),
//            @JoinColumn(name = "userId")
//    })
//    private Follow follow;
}
