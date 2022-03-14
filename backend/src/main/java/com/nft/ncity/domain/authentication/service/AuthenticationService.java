package com.nft.ncity.domain.authentication.service;

import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.request.AuthenticationRegisterPostReq;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AuthenticationService {

   Page<Authentication> getAuthenticationListByType(int authType, Pageable pageable);
   Authentication getAuthenticationDetailByAuthId(Long authId);
   Authentication AuthenticationRegister(AuthenticationRegisterPostReq authenticationRegisterPostReq, MultipartFile multipartFile) throws IOException;
   void deleteFile(String fileName);
}
