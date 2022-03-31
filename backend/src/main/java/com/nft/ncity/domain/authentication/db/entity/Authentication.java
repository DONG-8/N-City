package com.nft.ncity.domain.authentication.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Authentication {
    @Id
    // 기본 키 생성을 데이터베이스에 위임
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value="인증 ID")
    @Column(name = "auth_id")
    @Builder.Default
    // 인증 id
    private Long authId = null;

    // 이름
    @ApiModelProperty(value="이름")
    @Column(name = "auth_name")
    private String authName;

    // 이메일
    @ApiModelProperty(value="이메일")
    @Column(name = "auth_email")
    private String authEmail;

    // 신청일
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @ApiModelProperty(value="신청일")
    @Column(name = "auth_reg_dt")
    private LocalDateTime authRegAt;

    // 인증 타입
    @ApiModelProperty(value="인증 타입")
    @Column(name = "auth_type", columnDefinition = "TINYINT")
    private int authType;

    @ApiModelProperty(value="인증파일 url")
    @Column(name = "auth_url")
    private String authUrl;

    // 인플루언서는 SNS 주소 or 디자이너는 포트폴리오
    @ApiModelProperty(value="이메일")
    @Column(name = "auth_extra")
    String authExtra;

    public void authUrlRegister(String authUrl) {
        this.authUrl = authUrl;
    }
}
