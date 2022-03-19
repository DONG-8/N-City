package com.nft.ncity.domain.favorite.db.repository;

import com.nft.ncity.domain.favorite.db.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepository extends JpaRepository<Favorite,Long> {
    Long countByProductId(Long productId);
}
