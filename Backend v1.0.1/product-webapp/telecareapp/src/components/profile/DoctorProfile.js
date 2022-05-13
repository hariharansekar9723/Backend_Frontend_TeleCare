import React, { useEffect, useState } from 'react'
import { Button, Image, Card, Table, Container, Row, Col, Modal, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import EditDoctorModal from './EditDoctorModal';
import axios from 'axios';
import UserService from '../../Service/UserService';


const DoctorProfile = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [doctorData, setDoctorData] = useState({});
  const handleEditClose = () => {
    setShowEdit(false);
    getDoctorDetails();
  }
  const handleEditShow = () => setShowEdit(true);

  const getDoctorDetails = () => {
    // UserService.getUserData("/doctor/34")
    UserService.getUserData("/api/v1/doctor/" + localStorage.getItem("loginId"))
    .then(response => {
      console.log(response.data)
      setDoctorData(response.data)
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    getDoctorDetails();
  }, [])

  return (
    <div classNamename='dashboard-main py-5' style={{ backgroundColor: "#CEE1E1" }}>

      {/* profile section */}
      <section className="text-dark pt-5" >
        <Container>
          <h1 className="mb-3">Profile</h1>
          {/* Profile section */}
          <Card style={{ backgroundColor: "#F5F9F9" }}>
            <Row>
              <Col xs={12} md={3} >
                <Image src="https://cdn.pixabay.com/photo/2019/12/04/09/30/man-4672229_960_720.jpg" alt='user-pic' fluid rounded />
              </Col>
              {Object.keys(doctorData).length === 0 ? <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span></Spinner> : <Col xs={12} md={9} >
                <h3 className="text-center d-sm-block pt-4">Personal Details </h3>
                <Card.Title className='px-5 d-flex flex-row-reverse'>
                  <Button variant="secondary" size="sm" onClick={handleEditShow}>Edit </Button>
                </Card.Title>
                <div className="d-md-flex justify-content-between px-5 py-3">
                  <div>
                    <Card.Text >
                      <span className="fw-bold"> Full Name :</span> {doctorData.doctorName}
                    </Card.Text>
                    <Card.Text>
                      <span className="fw-bold">DOB :</span> {doctorData.dob}
                    </Card.Text>
                    <Card.Text>
                      <span className="fw-bold">Email :</span> {doctorData.doctorEmailId}
                    </Card.Text>
                    <Card.Text>
                      <span className="fw-bold">Specialization :</span> {doctorData.specialization}
                    </Card.Text>
                    <Card.Text>
                      <span className="fw-bold">Gender :</span> {doctorData.gender}
                    </Card.Text>
                    <Card.Text>
                    </Card.Text>
                  </div>
                  <div>
                    <Card.Text>
                      <span className="fw-bold">Experience :</span> {doctorData.experience}
                    </Card.Text>
                    <Card.Text>
                      <span className="fw-bold">City :</span> {doctorData.city}
                    </Card.Text>
                    <Card.Text>
                      <span className="fw-bold">Contact Number :</span> {doctorData.contactNo}
                    </Card.Text>
                  </div>
                </div>
              </Col>}
            </Row>
          </Card>
        </Container>
      </section>

      {/* Cards Section */}
      {/* <section className="text-dark py-5" >
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <Card style={{ backgroundColor: "#F5F9F9" }}>
                <Card.Body>
                  <Card.Text className='text-dark'>Total Patients</Card.Text>
                  <Card.Text className='text-success'>
                    <span className='h1'>2222</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6}>
              <Card style={{ backgroundColor: "#F5F9F9" }}>
                <Card.Body >
                  <Card.Text className='text-dark'>Overall Stats</Card.Text>
                  <Card.Text>
                    Men:<span className='h1 text-success'> 30%</span>
                    <span className='px-3'>Women:<span className='h1 text-success'> 70%</span></span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Container>
      </section> */}

      {/* Appointment section */}
      <section className="text-dark py-5">
        <Container className="px-5 py-3" style={{ backgroundColor: "#F5F9F9" }}>
          <Row>
            <Col md={4}><h4>Todays's Appointments</h4></Col>
            <Col md={{ span: 4, offset: 4 }} className="d-flex flex-row-reverse">
              <Button className='text-dark border-0' size="sm" style={{ backgroundColor: "#E1A697" }}>Schedule</Button>
            </Col>
          </Row>

          <Table hover responsive className='mt-3'>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Problem</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>27/03/2021</td>
                <td>Headache with minor fever</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>27/03/2021</td>
                <td>Headache with minor fever</td>
              </tr>
              <tr>
                <td>3</td>
                <td >Larry the Bird</td>
                <td>27/03/2021</td>
                <td>Headache with minor fever</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </section>

      {/* Edit Profile modal */}
      <EditDoctorModal show={showEdit} setShow={setShowEdit} handleClose={handleEditClose} handleShow={handleEditShow} doctorData={doctorData} />

      {/* Schedule Modal */}
    </div>
  )
}

export default DoctorProfile