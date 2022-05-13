package com.stackroute.service;

import com.stackroute.exception.AppointmentAlreadyCreatedException;
import com.stackroute.exception.SlotNotExistsException;
import com.stackroute.model.BookAppointment;
import com.stackroute.model.DoctorSlot;
import com.stackroute.repository.BookAppointmentRepository;
import com.stackroute.repository.DoctorSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookAppointmentServiceImpl implements BookAppointmentService {

    @Autowired
    private BookAppointmentRepository appointmentRepository;

    @Autowired
    private DoctorSlotRepository doctorSlotRepository;

    @Override
    public BookAppointment createAppointment(BookAppointment bookAppointment) {

        Optional<BookAppointment> appointmentFinder=appointmentRepository.findById(bookAppointment.getAppointmentId());
        if(appointmentFinder.isPresent())
        {
            throw new AppointmentAlreadyCreatedException("Appointment already exists with the same Id...");
        }
        else
        {
//            LocalDateTime startTime=bookAppointment.getAppointmentStartTime();
//            Duration addIst=Duration.ofMinutes(330);
//            LocalDateTime startTimeIst=startTime.plus(addIst);
//            bookAppointment.setAppointmentStartTime(bookAppointment.getAppointmentStartTime().plus(Duration.ofMinutes(330)));
//            bookAppointment.setAppointmentEndTime(bookAppointment.getAppointmentEndTime().plus(Duration.ofMinutes(330)));
            Optional<DoctorSlot> bookedSlot= doctorSlotRepository.findById(bookAppointment.getSlotId());
            if(bookedSlot.isPresent())
            {
                bookedSlot.get().setSlotAvailable(false);
                doctorSlotRepository.save(bookedSlot.get());
                return appointmentRepository.save(bookAppointment);
            }
            else {
                throw new SlotNotExistsException("Slot does not exists...");
            }

        }
    }

    @Override
    public List<BookAppointment> getAllAppointmentsByDoctorEmail(String doctorEmail) {
        return appointmentRepository.findAllByDoctorEmail(doctorEmail);
    }

    @Override
    public List<BookAppointment> getAllAppointmentsByPatientEmail(String patientEmail) {
        return appointmentRepository.findAllByPatientEmail(patientEmail);
    }
}
