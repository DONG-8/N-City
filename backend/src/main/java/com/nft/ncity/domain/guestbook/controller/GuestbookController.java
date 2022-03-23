package com.nft.ncity.domain.guestbook.controller;

import com.nft.ncity.common.model.response.BaseResponseBody;
import com.nft.ncity.domain.guestbook.db.entity.Guestbook;
import com.nft.ncity.domain.guestbook.request.GuestbookPostReq;
import com.nft.ncity.domain.guestbook.request.GuestbookPutReq;
import com.nft.ncity.domain.guestbook.service.GuestbookService;
import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Api(value = "마이룸 방명록 API")
@RestController
@RequestMapping("/api/guestbooks")
public class GuestbookController {

    @Autowired
    GuestbookService guestbookService;

    @ApiOperation(value = "방명록 조회")
    @GetMapping("/get-{guestbookOwnerId}")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = MyRoom.class),
    })
    public ResponseEntity<Page<Guestbook>> getGuestbookList(@PathVariable @ApiParam(value = "방 주인의 유저 id", required = true) Long guestbookOwnerId,
                                                       @PageableDefault(page = 0, size = 5, sort = "guestbookId", direction = Sort.Direction.DESC) Pageable pageable) {
        log.info("getGuestbookList - Call");

        Page<Guestbook> guestbooks = guestbookService.getGuestbookList(pageable, guestbookOwnerId);
        return ResponseEntity.status(200).body(guestbooks);
    }

    @ApiOperation(value = "방명록 작성")
    @PostMapping
    @ApiResponses({
            @ApiResponse(code = 204, message = "작성 성공"),
    })
    public ResponseEntity<? extends BaseResponseBody> createGuestbook(@RequestBody @ApiParam(value = "방명록 작성 정보", required = true) GuestbookPostReq guestbookInfo) {
        log.info("createGuestbook - Call");

        guestbookService.createGuestbook(guestbookInfo);
        return ResponseEntity.status(204).body(BaseResponseBody.of(204, "작성 성공"));
    }

    @ApiOperation(value = "방명록 수정")
    @PutMapping
    @ApiResponses({
            @ApiResponse(code = 204, message = "수정 성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 guestbookId 입니다."),
    })
    public ResponseEntity<? extends BaseResponseBody> modifyGuestbook(@RequestBody @ApiParam(value = "방명록 수정 정보", required = true) GuestbookPutReq guestbookInfo) {
        log.info("modifyGuestbook - Call");

        if(guestbookService.modifyGuestbook(guestbookInfo) < 1) {   // 방명록 id 잘못됐을 경우
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "존재하지 않는 guestbookId 입니다"));
        }
        return ResponseEntity.status(204).body(BaseResponseBody.of(204, "수정 성공"));
    }

    @ApiOperation(value = "방명록 삭제")
    @DeleteMapping("/{guestbookId}")
    @ApiResponses({
            @ApiResponse(code = 204, message = "삭제 성공"),
            @ApiResponse(code = 404, message = "존재하지 않는 guestbookId 입니다."),
    })
    public ResponseEntity<? extends BaseResponseBody> removeGuestbook(@PathVariable @ApiParam(value = "삭제할 방명록 Id", required = true) Long guestbookId) {
        log.info("removeGuestbook - Call");

        if(guestbookService.removeGuestbook(guestbookId) == false) {   // 방명록 id 잘못됐을 경우
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "존재하지 않는 guestbookId 입니다"));
        }
        return ResponseEntity.status(204).body(BaseResponseBody.of(204, "삭제 성공"));
    }
}
