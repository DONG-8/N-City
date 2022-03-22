package com.nft.ncity.domain.user.service;

import com.nft.ncity.domain.user.db.entity.EmailAuth;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.request.UserModifyUpdateReq;
import com.nft.ncity.domain.user.response.UserInfoRes;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {

	User getUserByEmail(String userEmail);
	Long userUpdateWithProfileImg(UserModifyUpdateReq userInfo, MultipartFile profileImg) throws IOException;
	Long userUpdateNoProfileImg(UserModifyUpdateReq userInfo);
	EmailAuth EmailAuthRegister(String emailAuthEmail);
	void confirmEmail(String emailAuthEmail,String authToken);
	UserInfoRes getUserInfo(User user);

}
