package com.nft.ncity.domain.favorite.db.repository;

import com.nft.ncity.domain.favorite.db.entity.Favorite;
import com.nft.ncity.domain.favorite.db.entity.QFavorite;
import com.nft.ncity.domain.follow.db.entity.Follow;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.db.repository.ProductRepository;
import com.nft.ncity.domain.user.db.repository.UserRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FavoriteRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    FavoriteRepository favoriteRepository;

    @Autowired
    ProductRepository productRepository;


    QFavorite qFavorite = QFavorite.favorite;

    public Favorite favoriteRegister(Long userId, Long productId){

        Product product = productRepository.findById(productId).get();

        // 해당유저가 해당상품에 좋아요가 이미 있는지 확인
        Favorite isExist = jpaQueryFactory.select(qFavorite)
                    .from(qFavorite)
                    .where(qFavorite.userId.eq(userId)
                        .and(qFavorite.productId.eq(productId))).fetchFirst();

        System.out.println(isExist); //값이 없으면 null값을 반환 하는데 왜 조건문에 안들어갈까..?
        if(isExist == null){ // 좋아요 한적 없으면
            // builder를 이용해서 불변형 객체 생성
            Favorite favorite = Favorite.builder()
                    .userId(userId)
                    .productId(productId)
                    .build();

            System.out.println("Service Fav Register 2");

            favoriteRepository.save(favorite);
            return favorite;
        }else return isExist;

    }



    public Favorite favoriteRemove(Long userId, Long productId){

        Favorite favorite = jpaQueryFactory.select(qFavorite)
                .from(qFavorite)
                .where(qFavorite.userId.eq(userId)
                        .and(qFavorite.productId.eq(productId)))
                .fetchOne();

        favoriteRepository.delete(favorite);

        return favorite;
    }
}
