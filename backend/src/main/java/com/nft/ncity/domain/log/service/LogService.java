package com.nft.ncity.domain.log.service;

import com.nft.ncity.domain.log.db.entity.User;

public interface LogService {
    User getUserDetailByAddress(String userAddress);
    User getUserDetailById(long userId);
}
