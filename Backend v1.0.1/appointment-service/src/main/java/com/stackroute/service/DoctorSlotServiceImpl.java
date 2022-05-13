package com.stackroute.service;

import com.stackroute.exception.SlotAlreadyCreatedException;
import com.stackroute.exception.SlotCreationConflictException;
import com.stackroute.exception.SlotUpdateConflictException;
import com.stackroute.exception.UnableToUpdateSlotException;
import com.stackroute.model.DoctorSlot;
import com.stackroute.repository.DoctorSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorSlotServiceImpl implements DoctorSlotService{

    @Autowired
    private DoctorSlotRepository slotRepository;

    @Override
    public DoctorSlot createSlot(DoctorSlot doctorSlot) {
        Optional<DoctorSlot> slotFinder= slotRepository.findById(doctorSlot.getSlotId());
        if(!slotFinder.isPresent())
        {
            List<DoctorSlot> slotList= slotRepository.findAllByDoctorEmailAndSlotDate(doctorSlot.getDoctorEmail()
                    ,doctorSlot.getSlotDate());
            for (DoctorSlot slot:slotList)
            {
                if((doctorSlot.getSlotStartTime().isAfter(slot.getSlotStartTime()) &&
                        doctorSlot.getSlotStartTime().isBefore(slot.getSlotEndTime())) ||
                        (doctorSlot.getSlotEndTime().isAfter(slot.getSlotStartTime()) &&
                                doctorSlot.getSlotEndTime().isBefore(slot.getSlotEndTime())))
                {
                    throw new SlotCreationConflictException("Given slot timings are conflicting with already existing ones" +
                            "...Please check and try again");
                }
            }
            return slotRepository.save(doctorSlot);

        }
        throw new SlotAlreadyCreatedException("Slot is already created with same slot id");

    }

    @Override
    public DoctorSlot updateSlot(DoctorSlot doctorSlot) {
        Optional<DoctorSlot> slotFinder= slotRepository.findById(doctorSlot.getSlotId());
        if(slotFinder.isPresent() && slotFinder.get().getSlotAvailable()==true)
        {
            List<DoctorSlot> slotList= slotRepository.findAllByDoctorEmailAndSlotDate(doctorSlot.getDoctorEmail()
                    ,doctorSlot.getSlotDate());
            for (DoctorSlot slot:slotList)
            {
                if((doctorSlot.getSlotStartTime().isAfter(slot.getSlotStartTime()) &&
                        doctorSlot.getSlotStartTime().isBefore(slot.getSlotEndTime())) ||
                        (doctorSlot.getSlotEndTime().isAfter(slot.getSlotStartTime()) &&
                                doctorSlot.getSlotEndTime().isBefore(slot.getSlotEndTime())))
                {
                    throw new SlotUpdateConflictException("Given slot timings are conflicting with already existing ones" +
                            "...Please check and try again");
                }
            }
            return slotRepository.save(doctorSlot);
        }
        else
        {
            throw new UnableToUpdateSlotException("Slot does not exists or already booked...");
        }
    }

    @Override
    public List<DoctorSlot> getAllSlotsByDoctorEmail(String doctorEmail) {

        List<DoctorSlot> slotList=slotRepository.findAllByDoctorEmail(doctorEmail);
        return slotList;
    }
}
