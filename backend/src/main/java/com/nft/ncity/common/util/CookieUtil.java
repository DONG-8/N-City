package com.nft.ncity.common.util;

import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Service
public class CookieUtil {

    public Cookie createCookie(String cookieName, String value){
        Cookie cookie = new Cookie(cookieName,value);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(JwtTokenUtil.accessTokenExpiration);
        cookie.setPath("/");
        return cookie;
    }

    public Cookie getCookie(HttpServletRequest request, String cookieName){
        final Cookie[] cookies = request.getCookies();
        if(cookies == null) return null;
        for(Cookie cookie : cookies){
            if(cookie.getName().equals(cookieName))
                return cookie;
        }
        return null;
    }

    public Cookie removeCookie(String cookieName){
        Cookie expiredCookie = new Cookie(cookieName, null);
        expiredCookie.setMaxAge(0); // expiration 타임 0으로 하여 삭제
        expiredCookie.setPath("/"); // 모든 경로에서 삭제
        return expiredCookie;
    }

}