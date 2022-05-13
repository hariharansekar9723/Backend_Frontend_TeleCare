package com.stackroute.service;

import com.stackroute.model.Patient;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PatientService {
    Patient savePatient(Patient patient);
    Patient updatePatient(Patient patient,MultipartFile file)throws IOException;
    Patient findByEmailId(String patientEmailId);
}
