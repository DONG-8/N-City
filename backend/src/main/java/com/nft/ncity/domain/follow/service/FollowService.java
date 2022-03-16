package com.nft.ncity.domain.follow.service;

import com.nft.ncity.domain.follow.db.entity.Follow;

public interface FollowService {

    Follow FollowRegister(Long followeeId, Long userId);
    Follow FollowRemove(Long followeeId, Long userId);
}
