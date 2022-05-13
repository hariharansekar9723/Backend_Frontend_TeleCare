package com.stackroute.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
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
        private Date dob;
        public String getPatientEmailId() {
			return patientEmailId;
		}
		public void setPatientEmailId(String patientEmailId) {
			this.patientEmailId = patientEmailId;
		}
		@Override
		public String toString() {
			return "Patient [patientEmailId=" + patientEmailId + ", password=" + password + ", patientName="
					+ patientName + ", contactNo=" + contactNo + ", dob=" + dob + ", sgender=" + gender + ", city="
					+ city + ", patientImage=" + Arrays.toString(patientImage) + "]";
		}
		public Patient() {
			super();
			// TODO Auto-generated constructor stub
		}
		public Patient(String patientEmailId, String password, String patientName, String contactNo, Date dob,
				Gender gender, String city, byte[] patientImage) {
			super();
			this.patientEmailId = patientEmailId;
			this.password = password;
			this.patientName = patientName;
			this.contactNo = contactNo;
			this.dob = dob;
			this.gender = gender;
			this.city = city;
			this.patientImage = patientImage;
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
		private Gender gender;
        private String city;
        private byte[] patientImage;
    }
