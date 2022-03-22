package com.nft.ncity.domain.deal.db.repository;

import com.nft.ncity.domain.deal.db.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealRepository extends JpaRepository<Deal,Long> {
}
