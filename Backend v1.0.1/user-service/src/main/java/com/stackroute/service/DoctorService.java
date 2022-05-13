package com.stackroute.service;

import com.stackroute.model.Doctor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DoctorService {
    Doctor saveDoctor(Doctor doctor);
    Doctor updateDoctor(Doctor doctor,MultipartFile file)throws IOException;
    Doctor findByEmailId(String doctorEmailId);

}
