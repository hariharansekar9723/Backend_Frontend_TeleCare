package com.stackroute.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document
public class Patient {

        @Id
        private String patientEmailId;
        private String  password;
        private String patientName;
        private String contactNo;
        public String getPatientEmailId() {
			return patientEmailId;
		}
		public void setPatientEmailId(String patientEmailId) {
			this.patientEmailId = patientEmailId;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getPatientName() {
			return patientName;
		}
		public void setPatientName(String patientName) {
			this.patientName = patientName;
		}
		public String getContactNo() {
			return contactNo;
		}
		public void setContactNo(String contactNo) {
			this.contactNo = contactNo;
		}
		public Date getDob() {
			return dob;
		}
		public void setDob(Date dob) {
			this.dob = dob;
		}
		public Gender getGender() {
			return gender;
		}
		public void setGender(Gender gender) {
			this.gender = gender;
		}
		public String getCity() {
			return city;
		}
		public void setCity(String city) {
			this.city = city;
		}
		public byte[] getPatientImage() {
			return patientImage;
		}
		public void setPatientImage(byte[] patientImage) {
			this.patientImage = patientImage;
		}
		private Date dob;
        private Gender gender;
        private String city;
        private byte[] patientImage;
    }
