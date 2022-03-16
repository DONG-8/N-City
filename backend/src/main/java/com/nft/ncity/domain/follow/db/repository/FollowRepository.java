package com.nft.ncity.domain.follow.db.repository;

import com.nft.ncity.domain.follow.db.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {
}
