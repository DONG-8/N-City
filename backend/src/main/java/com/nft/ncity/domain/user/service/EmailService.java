package com.nft.ncity.domain.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
@EnableAsync
@RequiredArgsConstructor
class EmailService {
    private final JavaMailSender javaMailSender;

    // 비동기 처리 -> 메일을 보내는동안 블럭상태 방지
    @Async
    public void send(String email, String authToken) {
        SimpleMailMessage smm = new SimpleMailMessage();
        smm.setTo(email+"@gmail.com");
        smm.setSubject("회원가입 이메일 인증");
        smm.setText("http://localhost:8080/sign/confirm-email?email="+email+"&authToken="+authToken);

        javaMailSender.send(smm);
    }
}