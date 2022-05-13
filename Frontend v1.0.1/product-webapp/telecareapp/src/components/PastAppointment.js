import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import Pagination from './pagination';

const PastAppointment = (props) => {
  const current = new Date();
  const date = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`;

  const todayTime = current.getHours() + ':' + current.getMinutes();
  const pastObeject = []
  props.patientData.map((data) => {
    if (date >= data.appointmentDate) {
      if ((date > data.appointmentDate) || ((date === data.appointmentDate) && (todayTime >= data.appointmentEndTime))) {
        pastObeject.push(data)
      }
    }
  })
  const [pagination, setPagination] = useState(1);
  const [active, setActive] = useState(1);
  const [limitVal, setLimitVal] = useState(12)
  const [list, setList] = useState(pastObeject)
  const [listPaginate, setListPaginate] = useState(pastObeject)



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
          totalPosts={pastObeject.length}
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
                      <td><Button variant="outline-success">Join Chat</Button></td>

                    </tr>
                  )
                } else {
                  return (
                    <tr key={index}>
                      <td>{data.appointmentId}</td>
                      <td>{data.doctorEmail}</td>
                      <td>{data.patientIssue}</td>
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

export default PastAppointment
