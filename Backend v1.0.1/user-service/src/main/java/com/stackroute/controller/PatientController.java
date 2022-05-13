package com.stackroute.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.model.Patient;
import com.stackroute.service.PatientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {
    ResponseEntity responseEntity;
    @Autowired
    private PatientService patientService;


    @PostMapping("patient")
    public ResponseEntity <Patient> register (@RequestBody Patient patient){
        responseEntity= new ResponseEntity(patientService.savePatient(patient),HttpStatus.CREATED);
        return responseEntity;
    }
    @PatchMapping("patient")
    public ResponseEntity <Patient> update (@RequestParam String patient, @RequestParam MultipartFile file) throws IOException{
        responseEntity= new ResponseEntity(patientService.updatePatient(new ObjectMapper().readValue(patient, Patient.class),file),HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("patient/{patientEmailId}")
    public ResponseEntity <Patient> userInfo(@PathVariable String patientEmailId){
        responseEntity=new ResponseEntity<>(patientService.findByEmailId(patientEmailId), HttpStatus.OK);
        return responseEntity;
    }
}
