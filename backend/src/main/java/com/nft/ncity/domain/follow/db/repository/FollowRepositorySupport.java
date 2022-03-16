package com.nft.ncity.domain.follow.db.repository;

import com.nft.ncity.domain.follow.db.entity.Follow;
import com.nft.ncity.domain.follow.db.entity.QFollow;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FollowRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    FollowRepository followRepository;

    QFollow qFollow = QFollow.follow;

    public Follow FollowRegister(Long followeeId, Long followerId) {
        Follow follow = Follow.builder()
                .followFollowee(followeeId)
                .followFollower(followerId)
                .build();

        followRepository.save(follow);
        return follow;
    }
}
