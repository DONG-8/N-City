package com.nft.ncity.domain.authentication.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@MappedSuperclass
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@EntityListeners(AuditingEntityListener.class)

public class Authentication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // 인증 id
    Long authId = null;

    // 이름
    String authName;
    // 이메일
    String authEmail;
    // 신청일
    @CreatedDate
    LocalDateTime authRegAt;
    // 인증 타입
    int authType;
}
