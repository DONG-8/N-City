package com.nft.ncity.common.model.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 서버 요청에대한 응답값(바디) 정의.
 * 파일 등록시에 사용
 */
@Getter
@Setter
@ApiModel("FileUrlResponseBody")
public class FileUrlResponseBody {
    @ApiModelProperty(name="응답 메시지", example = "정상")
    String message = null;
    @ApiModelProperty(name="응답 코드", example = "200")
    Integer statusCode = null;
    @ApiModelProperty(name="파일 URL", example = "https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/302c19ef-90f1-49fa-b25c-70c4db9821f6.png")
    String fileUrl = null;

    @ApiModelProperty(name="파일 id", example = "1")
    Long productId = null;


    public FileUrlResponseBody() {}

    public FileUrlResponseBody(Integer statusCode){
        this.statusCode = statusCode;
    }
    public FileUrlResponseBody(Integer statusCode, String message){
        this.statusCode = statusCode;
        this.message = message;
    }
    public FileUrlResponseBody(Integer statusCode, String message,String fileUrl){
        this.statusCode = statusCode;
        this.message = message;
        this.fileUrl = fileUrl;
    }

    public static FileUrlResponseBody of(Integer statusCode, String message, String fileUrl,Long productId) {
        FileUrlResponseBody body = new FileUrlResponseBody();
        body.message = message;
        body.statusCode = statusCode;
        body.fileUrl = fileUrl;
        body.productId = productId;
        return body;
    }
}



