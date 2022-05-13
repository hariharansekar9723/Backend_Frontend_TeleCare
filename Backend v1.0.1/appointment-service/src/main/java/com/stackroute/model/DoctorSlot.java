package com.stackroute.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Document(collection = "doctorslot")
public class DoctorSlot {

    @Id
    private Integer slotId;
    private String doctorEmail;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate slotDate;
    @JsonFormat(pattern = "hh:mm:ss a")
    private LocalTime slotStartTime;
    @JsonFormat(pattern = "hh:mm:ss a")
    private LocalTime slotEndTime;
    private Boolean slotAvailable;

}
