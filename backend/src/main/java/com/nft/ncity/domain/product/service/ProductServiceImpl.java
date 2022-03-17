package com.nft.ncity.domain.product.service;

import com.nft.ncity.domain.product.db.entity.Product;
import com.nft.ncity.domain.product.db.repository.ProductRepository;
import com.nft.ncity.domain.product.request.ProductModifyPutReq;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService{

    @Autowired
    ProductRepository productRepository;


    @Override
    public Page<Product> productList(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page -1 , size , Sort.by("productId").descending());
        Page<Product> productList = productRepository.findAll(pageRequest);
        return productList;
    }
    @Override
    public Product productDetail(Long productId) {
        return productRepository.findById(productId).get();
    }

    @Override
    public Product productModify(ProductModifyPutReq productModify) {
        // 해당 상품이 존재하면 수정, 존재하지않으면 null 반환
        if (productRepository.findById(productModify.getProductId()).isPresent()){
            Product product = new Product();

            product = productRepository.findById(productModify.getProductId()).get(); // 객체로 전부 가져옴
            product.setProductTitle(productModify.getProductTitle());
            product.setProductDesc(productModify.getProductDesc());

            // 수정할 것들 더 수정하고 ui 확인후...

            return productRepository.save(product);
        }else return null;
    }

    @Override
    public boolean productRemove(Long productId) {
        //해당 상품이 존재하면 삭제후 true 반환, 그렇지 않으면 false반환
        if (productRepository.findById(productId).isPresent()){
            productRepository.deleteById(productId);
            return true;
        }else return false;
    }
}
