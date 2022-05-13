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
    public class Doctor {
        @Id
        private String doctorEmailId;
        private String  password;
        private String doctorName;
        private String contactNo;
        public String getDoctorEmailId() {
			return doctorEmailId;
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
		private Date dob;
        private Gender gender;
        private int experience;
        private String specialization;
        private String city;
        private byte[] doctorImage;

    }
