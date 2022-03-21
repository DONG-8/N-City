package com.nft.ncity.domain.myroom.db.repository;

import com.nft.ncity.domain.myroom.db.entity.MyRoom;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MyRoomRepository extends JpaRepository<MyRoom, Long> {
    List<MyRoom> findTop5ByOrderByMyRoomTotalCntDesc();
    @Query(nativeQuery=true, value="SELECT * FROM myroom ORDER BY rand() LIMIT 1")
    Optional<MyRoom> getMyRoomByRandom();
}
