package com.stackroute.service;

import com.stackroute.model.Doctor;
import com.stackroute.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;
    @Override
    public Doctor saveDoctor(Doctor doctor) {
       if (doctorRepository.findById(doctor.getDoctorEmailId()).isPresent()){
            throw new RuntimeException("Already Exist");
       }
       return doctorRepository.save(doctor);

    }

    @Override

    public Doctor updateDoctor (Doctor doctor,MultipartFile file) throws IOException {
        if (doctorRepository.findById(doctor.getDoctorEmailId()).isEmpty()){
            throw new RuntimeException("Doctor profile doesn't exist");
        }
        doctor.setDoctorImage(file.getBytes());
        return doctorRepository.save(doctor);
    }

     @Override
      public Doctor findByEmailId(String doctorEmailId ){
        Doctor doctor = doctorRepository.findById(doctorEmailId).orElseThrow(()->{
            throw new UsernameNotFoundException("User ID not Found");
        });
        return doctor;
     }
}
