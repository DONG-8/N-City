package com.nft.ncity.domain.authentication.db.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;
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
public class AuthFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value="파일 ID")
    private Long fileId;

    @OneToOne
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
    @ApiModelProperty(value="파일 생성일")
    private LocalDateTime regDt;
}
