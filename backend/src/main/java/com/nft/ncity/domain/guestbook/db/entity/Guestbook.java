package com.nft.ncity.domain.guestbook.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@ApiModel(value = "guestbook", description = "방명록")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Guestbook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "방명록 구분 id")
    private Long guestbookId;

    @ApiModelProperty(value = "방명록 주인 id")
    private Long guestbookOwnerId;

    @ApiModelProperty(value = "방명록 작성자 id")
    private Long guestbookWriterId;

    @ApiModelProperty(value = "방명록 내용")
    private String guestbookContents;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @ApiModelProperty(value = "방명록 생성일")
    private LocalDateTime guestbookCreatedAt;
}
