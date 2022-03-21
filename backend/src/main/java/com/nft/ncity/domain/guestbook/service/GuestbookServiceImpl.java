package com.nft.ncity.domain.guestbook.service;

import com.nft.ncity.domain.guestbook.db.entity.Guestbook;
import com.nft.ncity.domain.guestbook.db.repository.GuestbookRepository;
import com.nft.ncity.domain.guestbook.request.GuestbookPostReq;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class GuestbookServiceImpl implements GuestbookService{

    @Autowired
    GuestbookRepository guestbookRepository;

    @Override
    public Page<Guestbook> getGuestbookList(Pageable pageable, Long guestbookOwnerId) {
        Page<Guestbook> guestbooks = guestbookRepository.findAllByGuestbookOwnerId(pageable, guestbookOwnerId);
        if(guestbooks.stream().count() == 0) {  // 방명록 없으면
            return null;
        }
        return guestbooks;
    }

    @Override
    public Boolean createGuestbook(GuestbookPostReq guestbookInfo) {
        Guestbook newGuestbook = Guestbook.builder()
                .guestbookOwnerId(guestbookInfo.getGuestbookOwnerId())
                .guestbookWriterId(guestbookInfo.getGuestbookWriterId())
                .guestbookContents(guestbookInfo.getGuestbookContents())
                .build();
        guestbookRepository.save(newGuestbook);
        return true;
    }
}
