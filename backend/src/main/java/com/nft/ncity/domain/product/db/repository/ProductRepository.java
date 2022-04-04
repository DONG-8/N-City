package com.nft.ncity.domain.product.db.repository;

import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.response.ProductTop10GetRes;
import com.querydsl.core.Tuple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

// <Table, Id값>
public interface ProductRepository extends JpaRepository<Product,Long> {

}
