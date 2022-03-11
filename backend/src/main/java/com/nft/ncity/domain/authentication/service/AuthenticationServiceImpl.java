package com.nft.ncity.domain.authentication.service;

import com.nft.ncity.domain.authentication.db.entity.Authentication;
import com.nft.ncity.domain.authentication.db.repository.AuthenticationRepositorySupport;
import com.nft.ncity.domain.authentication.response.AuthenticationListGetRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("AuthenticationService")
public class AuthenticationServiceImpl implements AuthenticationService{

    @Autowired
    AuthenticationRepositorySupport authenticationRepositorySupport;

    @Override
    public Page<Authentication> getAuthenticationListByType(int authType, Pageable pageable) {

        Page<Authentication> authentications = authenticationRepositorySupport.findAuthenticationListByType(authType, pageable);

        return authentications;
    }
}
