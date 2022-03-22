package com.nft.ncity.domain.product.db.repository;

import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import org.springframework.data.jpa.repository.JpaRepository;

// <Table, Id값>
public interface ProductRepository extends JpaRepository<Product,Long> {
}
