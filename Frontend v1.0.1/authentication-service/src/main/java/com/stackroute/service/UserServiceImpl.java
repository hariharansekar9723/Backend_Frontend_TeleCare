package com.stackroute.service;

import com.stackroute.exceptions.PasswordNotMatchedException;
import com.stackroute.exceptions.UserAlreadyExistsException;
import com.stackroute.exceptions.UserNotRegisteredException;
import com.stackroute.jwtimpl.AuthenticationResponse;
import com.stackroute.jwtimpl.JwtUserDetails;
import com.stackroute.jwtimpl.JwtUtil;
import com.stackroute.model.User;
import com.stackroute.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    private static final MyLogger logger=new MyLogger();
    @Override
    public AuthenticationResponse userLogin(User user){
//    public Boolean userLogin(User user) {
//        Boolean status = false;
        Optional<User> findUser = userRepository.findById(user.getUserEmail());
        if (findUser.isPresent()) {
            if (user.getPassword().equals(findUser.get().getPassword())){
//                commented below for testing only
//                    && user.getUserType().equals(findUser.get().getUserType())) {
                try {
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(user.getUserEmail(), user.getPassword()));
                } catch (BadCredentialsException bc) {
                    throw new BadCredentialsException("Bad Credentials...");
                }
                final UserDetails userDetails = this.loadUserByUsername(user.getUserEmail());
                final String jwt = jwtUtil.generatetoken(userDetails);
                logger.log("Jwt is: "+jwt);
                return new AuthenticationResponse(user.getUserEmail(),true,jwt);
//                status = true;
            }
            else
            {
                throw new PasswordNotMatchedException("Invalid Password... please retry");
            }
        }
        else
        {
            throw new UserNotRegisteredException("Invalid Credentials or User is Not Registered");
        }
//        return new ResponseEntity<>("Please try again.. using the correct credentials",HttpStatus.NOT_FOUND);
    }


    /*@Override
    public String userLogin(User user)
    {
        Optional<User> findUser=userRepository.findById(user.getUserEmail());
        if(findUser.isPresent())
        {
            if(user.getPassword().equals(findUser.get().getPassword())
                    && user.getUserType().equals(findUser.get().getUserType()))
            {
                return "User logged In";
            }
            *//*else
            {
                throw new PasswordNotMatchedException("Invalid Password... please retry");
            }*//*
        }
        else
        {
            throw new UserNotRegisteredException("Invalid Credentials or User is Not Registered");
        }

        return "Please try again.. using the correct credentials";
    }*/

    @Override
    public User userRegister(User user) {

        if(userRepository.findById(user.getUserEmail()).isPresent())
        {
            throw new UserAlreadyExistsException("User with the given Email already exists");
        }
        else
        {
            user.setUserEmail(user.getUserEmail().toLowerCase());
        }
        return userRepository.save(user);
    }

    @Override
    public String  getUserType(String  userId) {
        if(userRepository.findById(userId).isPresent())
        {
//            return user.getUserType();
            return userRepository.findById(userId).get().getUserType().name();

        }
        else
        {
            throw new RuntimeException("Usertype not verified");
        }
    }

    /*@Override
    public User userRegister(User user) {
        Optional<User> findUser= userRepository.findById(user.getUserEmail());
        if(findUser.isPresent())
        {
            throw new UserAlreadyExistsException("User with the given Email already exists");
        }
        else
        {
            user.setUserEmail(user.getUserEmail().toLowerCase());
        }
        return userRepository.save(user);
    }*/

//    this method will be called iff username is present in the database and all credentials are matched
    @Override
    public UserDetails loadUserByUsername(String username) {
        JwtUserDetails jwtUserDetails;
        logger.log("Started loadUserByUsername() ");

        User user = userRepository.findById(username).get();
        jwtUserDetails = new JwtUserDetails(user);
        System.out.println(jwtUserDetails);
        return jwtUserDetails;

        /*return new JwtUserDetails(findUser.orElseThrow(()->{
            System.out.println("inside JwtUserDetails constructor...");
            throw new UsernameNotFoundException("Username does not exists..");
        }));*/

        /*return findUser.map(JwtUserDetails::new).orElseThrow(()->{
            throw new UsernameNotFoundException("Username does not exists");
        });*/
    }
}
