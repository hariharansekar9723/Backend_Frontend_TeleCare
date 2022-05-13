package com.stackroute.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.stackroute.jwtimpl.AuthenticationResponse;
import com.stackroute.jwtimpl.JwtUtil;
import com.stackroute.model.User;
import com.stackroute.model.UserType;
import com.stackroute.repository.UserRepository;
import com.stackroute.service.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

//@SpringBootTest
//@ContextConfiguration
//@WebMvcTest(UserController.class)
//@AutoConfigureMockMvc
//@ComponentScan(basePackages = "com.stackroute")
@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserServiceImpl userService;
    @Mock
    private JwtUtil jwtUtil;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;


    private User user;


    @BeforeEach
    public void init()
    {
        openMocks(this);
        mockMvc=MockMvcBuilders.standaloneSetup(userController).build();
    }



    @Test
    public void TestUserLogin_GivenUser_WhenAuthenticated_ThenReturnStatusOk() throws Exception {
        User user=new User();
        AuthenticationResponse authenticationResponse=new AuthenticationResponse(user.getUserEmail(),true,"");
        when(userService.userLogin(any())).thenReturn(authenticationResponse);
        String url="/api/v2/login";
        MvcResult mvcResult=mockMvc.perform(post(url).contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(user))
                .with(csrf())
                .characterEncoding("UTF-8"))
                .andDo(print())
                .andReturn();
        AuthenticationResponse newAuthResp=parseResponse(mvcResult,AuthenticationResponse.class);
        assertEquals(200,mvcResult.getResponse().getStatus());
        assertEquals("xyz@mail.com",newAuthResp.getUserEmail());
    }


    public static String asJsonString(final Object obj) {
        try {

            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException("Unable to write as Json String");
        }
    }

    public static <T> T parseResponse(MvcResult result, Class<T> authenticationResponse) {
        try {
            String contentAsString = result.getResponse().getContentAsString();
            Gson g=new Gson();
//            String jsonString = g.toJson(result.getResponse().getContentAsString());
            return g.fromJson(result.getResponse().getContentAsString(),authenticationResponse);
//            return MAPPER.readValue(contentAsString,authenticationResponse);
//                    .configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT,true)
//                    .readValue(contentAsString,authenticationResponse);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
