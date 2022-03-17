//package com.nft.ncity.domain.myroom.db.entity;
//
//import io.swagger.annotations.ApiModel;
//import io.swagger.annotations.ApiModelProperty;
//import lombok.*;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.Id;
//import javax.persistence.Table;
//
//@Getter
//@Entity
//@ApiModel(value = "User", description = "회원 정보")
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@AllArgsConstructor(access = AccessLevel.PRIVATE)
//@Builder
//@Table(name = "myroom")
//public class MyRoom {
//
//    @Id
//    @ApiModelProperty(value = "회원 id")
//    Long userId;
//
//    @ApiModelProperty(value = "배경 이미지 경로")
//    @Column(name = "myroom_background")
//    Long myRoomBackground;
//
//    @ApiModelProperty(value = "배경 bgm")
//    @Column(name = "myroom_bgm")
//    Long myRoomBgm;
//
//    @ApiModelProperty(value = "캐릭터 이미지 경로")
//    @Column(name = "myroom_character")
//    Long myRoomCharacter;
//
//    @ApiModelProperty(value = "오늘 방문자 수")
//    @Column(name = "myroom_today_cnt")
//    Long myRoomTodayCnt;
//
//    @ApiModelProperty(value = "총 방문자 수 ")
//    @Column(name = "myroom_total_cnt")
//    Long myRoomTotalCnt;
//}
