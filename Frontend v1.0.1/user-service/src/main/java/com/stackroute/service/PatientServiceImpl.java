package com.stackroute.service;

import com.stackroute.model.Patient;
import com.stackroute.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;
    @Override
    public Patient savePatient(Patient patient) {
        if (patientRepository.findById(patient.getPatientEmailId()).isPresent()){
            throw new RuntimeException("Already Exist");
        }
        return patientRepository.save(patient);

    }
    @Override
    public Patient updatePatient (Patient patient, MultipartFile file) throws IOException {
        if (patientRepository.findById(patient.getPatientEmailId()).isEmpty()){
            throw new RuntimeException("DPatient profile doesn't exist");
        }
        patient.setPatientImage(file.getBytes());
        return patientRepository.save(patient);
    }

    @Override
    public Patient findByEmailId(String patientEmailId ){
        Patient patient = patientRepository.findById(patientEmailId).orElseThrow(()->{
            throw new UsernameNotFoundException("User ID not Found");
        });
        return patient;
    }
}
