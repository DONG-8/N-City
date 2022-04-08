package com.nft.ncity.domain.guestbook.db.repository;

import com.nft.ncity.domain.guestbook.db.entity.Guestbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestbookRepository extends JpaRepository<Guestbook, Long> {
    Page<Guestbook> findAllByGuestbookOwnerId(Pageable pageable, Long guestbookOwnerId);
}
