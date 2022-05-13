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
    public class Doctor {
        @Id
        private String doctorEmailId;
        private String  password;
        private String doctorName;
        private String contactNo;
        private Date dob;
        private Gender gender;
        @Override
		public String toString() {
			return "Doctor [doctorEmailId=" + doctorEmailId + ", password=" + password + ", doctorName=" + doctorName
					+ ", contactNo=" + contactNo + ", dob=" + dob + ", gender=" + gender + ", experience=" + experience
					+ ", specialization=" + specialization + ", city=" + city + ", doctorImage="
					+ Arrays.toString(doctorImage) + "]";
		}
		public Doctor() {
			super();
			// TODO Auto-generated constructor stub
		}
		public String getDoctorEmailId() {
			return doctorEmailId;
		}
		public Doctor(String doctorEmailId, String password, String doctorName, String contactNo, Date dob,
				Gender gender, int experience, String specialization, String city, byte[] doctorImage) {
			super();
			this.doctorEmailId = doctorEmailId;
			this.password = password;
			this.doctorName = doctorName;
			this.contactNo = contactNo;
			this.dob = dob;
			this.gender = gender;
			this.experience = experience;
			this.specialization = specialization;
			this.city = city;
			this.doctorImage = doctorImage;
		}
		public void setDoctorEmailId(String doctorEmailId) {
			this.doctorEmailId = doctorEmailId;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getDoctorName() {
			return doctorName;
		}
		public void setDoctorName(String doctorName) {
			this.doctorName = doctorName;
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
		public int getExperience() {
			return experience;
		}
		public void setExperience(int experience) {
			this.experience = experience;
		}
		public String getSpecialization() {
			return specialization;
		}
		public void setSpecialization(String specialization) {
			this.specialization = specialization;
		}
		public String getCity() {
			return city;
		}
		public void setCity(String city) {
			this.city = city;
		}
		public byte[] getDoctorImage() {
			return doctorImage;
		}
		public void setDoctorImage(byte[] doctorImage) {
			this.doctorImage = doctorImage;
		}
		private int experience;
        private String specialization;
        private String city;
        private byte[] doctorImage;

    }
