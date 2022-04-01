package com.nft.ncity.domain.user.service;

import com.nft.ncity.domain.authentication.service.AwsS3Service;
import com.nft.ncity.domain.deal.db.entity.Deal;
import com.nft.ncity.domain.deal.service.DealService;
import com.nft.ncity.domain.favorite.db.repository.FavoriteRepository;
import com.nft.ncity.domain.favorite.db.repository.FavoriteRepositorySupport;
import com.nft.ncity.domain.follow.db.repository.FollowRepository;
import com.nft.ncity.domain.follow.db.repository.FollowRepositorySupport;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.db.repository.ProductRepositorySupport;
import com.nft.ncity.domain.user.db.entity.EmailAuth;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.db.repository.EmailAuthRepositorySupport;
import com.nft.ncity.domain.user.db.repository.UserRepository;
import com.nft.ncity.domain.user.db.repository.UserRepositorySupport;
import com.nft.ncity.domain.user.request.UserModifyUpdateReq;
import com.nft.ncity.domain.user.response.UserAllRes;
import com.nft.ncity.domain.user.response.UserDealInfoWithProductRes;
import com.nft.ncity.domain.user.response.UserInfoRes;
import com.nft.ncity.domain.user.response.UserProductWithIsFavoriteRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    AwsS3Service awsS3Service;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    EmailAuthRepositorySupport emailAuthRepositorySupport;

    @Autowired
    FollowRepositorySupport followRepositorySupport;

    @Autowired
    EmailService emailService;

    @Autowired
    DealService dealService;

    @Autowired
    ProductRepositorySupport productRepositorySupport;

    @Autowired
    FavoriteRepositorySupport favoriteRepositorySupport;

    @Override
    public User getUserByEmail(String userEmail) {
        // 디비에 유저 정보 조회 (userEmail 를 통한 조회).
        User user = userRepositorySupport.findByEmail(userEmail).orElse(null);
        System.out.println(user); // 추가
        return user;
    }

    /**
     * 프로필 이미지 변경 포함
     * @param userInfo
     * @return Long (수정 성공한 행 개수)
     */
    @Override
    public Long userUpdateWithProfileImg(UserModifyUpdateReq userInfo) throws IOException {
        Long execute = userRepositorySupport.userUpdateWithProfileImg(userInfo);

        return execute;
    }

    /**
     * 프로필 이미지 포함하지 않음.
     * @param userInfo
     * @return Long (수정 성공한 행 개수)
     */
    @Override
    public Long userUpdateNoProfileImg(UserModifyUpdateReq userInfo) {
        Long execute = userRepositorySupport.userUpdateNoProfileImg(userInfo);
        return execute;
    }

    @Override
    public EmailAuth EmailAuthRegister(String emailAuthEmail) {
        EmailAuth emailAuth = emailAuthRepositorySupport.emailAuthRegister(emailAuthEmail);

        // 해당 이메일로 인증메일 전송
        emailService.send(emailAuth.getEmailAuthEmail(),emailAuth.getEmailAuthToken());
        return emailAuth;
    }

    @Override
    @Transactional
    public void confirmEmail(String emailAuthEmail, String authToken) {
        // emailAuth 테이블 갱신
        EmailAuth emailAuth = emailAuthRepositorySupport.findValidAuthByEmail(emailAuthEmail,authToken, LocalDateTime.now()).get();
        emailAuth.useToken();

        User user = userRepository.findByUserEmail(emailAuthEmail).get();
        user.emailVerifiedSuccess();
    }

    @Override
    public UserInfoRes getUserInfo(User user) {

        // userId를 팔로우 하는사람 수
        Long followerCnt = followRepositorySupport.getFollowerCount(user.getUserId());

        // userId가 팔로우 하는사람 수
        Long followeeCnt = followRepositorySupport.getFolloweeCount(user.getUserId());

        UserInfoRes userInfoRes = UserInfoRes.builder()
                .userId(user.getUserId())
                .authId(user.getAuthId())
                .followerCnt(followerCnt)
                .followeeCnt(followeeCnt)
                .userAddress(user.getUserAddress())
                .userDescription(user.getUserDescription())
                .userImgUrl(user.getUserImgUrl())
                .userEmail(user.getUserEmail())
                .userEmailConfirm(user.getUserEmailConfirm())
                .userNick(user.getUserNick())
                .userRole(user.getUserRole())
                .build();

        return userInfoRes;
    }

    @Override
    public List<User> searchUser(String userNick) {
        return userRepository.findTop15ByUserNickContaining(userNick);
    }

    @Override
    public Page<User> getUserList(Pageable pageable) {
        return userRepositorySupport.findUserList(pageable);
    }

    @Override
    public Page<User> getNewUserList(Pageable pageable) {
        return userRepositorySupport.findNewUserList(pageable);
    }

    @Override
    public Long modifyUserRole(Long userId) {
        Long execute = userRepositorySupport.updateUserRole(userId);
        return execute;
    }

    @Override
    public Page<UserDealInfoWithProductRes> getUserDealInfoWithProduct(Long userId, Pageable pageable) {

        // deal 정보 받아오고 여기에 + deal정보에 해당하는 유저들 닉네임, tokenId에 해당하는 상품 정보들 받아오기.
        Page<Deal> deals = dealService.getDealListByUserId(userId, pageable);
        List<UserDealInfoWithProductRes> list = new ArrayList<>();

        for(Deal d : deals.getContent()) {

            Product product = productRepositorySupport.findProductByProductId(d.getProductId());

            String fromUserNick = "NullAddress";
            String toUserNick = "NullAddress";
            if(d.getDealFrom() != null && d.getDealFrom() != 0) fromUserNick = userRepositorySupport.findUserByUserId(d.getDealFrom()).getUserNick();
            if(d.getDealTo() != null && d.getDealTo() != 0) toUserNick = userRepositorySupport.findUserByUserId(d.getDealTo()).getUserNick();

            UserDealInfoWithProductRes userDealInfoWithProductRes = UserDealInfoWithProductRes.builder()
                    .dealFrom(d.getDealFrom())
                    .dealTo(d.getDealTo())
                    .dealCreatedAt(d.getDealCreatedAt())
                    .dealType(d.getDealType())
                    .dealPrice(d.getDealPrice())
                    // 상품 아이디
                    .productId(d.getProductId())
                    // 상품 썸네일
                    .productThumbnailUrl(product.getProductThumbnailUrl())
                    // 상품 제목
                    .productTitle(product.getProductTitle())
                    // from 유저 닉네임
                    .dealFromUserNick(fromUserNick)
                    // to 유저 닉네임
                    .dealToUserNick(toUserNick)
                    .dealId(d.getDealId())
                    .productFavoriteCount(favoriteRepositorySupport.getFavoriteCount(d.getProductId()))
                    .productAuctionEndTime(product.getProductAuctionEndTime())
                    .build();

            list.add(userDealInfoWithProductRes);
        }
        if(list.isEmpty()) return Page.empty();

        return new PageImpl<UserDealInfoWithProductRes>(list, pageable, list.size());
    }

    @Override
    public Page<UserProductWithIsFavoriteRes> getUserProductWithIsFavorite(Page<Product> products,Long userId) {

        List<UserProductWithIsFavoriteRes> list = new ArrayList<>();

        for(Product p : products.getContent()) {
            UserProductWithIsFavoriteRes userProductWithIsFavoriteRes = UserProductWithIsFavoriteRes.builder()

                    .productId(p.getProductId())
                    .userId(p.getUserId())
                    .tokenId(p.getTokenId())
                    .productTitle(p.getProductTitle())
                    .productDesc(p.getProductDesc())
                    .productCode(p.getProductCode())
                    .productState(p.getProductState())
                    .productPrice(p.getProductPrice())
                    .productRegDt(p.getProductRegDt())
                    .productFileUrl(p.getProductFileUrl())
                    .productThumbnailUrl(p.getProductThumbnailUrl())
                    .productAuctionEndTime(p.getProductAuctionEndTime())
                    .isFavorite(favoriteRepositorySupport.getIsFavoriteByUserIdAndProductId(userId,p.getProductId()))
                    .productFavoriteCount(favoriteRepositorySupport.getFavoriteCount(p.getProductId()))
                    .build();

            list.add(userProductWithIsFavoriteRes);
        }
        if(list.isEmpty()) return Page.empty();

        return new PageImpl<UserProductWithIsFavoriteRes>(list,products.getPageable(),list.size());
    }

    @Override
    public List<UserAllRes> getUserAll(){

        List<User> userList = userRepository.findAll();

        List<UserAllRes> listRes = new ArrayList<>();

        for(User u :userList ){

            UserAllRes userRes = UserAllRes.builder()
                    .user(u)
                    .followee(followRepositorySupport.FolloweeList(u.getUserId()))
                    .follower(followRepositorySupport.FollowerList(u.getUserId()))
                    .build();

            listRes.add(userRes);
        }
        return listRes;
    }
}


