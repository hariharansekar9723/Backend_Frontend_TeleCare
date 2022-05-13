import React, { useState, useEffect, Component } from 'react'
import { Button, Table,Tooltip } from 'react-bootstrap'
import Pagination from './pagination';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
// import 'react-tippy/dist/tippy.css'
// import {
//   Tooltip
// } from 'react-tippy';
const UpcomingAppointment = (props) => {
  const current = new Date();
  const date = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`;
  const todayTime = current.getHours() + ':' + current.getMinutes();
  const upcominObject = []
  props.patientData.map((data) => {
    if (date <= data.appointmentDate) {
      if ((date < data.appointmentDate) || ((date === data.appointmentDate) && (todayTime < data.appointmentEndTime))) {
        upcominObject.push(data);
      }
    }
  })

  // console.log(upcominObject);
  const [pagination, setPagination] = useState(1);
  const [active, setActive] = useState(1);
  const [limitVal, setLimitVal] = useState(12)
  const [list, setList] = useState(upcominObject)
  const [listPaginate, setListPaginate] = useState(upcominObject)



  const setLimitval = async (e) => {
    setLimitVal(Number(e.target.value));

  };
  useEffect(() => {
    if (list != [] && list.length >= 12) {
      filterData()
    }
  }, [list])


  const getPageContent = async (e) => {
    setActive(Number(e.target.value));
    setPagination(e.target.value * 1);
  };

  const preBack = async (e) => {
    setActive(Number(e));
    setPagination(e * 1);
  };


  useEffect(() => {
    if (list != [] && list.length >= 12) {
      filterData()
    }
  }, [active, pagination])

  function filterData() {

    const indexOfLastPost = active * limitVal;
    const indexOfFirstPost = indexOfLastPost - limitVal;
    const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);

    setListPaginate(currentPosts)
  }



  return (
    <div>

      <div className=" d-flex flex-column justify-content-center align-items-end  w-100 ">
        <Pagination
          totalPosts={upcominObject.length}
          paginate={getPageContent}
          postsPerPage={limitVal}
          active={active}
          page={pagination}
          preBack={preBack}
        />
      </div>


      <section className="text-dark ">

        <Table hover responsive className='mt-3' style={{ backgroundColor: "#F5F9F9" }}>
          <thead>

            <tr>
              <th>Appointment No.</th>
              <th>{localStorage.getItem('userType') == 'DOCTOR' ? 'PatientEmail' : 'DoctorEmail'}</th>
              <th>Issue Brief</th>
              <th>Call</th>
              <th>Chat</th>
            </tr>

          </thead>
          <tbody>
            {
              listPaginate.map((data, index) => {

                if (localStorage.getItem('userType') === 'DOCTOR') {
                  return (

                    <tr key={index}>
                      <td>{data.appointmentId}</td>
                      <td>{data.patientEmail}</td>
                      <td>{data.patientIssue}</td>
                      <OverlayTrigger key='auto' placement='bottom-start'
                        overlay={
                          <Tooltip >
                            Click to join vidieo Call
                          </Tooltip>
                        }
                      >
                      
                        <td><Button variant="outline-success" data-tip data-for="registerTip">Join Call</Button></td>
                       
                      </OverlayTrigger>
                      <OverlayTrigger key='auto' placement='bottom-start'
                        overlay={
                          <Tooltip >
                            Click for Chat
                          </Tooltip>
                        }
                      >
                      <td><Button variant="outline-success">Join Chat</Button></td>

                      </OverlayTrigger>

                    </tr>
                  )
                } else {
                  return (
                    <tr key={index}>
                      <td>{data.appointmentId}</td>
                      <td>{data.doctorEmail}</td>
                      <td>{data.patientIssue}</td>
                      <td><Button variant="outline-success">Join Call</Button></td>
                      <td><Button variant="outline-success">Join Chat</Button></td>
                    </tr>
                  )
                }
              })
            }

          </tbody>
        </Table>
      </section>
    </div>
  )
}

export default UpcomingAppointment
