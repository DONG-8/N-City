package com.nft.ncity.domain.user.service;

import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.user.db.entity.EmailAuth;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.request.UserModifyUpdateReq;
import com.nft.ncity.domain.user.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {

	User getUserByEmail(String userEmail);
	Long userUpdateWithProfileImg(UserModifyUpdateReq userInfo, String userEmail) throws IOException;
	EmailAuth emailAuthRegister(Long userId, String emailAuthEmail);
	void confirmEmail(String emailAuthEmail,String authToken);
	UserInfoRes getUserInfo(User user);
	List<User> searchUser(String userNick);
	Page<User> getUserList(Pageable pageable);
	Page<User> getNewUserList(Pageable pageable, String userRole);
	Long modifyUserRole(Long userId);
	Long modifyUserTokenRequest(Long userId);
    Page<UserDealInfoWithProductRes> getUserDealInfoWithProduct(Long userId, Pageable pageable);
	Page<UserProductWithIsFavoriteRes> getUserProductWithIsFavorite(Page<Product> products, Long userId);
	List<UserAllRes> getUserAll();
	List<UserFollowerTop5GetRes> getUserTop5OrderByFollowCnt();
}
