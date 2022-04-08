package com.nft.ncity.domain.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
@EnableAsync
@RequiredArgsConstructor
class EmailService {
    private final JavaMailSender javaMailSender;

    // 비동기 처리 -> 메일을 보내는동안 블럭상태 방지
    @Async
    public void send(String email, String authToken) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
            messageHelper.setTo(email);
            messageHelper.setSubject("N-CITY 회원가입 이메일 인증 메일 입니다.");
            StringBuilder sb = new StringBuilder();
            sb.append("<img  src='https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/forEmailSend/2.png'/> <br>");
            sb.append("<a href=http://localhost:8080/api/users/confirm-email?email="+email+"&authToken="+authToken+">인증하기</a>");
            messageHelper.setText(sb.toString(),true);
        } catch (Exception e) {
            e.printStackTrace();;
        }
        javaMailSender.send(message);
    }
}