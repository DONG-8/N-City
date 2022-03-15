package com.nft.ncity.domain.follow.db.entity;

import com.nft.ncity.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Entity
@ApiModel(value = "Follow", description = "팔로우 정보")
//@MappedSuperclass
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@IdClass(Follow.FollowKey.class)
public class Follow {

    @Id
    @ApiModelProperty(value = "팔로우 요청하는 사람 id")
    private Long followFollower;

    @Id
    @ApiModelProperty(value = "팔로우 요청받는 사람 id")
    private Long followFollowee;

    @EqualsAndHashCode
    @Embeddable
    static class FollowKey implements Serializable {
        @Column(name = "follow_follower")
        private Long followFollower;
        @Column(name = "follow_followee")
        private Long followFollowee;
    }

//    @Id
//    @ManyToOne
//    @JoinColumns({
//            @JoinColumn(name = "userId"),
//            @JoinColumn(name = "userId")
//    })
//    private Follow follow;



}
