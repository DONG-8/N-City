package com.nft.ncity.domain.favorite.service;


import com.nft.ncity.domain.favorite.db.entity.Favorite;
import com.nft.ncity.domain.product.db.entity.Product;

import java.util.List;

public interface FavoriteService {

    //Create
    Favorite favoriteRegister(Long userId, Long productId);

    //Read
    boolean getFavoriteUserUse(Long userId, Long productId);
    Long getFavoriteCount(Long productId);

    //Delete
    Favorite favoriteRemove(Long userId, Long productId);


    //user쪽에서 구현됨
//    List<Product> getFavoriteList(Long userId);



}
