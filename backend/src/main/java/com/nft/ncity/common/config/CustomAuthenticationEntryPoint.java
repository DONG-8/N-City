package com.nft.ncity.common.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {
        log.error("CustomAuthenticationEntryPoint - 로그인하지 않은 사용자 접근");
//        RequestCache requestCache = new HttpSessionRequestCache();
//        SavedRequest savedRequest = requestCache.getRequest(request, response);
//        String redirectUrl = savedRequest.getRedirectUrl();
//        response.sendRedirect(redirectUrl);
        response.sendRedirect("/login");
//        String encodedRedirectURL = response.encodeRedirectURL(request.getContextPath() + "/login");

//        response.setHeader("Access-Control-Allow-Origin", );
//        response.setHeader("Location", "https://j6e106.p.ssafy.io/login");
//        response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);

//        String sdf = "redirect:" + "https://www.naver.com";
//        String referrer = request.getHeader("Referer");
//        request.getSession().setAttribute("prevPage", referrer);
//        return null;
//        RedirectView redirectView = new RedirectView();
//        redirectView.setUrl("https://www.naver.com");
//        return redirectView;
//String redirect = "redirect:https://www.naver.com";

    }
}
