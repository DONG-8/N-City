package com.nft.ncity.domain.authentication.service;

import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.response.AuthenticationListGetRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AuthenticationService {

    Page<Authentication> getAuthenticationListByType(int authType, Pageable pageable);
}
