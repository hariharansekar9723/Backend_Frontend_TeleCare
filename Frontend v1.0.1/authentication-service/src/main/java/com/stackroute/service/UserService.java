package com.stackroute.service;


import com.stackroute.jwtimpl.AuthenticationResponse;
import com.stackroute.model.User;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    AuthenticationResponse userLogin(User user);
    User userRegister(User user);
    String  getUserType(String userId);

}
