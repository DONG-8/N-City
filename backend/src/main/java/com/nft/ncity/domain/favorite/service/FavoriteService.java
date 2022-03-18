package com.nft.ncity.domain.favorite.service;


import com.nft.ncity.domain.favorite.db.entity.Favorite;
import com.nft.ncity.domain.product.db.entity.Product;

import java.util.List;

public interface FavoriteService {


    Favorite favoriteRegister(Long userId, Long productId);
    Favorite favoriteRemove(Long userId, Long productId);

    int getFavoriteCount(Long productId);
    List<Product> favoriteList(Long userId);



}
