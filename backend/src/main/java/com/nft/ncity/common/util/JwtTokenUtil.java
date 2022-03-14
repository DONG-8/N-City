package com.nft.ncity.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.nft.ncity.common.model.response.VerifyResult;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
/**
 * jwt 토큰 유틸 정의.
 */
@Component
public class JwtTokenUtil {
    private static String secretKey;
    public static Integer accessTokenExpiration;
    public static Integer refreshTokenExpiration;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ISSUER = "ssafy.com";

    final static public String ACCESS_TOKEN_NAME = "accessToken";
    final static public String REFRESH_TOKEN_NAME = "refreshToken";
    
    @Autowired
	public JwtTokenUtil(@Value("${jwt.secret}") String secretKey,
                        @Value("${jwt.accessTokenExpiration}") Integer accessTokenExpiration,
                        @Value("${jwt.refreshTokenExpiration}") Integer refreshTokenExpiration) {
		this.secretKey = secretKey;
        this.accessTokenExpiration = accessTokenExpiration;
		this.refreshTokenExpiration = refreshTokenExpiration;
	}
    
	public void setExpirationTime() {
    		//JwtTokenUtil.expirationTime = Integer.parseInt(expirationTime);
    		JwtTokenUtil.accessTokenExpiration = accessTokenExpiration;
            JwtTokenUtil.refreshTokenExpiration = refreshTokenExpiration;
	}

	public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }
    
    public static String createAccessToken(long userId, String userAddress) {
    	Date expires = JwtTokenUtil.getTokenExpiration(accessTokenExpiration);
        return JWT.create()
                .withClaim("userId", userId)   // 아이디 저장
                .withClaim("userAddress", userAddress)   // 주소 저장
                .withExpiresAt(expires)     // 만료시간
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))    // 토큰 발행 시간 정보
                .sign(Algorithm.HMAC512(secretKey.getBytes())); // 사용할 암호화 알고리즘
    }

    public static String createRefreshToken() {
        Date expires = JwtTokenUtil.getTokenExpiration(refreshTokenExpiration);
        return JWT.create()
                .withExpiresAt(expires)     // 만료시간
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))    // 토큰 발행 시간 정보
                .sign(Algorithm.HMAC512(secretKey.getBytes())); // 사용할 암호화 알고리즘
    }

    private Key getSigningKey() {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // 토큰에 담긴 payload 값 가져오기
    public Claims extractAllClaims(String token) throws ExpiredJwtException {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // 토큰 만료 됐는지 안됐는지 확인
    public Boolean isTokenExpired(String token) {
        final Date expiration = extractAllClaims(token).getExpiration();
        return expiration.before(new Date());
    }

    // 토큰에서 userId 가져오기
    public long getUserId(String token) {
        return extractAllClaims(token).get("getUserId", long.class);
    }

    // 토큰에서 userAddress 가져오기
    public String getUserAddress(String token) {
        return extractAllClaims(token).get("userAddress", String.class);
    }

    // 토큰 검증하기
    public static VerifyResult verify(String token){
        try{
            DecodedJWT decode = JWT.require(Algorithm.HMAC512(secretKey.getBytes())).build().verify(token);
            return VerifyResult.builder().userId(String.valueOf(decode.getClaim("userId"))).result(true).build();
        }catch(JWTVerificationException ex){
            DecodedJWT decode = JWT.decode(token);
            return VerifyResult.builder().userId(String.valueOf(decode.getClaim("userId"))).result(false).build();
        }
    }

    public static Date getTokenExpiration(int expirationTime) {
    		Date now = new Date();
    		return new Date(now.getTime() + expirationTime);
    }
//
//    public static void handleError(String token) {
//        JWTVerifier verifier = JWT
//                .require(Algorithm.HMAC512(secretKey.getBytes()))
//                .withIssuer(ISSUER)
//                .build();
//
//        try {
//            verifier.verify(token.replace(TOKEN_PREFIX, ""));
//        } catch (AlgorithmMismatchException ex) {
//            throw ex;
//        } catch (InvalidClaimException ex) {
//            throw ex;
//        } catch (SignatureGenerationException ex) {
//            throw ex;
//        } catch (SignatureVerificationException ex) {
//            throw ex;
//        } catch (TokenExpiredException ex) {
//            throw ex;
//        } catch (JWTCreationException ex) {
//            throw ex;
//        } catch (JWTDecodeException ex) {
//            throw ex;
//        } catch (JWTVerificationException ex) {
//            throw ex;
//        } catch (Exception ex) {
//            throw ex;
//        }
//    }
//
//    public static void handleError(JWTVerifier verifier, String token) {
//        try {
//            verifier.verify(token.replace(TOKEN_PREFIX, ""));
//        } catch (AlgorithmMismatchException ex) {
//            throw ex;
//        } catch (InvalidClaimException ex) {
//            throw ex;
//        } catch (SignatureGenerationException ex) {
//            throw ex;
//        } catch (SignatureVerificationException ex) {
//            throw ex;
//        } catch (TokenExpiredException ex) {
//            throw ex;
//        } catch (JWTCreationException ex) {
//            throw ex;
//        } catch (JWTDecodeException ex) {
//            throw ex;
//        } catch (JWTVerificationException ex) {
//            throw ex;
//        } catch (Exception ex) {
//            throw ex;
//        }
//    }
}
