package com.nft.ncity.domain.authentication.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Authentication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value="인증 ID")
    // 인증 id
    private Long authId = null;

    // 이름
    @ApiModelProperty(value="이름")
    private String authName;

    // 이메일
    @ApiModelProperty(value="이메일")
    private String authEmail;

    // 신청일
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @ApiModelProperty(value="신청일")
    private LocalDateTime authRegAt;

    // 인증 타입
    @ApiModelProperty(value="인증 타입")
    private int authType;
}
