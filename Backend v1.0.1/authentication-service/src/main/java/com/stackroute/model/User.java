package com.stackroute.model;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    @Id
    private String userEmail;
    public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UserType getUserType() {
		return userType;
	}
	@Override
	public String toString() {
		return "User [userEmail=" + userEmail + ", password=" + password + ", userType=" + userType + "]";
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public User(String userEmail, String password, UserType userType) {
		super();
		this.userEmail = userEmail;
		this.password = password;
		this.userType = userType;
	}
	public void setUserType(UserType userType) {
		this.userType = userType;
	}
	private String password;
    @Enumerated(EnumType.STRING)
    private UserType userType;

}
