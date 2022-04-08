package com.nft.ncity.domain.authentication.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@EntityListeners(AuditingEntityListener.class)
public class AuthFile {

    @Id
    // 기본 키 생성을 데이터베이스에 위임
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value="파일 ID")
    @Builder.Default
    private Long fileId = null;

    @OneToOne(cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JoinColumn(name = "auth_id")
    @ApiModelProperty(value="인증 ID")
    private Authentication authId;

    @ApiModelProperty(value="파일 이름")
    private String fileName;

    @ApiModelProperty(value="파일 크기")
    private float fileSize;

    @ApiModelProperty(value="파일 형식")
    private String fileContentType;

    @ApiModelProperty(value="파일 url")
    private String fileUrl;

    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @ApiModelProperty(value="파일 생성일")
    private LocalDateTime regDt;
}
