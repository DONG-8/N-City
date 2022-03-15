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

    private String emailAuthEmail;
    private String emailAuthToken;
    private Boolean emailAuthExpired;
    private LocalDateTime emailAuthExpireDate;

    @Builder
    public EmailAuth(String emailAuthEmail, String emailAuthToken, Boolean emailAuthExpired) {
        this.emailAuthEmail = emailAuthEmail;
        this.emailAuthToken = emailAuthToken;
        this.emailAuthExpired = emailAuthExpired;
        this.emailAuthExpireDate = LocalDateTime.now().plusMinutes(MAX_EXPIRE_TIME);
    }

    public void useToken() {
        this.emailAuthExpired = true;
    }
}
