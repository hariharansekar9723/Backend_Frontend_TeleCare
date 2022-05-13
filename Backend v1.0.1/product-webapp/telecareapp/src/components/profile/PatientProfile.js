import React, { useEffect, useState } from 'react'
import { Button, Image, Card, Table, Container, Row, Col, Modal, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import EditPatientModal from './EditPatientModal';
import axios from 'axios';
import UserService from '../../Service/UserService';

const PatientProfile = () => {

  const [showEdit, setShowEdit] = useState(false);
  const [patientData, setPatientData] = useState({});
  const handleEditClose = () => {
    getPatientDetails();
    setShowEdit(false);
  }
  const handleEditShow = () => setShowEdit(true);

  const getPatientDetails = () => {
    UserService.getUserData("/api/v1/patient/" + localStorage.getItem("loginId"))
    .then(response => {
      console.log(response.data)
      setPatientData(response.data)
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    getPatientDetails();
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
              {Object.keys(patientData).length === 0 ? <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span></Spinner> : <Col xs={12} md={9} >
                <h3 className="text-center d-sm-block pt-4">Personal Details </h3>
                <Card.Title className='px-5 d-flex flex-row-reverse'>
                  <Button variant="secondary" size="sm" onClick={handleEditShow}>Edit </Button>
                </Card.Title>
                <div className="d-md-flex justify-content-between px-5 py-3">
                  <div>
                    <Card.Text >
                      <span className="fw-bold"> Full Name :</span> {patientData.patientName}
                    </Card.Text>
                    <Card.Text>
                      <span className="fw-bold">DOB :</span> {patientData.dob}
                    </Card.Text>
                    <Card.Text>
                      <span className="fw-bold">Email :</span> {patientData.patientEmailId}
                    </Card.Text>
                    <Card.Text>
                    </Card.Text>
                  </div>
                  <div>
                    <Card.Text>
                      <span className="fw-bold">Gender :</span> {patientData.gender}
                    </Card.Text>
                    <Card.Text>
                      <span className="fw-bold">City :</span> {patientData.city}
                    </Card.Text>
                    <Card.Text>
                      <span className="fw-bold">Contact Number :</span> {patientData.contactNo}
                    </Card.Text>
                  </div>
                </div>
              </Col>}



            </Row>
          </Card>
        </Container>
      </section>

      {/* Appointment section */}
      <section className="text-dark py-5">
        <Container className="px-5 py-3" style={{ backgroundColor: "#F5F9F9" }}>
          <h4 className='text-center'>Upcoming Appointments</h4>

          <Table hover responsive className='mt-3'>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Doctor's Name</th>
                <th>Problem</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>27/03/2021</td>
                <td>Dr. Mukesh Talwar</td>
                <td>Headache with minor fever</td>
                <td><Button variant="outline-danger">Join Call</Button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>27/03/2021</td>
                <td>Dr. Ritu Singh</td>
                <td>Genral Chcekup</td>
                <td><Button variant="outline-danger">Join Call</Button></td>
              </tr>
              <tr>
                <td>3</td>
                <td>27/03/2021</td>
                <td>Dr. Joshep White</td>
                <td>Feeling Dizzy and having diarrhea</td>
                <td><Button variant="outline-danger">Join Call</Button></td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </section>

      {/* Edit Profile modal */}
      <EditPatientModal show={showEdit} setShow={setShowEdit} handleClose={handleEditClose} handleShow={handleEditShow} patientData={patientData} />

      {/* Schedule Modal */}
    </div>
  )
}

export default PatientProfile