package com.nft.ncity.domain.myroom.db.repository;

import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyRoomRepository extends JpaRepository<MyRoom, Long> {
}
