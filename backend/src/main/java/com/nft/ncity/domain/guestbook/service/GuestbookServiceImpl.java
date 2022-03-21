package com.nft.ncity.domain.guestbook.service;

import com.nft.ncity.domain.guestbook.db.entity.Guestbook;
import com.nft.ncity.domain.guestbook.db.repository.GuestbookRepository;
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
}
