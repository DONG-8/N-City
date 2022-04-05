package com.nft.ncity.domain.follow.service;

import com.nft.ncity.domain.follow.db.entity.Follow;
import com.nft.ncity.domain.follow.db.repository.FollowRepositorySupport;
import com.nft.ncity.domain.follow.response.FollowerListGetRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("FollowService")
public class FollowServiceImpl implements FollowService{

    @Autowired
    FollowRepositorySupport followRepositorySupport;

    @Override
    public Follow FollowRegister(Long followeeId, Long userId) {
        Follow follow = followRepositorySupport.FollowRegister(followeeId,userId);
        return follow;
    }

    @Override
    public Follow FollowRemove(Long followeeId, Long userId) {
        Follow follow = followRepositorySupport.FollowRemove(followeeId,userId);
        return follow;
    }

    @Override
    public List<Follow> FollowerList(Long userId) {
        List<Follow> list = followRepositorySupport.FollowerList(userId);
        return list;
    }

    @Override
    public List<Follow> FolloweeList(Long userId) {
        List<Follow> list = followRepositorySupport.FolloweeList(userId);
        return list;
    }

    @Override
    public List<FollowerListGetRes> getFollowerList(List<Follow> follow) {
        List<FollowerListGetRes> list = null;

        return list;
    }
}
