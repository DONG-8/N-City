package com.nft.ncity.domain.user.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmailAuth {

    private static final Long MAX_EXPIRE_TIME = 5L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emailAuthId;

    // 가입 이메일
    private String emailAuthEmail;
    // UUID
    private String emailAuthToken;
    // 만료 여부
    private Boolean emailAuthExpired;
    // 만료 시간
    private LocalDateTime emailAuthExpireDate;
    // 유저 아이디
    private Long userId;
    // 이메일 인증여부
    public Boolean isEmailConfirm;

    @Builder
    public EmailAuth(Long userId, String emailAuthEmail, String emailAuthToken, Boolean emailAuthExpired) {
        this.userId = userId;
        this.emailAuthEmail = emailAuthEmail;
        this.emailAuthToken = emailAuthToken;
        this.emailAuthExpired = emailAuthExpired;
        this.emailAuthExpireDate = LocalDateTime.now().plusMinutes(MAX_EXPIRE_TIME);
        this.isEmailConfirm = false;
    }

    public void useToken() {
        this.emailAuthExpired = true;
    }

    public void confirmEmail() { this.isEmailConfirm = true;}
}
