package com.nft.ncity.domain.follow.service;

import com.nft.ncity.domain.follow.db.entity.Follow;

public interface FollowService {

    public Follow FollowRegister(Long followeeId, Long followerId);
}
