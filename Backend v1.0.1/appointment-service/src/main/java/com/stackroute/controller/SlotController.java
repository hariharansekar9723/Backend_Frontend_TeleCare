package com.stackroute.controller;

import com.stackroute.model.DoctorSlot;
import com.stackroute.service.DoctorSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v3/slot")
public class SlotController {

    @Autowired
    private DoctorSlotService doctorSlotService;

    @PostMapping("/")
    public ResponseEntity<DoctorSlot> createSlot(@RequestBody DoctorSlot doctorSlot)
    {
        return new ResponseEntity<>(doctorSlotService.createSlot(doctorSlot),HttpStatus.CREATED);
    }

    @PutMapping("/")
    public ResponseEntity<DoctorSlot> updateSlot(@RequestBody DoctorSlot doctorSlot)
    {
        return new ResponseEntity<>(doctorSlotService.updateSlot(doctorSlot),HttpStatus.CREATED);
    }

    @GetMapping("/{doctorEmail}")
    public ResponseEntity<List<DoctorSlot>> getAllSlotsByDoctorEmail(@PathVariable String doctorEmail)
    {
        if(doctorSlotService.getAllSlotsByDoctorEmail(doctorEmail).isEmpty())
        {
            return new ResponseEntity<>(doctorSlotService.getAllSlotsByDoctorEmail(doctorEmail),HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(doctorSlotService.getAllSlotsByDoctorEmail(doctorEmail),HttpStatus.OK);
    }


}
