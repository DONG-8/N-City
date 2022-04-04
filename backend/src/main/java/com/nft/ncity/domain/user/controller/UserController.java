package com.nft.ncity.domain.user.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.common.util.CookieUtil;
import com.nft.ncity.common.util.JwtTokenUtil;
import com.nft.ncity.common.util.RedisUtil;
import com.nft.ncity.domain.favorite.db.entity.Favorite;
import com.nft.ncity.domain.favorite.service.FavoriteService;
import com.nft.ncity.domain.log.request.LoginPostReq;
import com.nft.ncity.domain.log.response.LoginPostRes;
import com.nft.ncity.domain.log.service.LogService;
import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.service.ProductService;
import com.nft.ncity.domain.user.db.entity.EmailAuth;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.user.db.repository.UserRepository;
import com.nft.ncity.domain.user.request.EmailAuthRegisterReq;
import com.nft.ncity.domain.user.request.UserModifyUpdateReq;
import com.nft.ncity.domain.user.response.*;
import com.nft.ncity.domain.user.service.UserService;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Slf4j
@Api(value = "유저 정보 API")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductService productService;

    @Autowired
    FavoriteService favoriteService;

    @Autowired
    LogService logService;

    @Autowired
    RedisUtil redisUtil;

    @Autowired
    CookieUtil cookieUtil;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @ApiOperation(value = "로그인")
    @PostMapping("/login")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = LoginPostRes.class),
            @ApiResponse(code = 401, message = "Incorrect Wallet")
    })
    public ResponseEntity<LoginPostRes> userLogin(@RequestBody @ApiParam(value = "로그인 정보", required = true) LoginPostReq loginInfo, HttpServletResponse response) {
        log.info("userLogin - Call");

        String userAddress = loginInfo.getUserAddress();
        Integer addressLength = userAddress.length();
        // 올바른 지갑 주소인지 확인
        if(!addressLength.equals(42)) {
            return ResponseEntity.status(401).body(LoginPostRes.of(401, "Incorrect Wallet", null, null,null,false));
        } else {
            User user = logService.getUserDetailByAddress(userAddress);
            // 토큰
            final String accessJwt = JwtTokenUtil.createAccessToken(user.getUserId(), user.getUserAddress());
            final String refreshJwt = JwtTokenUtil.createRefreshToken();

            // 쿠키
            Cookie accessToken = cookieUtil.createCookie(JwtTokenUtil.ACCESS_TOKEN_NAME, accessJwt);
            Cookie refreshToken = cookieUtil.createCookie(JwtTokenUtil.REFRESH_TOKEN_NAME, refreshJwt);

            // redis 저장
            redisUtil.setDataExpire(refreshJwt, userAddress, JwtTokenUtil.refreshTokenExpiration);

            response.addCookie(accessToken);
            response.addCookie(refreshToken);

            boolean isNew = user.getUserRole().equals("Role_NEW") ? true : false;

            return ResponseEntity.status(201).body(LoginPostRes.of(201, "Success", accessJwt, user.getUserId(),user.getUserNick(), isNew));
        }
    }

    @ApiOperation(value = "로그아웃")
    @GetMapping("/logout")
    @ApiResponses({
            @ApiResponse(code = 204, message = "성공"),
            @ApiResponse(code = 400, message = "이미 로그아웃한 유저입니다.")
    })
    public ResponseEntity<? extends BaseResponseBody> userLogout(HttpServletRequest request, HttpServletResponse response) {
        log.info("userLogout - Call");

        Cookie accessCookie = cookieUtil.getCookie(request,  jwtTokenUtil.ACCESS_TOKEN_NAME);
        Cookie refreshCookie = cookieUtil.getCookie(request, jwtTokenUtil.REFRESH_TOKEN_NAME);

        // < Access Token 작업 >
        // 1. access token 담겨있는 cookie 있는지 확인
        if (accessCookie != null) { // 2. access Cookie 유효하다면 토큰 가져오기
            String accessToken = accessCookie.getValue();

            // 3. Access Token 유효한지 확인
            if (jwtTokenUtil.verify(accessToken).isResult()) {
                // 3-1. access token 유효시간 가지고와서 redis에 블랙리스트로 저장하기
                long expirationTime = jwtTokenUtil.getTokenExpirationAsLong(accessToken);
                redisUtil.setDataExpire(accessToken, "logout", expirationTime);
                log.info("userLogout - access token redis에 저장");
            }
            // 4. access Token 담겨있는 쿠키 삭제
            Cookie expiredAccessCookie = cookieUtil.removeCookie(jwtTokenUtil.ACCESS_TOKEN_NAME);
            response.addCookie(expiredAccessCookie);
        }

        // < refresh token 작업 >
        // 1. refresh token 담겨있는 쿠키 있는지 확인
        if (refreshCookie == null) {
            // 1-1. 쿠키 없으면 이미 로그아웃한 유저로 반환
            log.error("userLogout - refresh cookie 없음");
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이미 로그아웃한 유저입니다."));
        }

        // 2. 쿠키키 유효하다면 토큰 가져기
        String refreshToken = refreshCookie.getValue();

        // 3. refresh Token 담겨있는 쿠키 삭제
        Cookie expiredRefreshCookie = cookieUtil.removeCookie(jwtTokenUtil.REFRESH_TOKEN_NAME);
        response.addCookie(expiredRefreshCookie);

        // 4. refresh token redis에서 삭제
        if(redisUtil.getData(refreshToken) != null) {
            redisUtil.deleteData(refreshToken);
            log.info("userLogout - refreshToken redis에서 삭제");
            return ResponseEntity.status(204).body(BaseResponseBody.of(200, "Success"));
        } else {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이미 로그아웃한 유저입니다."));
        }
    }

    @GetMapping("/{userId}")
    @ApiOperation(value = "유저 정보 조회", notes = "<strong>UserId에 해당하는 유저의 정보</strong>을 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<UserInfoRes> getUserDetailById(@PathVariable("userId") Long userId) {

        // 0. 받아올 유저 ID를 받음
        // 1. 해당 하는 유저에 대한 정보를 넘겨준다.

        log.info("getUserDetailById - 호출");
        User user = userRepository.getById(userId);
        UserInfoRes userInfoRes = userService.getUserInfo(user);
        if(null == user) {
            log.error("getUserDetailById - This userId doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(userInfoRes);
    }

    /**
        product 테이블의 회원id가 입력받은 userid와 동일한 컬럼 추출하기
     */
    @GetMapping("/{userId}/collected")
    @ApiOperation(value = "유저가 가진 작품 조회", notes = "<strong>해당 유저가 가진 작품 목록</strong>을 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<Page<UserProductWithIsFavoriteRes>>getProductListByUserId(@PathVariable("userId") Long userId,
                                                       @PageableDefault(page = 0, size = 10) Pageable pageable) {
        // 0. 받아올 유저 ID를 받음
        // 1. 해당 유저가 가진 작품 목록을 넘겨준다.

        log.info("getProductListByUserId - 호출");
        Page<UserProductWithIsFavoriteRes> productList = productService.getProductListByUserId(userId, pageable);

        if(productList == null) {
            log.error("getProductListByUserId - This userId has no Product.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(productList);
    }

    /**
     거래 테이블에서 받는 사람id가 입력받은 userId이고, 거래타입이 minted(6)인 거래 받아와서
     해당 거래에 있는 productId로 뽑아서 넣어주기.
     */
    @GetMapping("/{userId}/created")
    @ApiOperation(value = "유저가 생성한 작품 조회", notes = "<strong>해당 유저가 생성한 작품 목록</strong>을 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<Page<UserMintProductRes>>getCreatedProductListByUserId(@PathVariable("userId") Long userId,
                                                            @PageableDefault(page = 0, size = 10) Pageable pageable) {
        // 0. 받아올 유저 ID를 받음
        // 1. 해당 유저가 생성한 작품 목록을 넘겨준다.

        log.info("getCreatedProductListByUserId - 호출");
        Page<UserMintProductRes> productList = productService.getMintedProductList(userId, pageable);

        if(productList.equals(null)) {
            log.error("getCreatedProductListByUserId - There are no products created by this user.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(productList);
    }

    /**
     favorite 테이블의 user_id가 입력받은 userId와 동일한 값들 받아오기.
     */
    @GetMapping("/{userId}/favorites")
    @ApiOperation(value = "유저가 좋아요한 작품 조회", notes = "<strong>해당 유저가 좋아요한 작품 목록</strong>을 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "좋아요 한 작품 없음.")
    })
    public ResponseEntity<Page<UserProductWithIsFavoriteRes>> getFavoritesProductListByUserId(@PathVariable("userId") Long userId,
                                                                      @PageableDefault(page = 0, size = 10) Pageable pageable) {
        // 0. 받아올 유저 ID를 받음
        // 1. 해당 유저가 좋아요한 작품 목록을 넘겨준다.

        log.info("getFavoritesProductListByUserId - 호출");
        Page<Favorite> favorites = favoriteService.getFavoriteListByUserId(userId, pageable);
        Page<Product> products = productService.getFavoriteProduct(favorites);
        Page<UserProductWithIsFavoriteRes> userProductWithIsFavoriteRes = userService.getUserProductWithIsFavorite(products, userId);
        if(userProductWithIsFavoriteRes.equals(null)) {
            log.error("getFavoritesProductListByUserId - There are no products that this user likes.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(userProductWithIsFavoriteRes);
    }

    /**
     deal 테이블에서 deal_from 또는 deal_to가 입력받은 userId인 값들 받아오기.
     */
    @GetMapping("/{userId}/activities")
    @ApiOperation(value = "해당 유저의 거래 내역 조회", notes = "<strong>해당 유저의 거래 내역</strong>을 넘겨준다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공", response = User.class),
            @ApiResponse(code = 404, message = "해당 유저 거래내역 없음.")
    })
    public ResponseEntity<Page<UserDealInfoWithProductRes>> getActivityListByUserId(@PathVariable("userId") Long userId,
                                                                      @PageableDefault(page = 0, size = 10) Pageable pageable) {
        // 0. 유저 ID를 받음.
        // 1. 해당 유저의 거래 내역 DB에서 받아와서 보내주기.

        log.info("getActivityListByUserId - 호출");

        Page<UserDealInfoWithProductRes> userDealInfoWithProductRes = userService.getUserDealInfoWithProduct(userId, pageable);

        if(userDealInfoWithProductRes.equals(null)) {
            log.error("getActivityListByUserId - This userId doesn't exist.");
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.status(201).body(userDealInfoWithProductRes);
    }

    /**
     * Post : 리소스의 생성을 담당, 요청 시 마다 새로운 리소스가 생성
     * Put : 리소스의 생성과 수정을 담당, 요청 시 마다 같은 리소스를 반환, 리소스의 모든 속성을 수정
     * Patch : 수정만 담당, 리소스의 일부분만 수정
     *
     * userId를 현재 Body로 받아옴. Token에서 빼서 쓸 경우 변경해야함.
     */
    @PatchMapping("/change-info")
    @ApiOperation(value = "해당 유저의 회원정보 변경", notes = "<strong>해당 유저의 회원정보</strong>를 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 404, message = "해당 유저 없음."),
            @ApiResponse(code = 404, message = "해당 유저 없음.")
    })
    public ResponseEntity<BaseResponseBody> modifyUserInfoByUserId(@RequestBody UserModifyUpdateReq userInfo) throws IOException {

        // 0. 유저 ID를 받음.
        // 1. 해당 유저의 거래 내역 DB에서 받아와서 보내주기.

        log.info("modifyUserInfoByUserId - 호출");

        Long execute = userService.userUpdateWithProfileImg(userInfo);

        // 이메일 인증 확인
        User user = userRepository.getById(userInfo.getUserId());
        // 인증이 안되었으면
        if(!user.getUserEmailConfirm()){
            log.error("modifyUserInfoByUserId - 이메일 인증을 해주세요.");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"이메일 인증 필요."));
        }

        // 수정한게 없다.
        if(execute < 1) {
            log.error("modifyUserInfoByUserId - This userId doesn't exist.");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"해당 유저 없음."));
        }
        else {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"성공"));
        }
    }

    /**
     닉네임 중복 체크
     */
    @GetMapping("/{userNick}/duplicate")
    @ApiOperation(value = "닉네임 중복 체크", notes = "<strong>닉네임 중복 체크</strong>")
    @ApiResponses({
            @ApiResponse(code = 201, message = "닉네임 변경 가능."),
            @ApiResponse(code = 404, message = "닉네임 변경 불가능.")
    })
    public ResponseEntity<BaseResponseBody> getUserNickName(@PathVariable(value = "userNick") String userNick) {

        log.info("getUserNickName - 호출");

        Optional<User> user = userRepository.findUserByUserNick(userNick);

        if(user.isPresent()) {
            log.error("getUserNickName - This userNickName exists.");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"닉네임 변경 불가능."));
        }
        return ResponseEntity.status(201).body(BaseResponseBody.of(201,"닉네임 변경 가능."));
    }

    @PostMapping("/confirm")
    @ApiOperation(value = "이메일 인증 요청하기", notes = "<strong>이메일 인증 요청하기</strong>")
    @ApiResponses({
            @ApiResponse(code = 201, message = "이메일 인증 등록 및 확인 메일 보내기 완료."),
            @ApiResponse(code = 403, message = "이미 존재하는 이메일.")
    })
    public ResponseEntity<BaseResponseBody> EmailAuthRegister(@RequestBody EmailAuthRegisterReq emailAuthRegisterReq) {

        // 0. 이메일을 입력하고 이메일 인증 신청 버튼을 클릭한다.
        // 1. 해당 이메일이 user 테이블에 이미 존재하는지 확인
        // 2. 존재하지 않는다면 해당 이메일 EmailAuth 테이블에 등록
        // 2-1 존재 한다면 에러메세지 응답.

        log.info("EmailAuthRegister - 호출");
        // 해당 이메일이 존재하면
        if(userRepository.findByUserEmail(emailAuthRegisterReq.getEmailAuthEmail()).isPresent()) {
            return ResponseEntity.status(403).body(BaseResponseBody.of(403,"이미 존재하는 이메일."));
        }

        // 그렇다면 이미 인증을 완료한 상태에서 이메일을 변경한다면?
        User user = userRepository.findUserByUserId(emailAuthRegisterReq.getUserId()).get();
        // 다시 인증상태 false로 변경
        user.updateEmail(emailAuthRegisterReq.getEmailAuthEmail());
        // 변경한거 DB에 저장.
        userRepository.save(user);

        // 이메일 인증 테이블에 해당 이메일 등록하고 인증 확인 메일 보내기.
        EmailAuth emailAuth = userService.EmailAuthRegister(emailAuthRegisterReq.getEmailAuthEmail());

        return ResponseEntity.status(201).body(BaseResponseBody.of(201,"이메일 인증 등록 및 확인 메일 보내기 완료."));
    }

    @GetMapping("/confirm-email")
    @ApiOperation(value = "이메일 인증 수락", notes = "<strong>이메일 인증 수락</strong>")
    @ApiResponses({
            @ApiResponse(code = 201, message = "이메일 인증 수락."),
            @ApiResponse(code = 404, message = "이메일 인증 수락 불가능.")
    })
    public ResponseEntity<BaseResponseBody> EmailAuthConfirm(@RequestParam(name = "email") String emailAuthEmail,
                                                             @RequestParam(name = "authToken") String authToken) {
        // 이메일 인증 처리.
        log.info("EmailAuthConfirm - 호출");
        userService.confirmEmail(emailAuthEmail, authToken);

        return ResponseEntity.status(201).body(BaseResponseBody.of(201,"닉네임 변경 가능."));
    }

    /**
     유저 검색
     */
    @GetMapping("/search/{userNick}")
    @ApiOperation(value = "유저 닉네임으로 검색", notes = "<strong>유저 닉네임으로 검색</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "검색 완료", response = User.class),
//            @ApiResponse(code = 204, message = "검색 결과 없음"),
    })
    public ResponseEntity<List<User>> searchUser(@PathVariable @ApiParam(value = "검색할 유저 닉네임", required = true) String userNick) {
        log.info("searchUser - 호출");

        List<User> users = userService.searchUser(userNick);

//        if (users.size() == 0) {
//            return ResponseEntity.status(200).body(users);
//        }
        return ResponseEntity.status(200).body(users);
    }

    /**
     * 전체유저
     */
    @GetMapping("/all")
    @ApiOperation(value = "유저 전체조회", notes = "<strong>유저 전체 조회</strong>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "검색 완료", response = User.class),
    })
    public ResponseEntity<List<UserAllRes>> getUserAll() {

        log.info("allUserList - 호출");
        List<UserAllRes> users = userService.getUserAll();

        return ResponseEntity.status(200).body(users);
    }
}
