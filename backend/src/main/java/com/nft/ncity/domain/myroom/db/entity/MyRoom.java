package com.nft.ncity.domain.myroom.db.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@ApiModel(value = "MyRoom", description = "마이룸 정보")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Table(name = "myroom")
public class MyRoom {

    @Id
    @ApiModelProperty(value = "회원 id")
    private Long userId;

    @ApiModelProperty(value = "맵 정보")
    @Column(name = "myroom_background", columnDefinition = "Json")
    private String myRoomBackground;

    @ApiModelProperty(value = "캐릭터 이미지 경로")
    @Column(name = "myroom_character")
    private String myRoomCharacter;

    @ApiModelProperty(value = "오늘 방문자 수")
    @Column(name = "myroom_today_cnt")
    private Integer myRoomTodayCnt;

    @ApiModelProperty(value = "총 방문자 수 ")
    @Column(name = "myroom_total_cnt")
    private Integer myRoomTotalCnt;
}
