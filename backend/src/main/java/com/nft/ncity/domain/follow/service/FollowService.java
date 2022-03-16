package com.nft.ncity.domain.follow.service;

import com.nft.ncity.domain.follow.db.entity.Follow;
import com.nft.ncity.domain.follow.response.FollowerListGetRes;

import java.util.List;

public interface FollowService {

    Follow FollowRegister(Long followeeId, Long userId);
    Follow FollowRemove(Long followeeId, Long userId);

    List<Follow> FollowerList(Long userId);
    List<Follow> FolloweeList(Long userId);

    List<FollowerListGetRes> getFollowerList(List<Follow> follow);
}

