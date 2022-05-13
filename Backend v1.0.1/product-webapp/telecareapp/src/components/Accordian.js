import React, { useState } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import ApiService from "../Service/ApiService";
import './doctor_list.css'


const Accordian = (props) => {

  const [expanded, setExpanded] = useState(``)
  const [date, SetDate] = useState(moment().format('DD/MM/YYYY'))
  const [newdate, SetnewDate] = useState(moment().format('YYYY-MM-DD'))
  const [slot, setSlot] = useState([])
  const [takeSlot, setTakeSlot] = useState({})
  const [currSlot, setCurrSlot] = useState()

  const onChangeDate = (x) => {
    const Date1 = moment(new Date(x.target.value)).format('YYYY-MM-DD');
    SetnewDate(Date1);
    const newDate = moment(new Date(x.target.value)).format('DD/MM/YYYY');
    SetDate(newDate);
    filterSlots()
  };
  

  function filterSlots() {
    console.log(filteredSlots)
    let filteredSlots = props.slot.filter(x => x.doctorEmail == props.list.doctorEmailId).filter(x => x.slotDate == date).filter(x => x.slotAvailable == "true")
    setSlot(filteredSlots)
    console.log(filteredSlots)
  }

  function bookAppointement() {
    let slotObj = {
      "id": Math.random().toString(36).slice(2),
      "appointmentId": 1,
      "patientEmail": "chrwin@me.com",
      "doctorEmail": takeSlot.doctorEmail,
      "patientIssue": "Shortness of breath",
      "slotId": takeSlot.slotId,
      "appointmentDate": takeSlot.slotDate,
      "appointmentStartTime": takeSlot.slotStartTime,
      "appointmentEndTime": takeSlot.slotEndTime,
      "appointmentStatus": "true"
    }

    ApiService.postData('/Book_appointment', slotObj).then(res => {
      console.log(res)
      ApiService.tostSuccess(`appointement booked`)
      updateSlotStatus(Number(takeSlot.slotId))
    }, (err) => {
      ApiService.tostErr('Error occured')
    })

  }

  function updateSlotStatus(id) {
    let obj = {
      "slotAvailable": "false"
    }
    ApiService.updateData(`/slots/${id}`, obj).then(res => {
      console.log(res.data)
      props.updateList()
      setSlot(slot.splice(currSlot, 1))
      filterSlots()
    })
  }



  return (
    <>
      <div className="accordion col-12 col-md-6 col-lg-4 padding" id="accordionExample">
        <div className="accordion-item">
          <Card id={`heading${props.index}`}>
            <Card.Img variant="top" src="../../../dummydoctor.jpg" height="270px" width="100%" />
            <Card.Body>
              <div className="flex-column w-100 d-flex justify-content-center align-items-center">
                <div className="row w-100 h-25 d-flex justify-content-center align-items-center">
                  <div className="w-50 fs-6">{props.list.doctorName}</div>
                  <div className="w-50 fs-6">{props.list.doctorEmailId}</div>
                </div>
                <div className="row w-100 h-25 d-flex justify-content-center align-items-center">
                  <div className="w-50 fs-6">{`${props.list.experience} yrs exp`}</div>
                  <div className="w-50 fs-6">{props.list.specialization}</div>
                </div>
              </div>
              <button className={expanded == `collapse${props.index}` ? 'accordion-button p-0' : 'accordion-button collapsed p-0'} onClick={() => setExpanded(`collapse${props.index}`)} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${props.index}`} aria-expanded={expanded == `collapse${props.index}`} aria-controls={`collapse${props.index}`}>
              </button>
            </Card.Body>
          </Card>
          <div id={`collapse${props.index}`} className={expanded == `collapse${props.index}` ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'} aria-labelledby={`heading${props.index}`} data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="row m-auto">
                <div className="col-12  ">
                  <input type="date" value={newdate} onChange={onChangeDate} />
                </div>
                <div className="row m-auto slotCont mt-2">
                  {
                    slot.map((slot, i) => <div className="col-12 col-lg-6 col-lg-4 mt-1">
                      <button className="btn btn-secondary slotBtn w-100 d-flex justify-content-around align-items-center" onClick={() => { setTakeSlot(slot); setCurrSlot(i) }} >{slot.slotStartTime} - {slot.slotEndTime} {i === currSlot && <i class="fa fa-check" aria-hidden="true"></i>} </button>
                    </div>)
                  }
                </div>
                {slot.length != 0 && <div className="col-12 mt-2">
                  <button className="btn btn-secondary w-100 bookBtn " onClick={() => bookAppointement()} >Book Appoinment</button>
                </div>}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default Accordian