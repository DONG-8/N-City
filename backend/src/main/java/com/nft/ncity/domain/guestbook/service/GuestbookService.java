package com.nft.ncity.domain.guestbook.service;

import com.nft.ncity.domain.guestbook.db.entity.Guestbook;
import com.nft.ncity.domain.guestbook.request.GuestbookPostReq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface GuestbookService {
    Page<Guestbook> getGuestbookList(Pageable pageable, Long guestbookOwnerId);
    Boolean createGuestbook(GuestbookPostReq guestbookInfo);
}
