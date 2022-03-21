package com.nft.ncity.domain.follow.db.repository;

import com.nft.ncity.domain.follow.db.entity.Follow;
import com.nft.ncity.domain.follow.db.entity.QFollow;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.db.repository.UserRepository;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.BooleanOperation;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FollowRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    FollowRepository followRepository;

    @Autowired
    UserRepository userRepository;

    QFollow qFollow = QFollow.follow;

    public Follow FollowRegister(Long followeeId, Long followerId) {
        User followee = userRepository.findUserByUserId(followeeId).get();
        User follower = userRepository.findUserByUserId(followerId).get();

        // 해당 팔로우가 이미 있는지 확인.
        Follow isExist = jpaQueryFactory.select(qFollow)
                .from(qFollow)
                .where(qFollow.followFollower.eq(follower)
                        .and(qFollow.followFollowee.eq(followee))).fetchFirst();

        if(null == isExist) {
            Follow follow = Follow.builder()
                    .followFollowee(followee)
                    .followFollower(follower)
                    .build();

            followRepository.save(follow);
            return follow;
        }

        return isExist;
    }

    public Follow FollowRemove(Long followeeId, Long followerId) {

        Follow follow = jpaQueryFactory.select(qFollow)
                .from(qFollow)
                .where(qFollow.followFollowee.userId.eq(followeeId)
                        .and(qFollow.followFollower.userId.eq(followerId)))
                .fetchOne();

        followRepository.delete(follow);

        return follow;

    }

    public List<Follow> FollowerList(Long userId) {

        List<Follow> list = jpaQueryFactory.select(qFollow)
                .from(qFollow)
                .where(qFollow.followFollowee.userId.eq(userId))
                .fetch();

        return list;
    }

    public List<Follow> FolloweeList(Long userId) {

        List<Follow> list = jpaQueryFactory.select(qFollow)
                .from(qFollow)
                .where(qFollow.followFollower.userId.eq(userId))
                .fetch();

        return list;
    }

    /**
     * 나를 팔로우 하는사람 수
     * @param userId
     * @return
     */
    public Long getFollowerCount(Long userId) {

        JPAQuery<Long> followerCnt = jpaQueryFactory.select(qFollow.count())
                        .from(qFollow)
                        .where(qFollow.followFollowee.userId.eq(userId));

        return followerCnt.fetchFirst();
    }

    /**
     * 내가 팔로우 하는사람 수
     * @param userId
     * @return
     */
    public Long getFolloweeCount(Long userId) {
        JPAQuery<Long> followeeCnt = jpaQueryFactory.select(qFollow.count())
                .from(qFollow)
                .where(qFollow.followFollower.userId.eq(userId));

        return followeeCnt.fetchFirst();
    }
}
