package com.nft.ncity.domain.follow.service;

import com.nft.ncity.domain.follow.db.entity.Follow;
import com.nft.ncity.domain.follow.db.repository.FollowRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("FollowService")
public class FollowServiceImpl implements FollowService{

    @Autowired
    FollowRepositorySupport followRepositorySupport;

    @Override
    public Follow FollowRegister(Long followeeId, Long followerId) {
        Follow follow = followRepositorySupport.FollowRegister(followeeId,followerId);
        return follow;
    }
}
