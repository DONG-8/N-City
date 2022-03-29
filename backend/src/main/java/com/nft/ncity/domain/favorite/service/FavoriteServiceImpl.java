package com.nft.ncity.domain.favorite.service;

import com.nft.ncity.domain.favorite.db.entity.Favorite;
import com.nft.ncity.domain.favorite.db.repository.FavoriteRepositorySupport;
import com.nft.ncity.domain.user.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("favoriteService")
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    FavoriteRepositorySupport favoriteRepositorySupport;


    // Create
    @Override
    public Favorite favoriteRegister(Long userId, Long productId) {
        Favorite favorite = favoriteRepositorySupport.favoriteRegister(userId,productId);
        return favorite;
    }


    // Read
    @Override
    public boolean getFavoriteUserUse(Long userId, Long productId){
        return favoriteRepositorySupport.getFavoriteUserUse(userId,productId);
    }

    @Override
    public Long getFavoriteCount(Long productId) {

        return favoriteRepositorySupport.getFavoriteCount(productId);
    }


    // Delete
    @Override
    public Favorite favoriteRemove(Long userId, Long productId) {
        Favorite favorite = favoriteRepositorySupport.favoriteRemove(userId,productId);
        return favorite;
    }



}
