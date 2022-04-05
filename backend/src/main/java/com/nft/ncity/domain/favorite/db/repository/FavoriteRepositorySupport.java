package com.nft.ncity.domain.favorite.db.repository;

import com.nft.ncity.domain.favorite.db.entity.Favorite;
import com.nft.ncity.domain.favorite.db.entity.QFavorite;
import com.nft.ncity.domain.follow.db.entity.Follow;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.db.repository.ProductRepository;
import com.nft.ncity.domain.product.response.ProductTop10GetRes;
import com.nft.ncity.domain.user.db.entity.QUser;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.db.repository.UserRepository;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FavoriteRepositorySupport {

    @Autowired
    JPAQueryFactory jpaQueryFactory;

    @Autowired
    FavoriteRepository favoriteRepository;

    QFavorite qFavorite = QFavorite.favorite;

    QUser qUser = QUser.user;

    public Favorite favoriteRegister(Long userId, Long productId){

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

            System.out.println(favorite);

            favoriteRepository.save(favorite);
            return favorite;
        }else return isExist;

    }

    public boolean getFavoriteUserUse(Long userId, Long productId){
        Integer fetchOne = jpaQueryFactory.selectOne()
                        .from(qFavorite)
                        .where(qFavorite.userId.eq(userId)
                                .and(qFavorite.productId.eq(productId))).fetchOne();
        if( fetchOne != null) return true;
        return false;
    }

    public Long getFavoriteCount(Long productId){
        return favoriteRepository.countByProductId(productId);
    }



    public List<User> getFavoriteUser(Long productId) {
        List<User> favoriteUser = jpaQueryFactory.select(qUser)
                .from(qUser)
                .where(qUser.userId.in(
                        JPAExpressions.select(qFavorite.userId)
                                .from(qFavorite)
                                .where(qFavorite.productId.eq(productId)))).fetch();
        return favoriteUser;
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

    public Page<Favorite> getFavoriteListByUserId(Long userId, Pageable pageable) {

        List<Favorite> favorites = jpaQueryFactory.select(qFavorite)
                .from(qFavorite)
                .where(qFavorite.userId.eq(userId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        if(favorites.isEmpty()) return Page.empty();

        return new PageImpl<Favorite>(favorites, pageable, favorites.size());
    }

    public boolean getIsFavoriteByUserIdAndProductId(Long userId, Long productId) {

        Long isFavorite = jpaQueryFactory.select(qFavorite.count())
                .from(qFavorite)
                .where(qFavorite.userId.eq(userId).and(qFavorite.productId.eq(productId)))
                .fetchOne();

        // 존재하면 좋아요 중이다. 즉 true 값 반환
        if (isFavorite > 0) return true;
        return  false;
    }
}
