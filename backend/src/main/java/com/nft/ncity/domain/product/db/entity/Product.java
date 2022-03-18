package com.nft.ncity.domain.product.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "product") // table 명 대소문자 구분 하나?? , 이 Annotation 역할이 table명 다를때 연결 시키는거 맞지?
@ApiModel(value = "Product", description = "상품 CRUD") // swagger
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY) // auto increment
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "product_title")
    private String productTitle;

    @Column(name = "product_desc")
    private String productDesc;

    @Column(name = "product_code")
    private int productCode;

    @Column(name = "product_x_coordinate")
    private int productXCoordinate;

    @Column(name = "product_y_coordinate")
    private int productYCoordinate;

    @Column(name = "product_view",columnDefinition = "TINYINT")
    private boolean productView;

    @Column(name = "product_state")
    private int productState;

    @Column(name = "product_price")
    private double productPrice;


    @Column(name = "product_reg_dt")
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime productRegDt;

    @Column(name = "product_file_url")
    private String productFileUrl;

    @Column(name = "product_thumbnail_url")
    private String productThumbnailUrl;
}
