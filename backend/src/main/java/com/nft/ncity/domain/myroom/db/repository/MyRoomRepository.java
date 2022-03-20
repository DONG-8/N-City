package com.nft.ncity.domain.myroom.db.repository;

import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyRoomRepository extends JpaRepository<MyRoom, Long> {
    List<MyRoom> findTop5ByOrderByMyRoomTotalCntDesc();
}
