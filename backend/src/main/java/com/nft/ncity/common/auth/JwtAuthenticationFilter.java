package com.nft.ncity.common.auth;

import com.nft.ncity.common.util.CookieUtil;
import com.nft.ncity.common.util.JwtTokenUtil;
import com.nft.ncity.common.util.RedisUtil;
import com.nft.ncity.domain.user.db.entity.User;
import com.nft.ncity.domain.log.service.LogService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.rememberme.InvalidCookieException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 요청 헤더에 jwt 토큰이 있는 경우, 토큰 검증 및 인증 처리 로직 정의.
 */
@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
	private LogService logService;

    @Autowired
    private CookieUtil cookieUtil;

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final Cookie accessCookie = cookieUtil.getCookie(request, jwtTokenUtil.ACCESS_TOKEN_NAME);

        String userAddress = null;
        String accessToken = null;
        String refreshToken = null;

        try{
            if(accessCookie != null){
                accessToken = accessCookie.getValue();

                userAddress = jwtTokenUtil.getUserAddress(accessToken);
            }
            if(userAddress != null){    // Access token이 유효하면 AccessToken내 payload를 읽어 사용자와 관련있는 userDetail 생성
                log.info("jwt - access token 유효");
                // jwt 토큰에 포함된 계정 정보(userAddress) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
                User user = logService.getUserDetailByAddress(userAddress);

                UserDetails userDetails = new UserDetails(user);
                if(jwtTokenUtil.verify(accessToken).isResult()){
                    // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성.
                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(user.getUserId(),
                            null, AuthorityUtils.createAuthorityList(user.getUserRole()));
                    jwtAuthentication.setDetails(userDetails);
                    // jwt 토큰으로 부터 획득한 인증 정보(authentication) 설정.
                    SecurityContextHolder.getContext().setAuthentication(jwtAuthentication);
                }
            }
        }catch (ExpiredJwtException e){ // Access token이 유효하지 않으면 Refresh Token 값을 읽어드림
            log.info("jwt - access token 유효하지 않아서 refresh token 값 가져오기");
            Cookie refreshCookie = cookieUtil.getCookie(request,jwtTokenUtil.REFRESH_TOKEN_NAME);
            if(refreshToken!=null){
                refreshToken = refreshCookie.getValue();
            }
        }catch(Exception e){
        }

        try{    // Refresh Token을 읽어 Access Token을 사용자에게 재생성하고, 요청을 허가시킴
            if(refreshToken != null){
                userAddress = redisUtil.getData(refreshToken);
                if (userAddress != null) {
                    log.info("jwt - access token 읽어오기 성공");
                    User user = logService.getUserDetailByAddress(userAddress);
                    UserDetails userDetails = new UserDetails(user);

                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(user.getUserId(),
                            null, AuthorityUtils.createAuthorityList(user.getUserRole()));
                    jwtAuthentication.setDetails(userDetails);

                    SecurityContextHolder.getContext().setAuthentication(jwtAuthentication);

                    // Access Token 재생성
                    String newToken = jwtTokenUtil.createAccessToken(user.getUserId(), userAddress);

                    Cookie newAccessToken = cookieUtil.createCookie(jwtTokenUtil.ACCESS_TOKEN_NAME, newToken);
                    response.addCookie(newAccessToken);
                }
            }
        }catch(ExpiredJwtException e){

        }
        filterChain.doFilter(request,response);
    }


//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//			throws ServletException, IOException {
//		// Read the Authorization header, where the JWT Token should be
//        String header = request.getHeader(jwtTokenUtil.HEADER_STRING);
//
//        // If header does not contain BEARER or is null delegate to Spring impl and exit
//        if (header == null || !header.startsWith(jwtTokenUtil.TOKEN_PREFIX)) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        try {
//            // If header is present, try grab user principal from database and perform authorization
//            Authentication authentication = getAuthentication(request);
//            // jwt 토큰으로 부터 획득한 인증 정보(authentication) 설정.
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        } catch (Exception ex) {
//            ResponseBodyWriteUtil.sendError(request, response, ex);
//            return;
//        }
//
//        filterChain.doFilter(request, response);
//	}
//
//	@Transactional(readOnly = true)
//    public Authentication getAuthentication(HttpServletRequest request) throws Exception {
//        String token = request.getHeader(jwtTokenUtil.HEADER_STRING);
//        // 요청 헤더에 Authorization 키값에 jwt 토큰이 포함된 경우에만, 토큰 검증 및 인증 처리 로직 실행.
//        if (token != null) {
//            // parse the token and validate it (decode)
//            JWTVerifier verifier = jwtTokenUtil.getVerifier();
//            jwtTokenUtil.handleError(token);
//            DecodedJWT decodedJWT = verifier.verify(token.replace(jwtTokenUtil.TOKEN_PREFIX, ""));
//            String userAddress = String.valueOf(decodedJWT.getClaim("userAddress"));
//
//            // Search in the DB if we find the user by token subject (username)
//            // If so, then grab user details and create spring auth token using username, pass, authorities/roles
//            if (userAddress != null) {
//                    // jwt 토큰에 포함된 계정 정보(userAddress) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
//            		User user = logService.getUserDetail(userAddress);
//                if(user != null) {
//                        // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성.
//                		UserDetails userDetails = new UserDetails(user);
//                		UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(userAddress,
//                				null, userDetails.getAuthorities());
//                		jwtAuthentication.setDetails(userDetails);
//                        log.info("유효한 토큰입니다 : " + String.valueOf(userDetails.getAuthorities()));
//                		return jwtAuthentication;
//                }
//            }
//            return null;
//        }
//        return null;
//    }
}
