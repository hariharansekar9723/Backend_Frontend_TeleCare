package com.stackroute.jwtimpl;

import com.stackroute.model.User;
import com.stackroute.model.UserType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class JwtUserDetails implements UserDetails {

    private String userEmail;
    private String password;
    private UserType userType;
    private List<SimpleGrantedAuthority> authorities;

    public JwtUserDetails(User user) {
        this.userEmail = user.getUserEmail();
        this.password = user.getPassword();
        this.userType = user.getUserType();
        System.out.println(this.userType.name());
        authorities=new ArrayList<>();
        System.out.println(authorities);
        this.authorities.add(new SimpleGrantedAuthority("ROLE_"+this.userType.name()));
        System.out.println(authorities);
//        authorities=new ArrayList<>();
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "JwtUserDetails{" +
                "userEmail='" + userEmail + '\'' +
                ", password='" + password + '\'' +
                ", userType=" + userType +
                ", authorities=" + authorities +
                '}';
    }
}
