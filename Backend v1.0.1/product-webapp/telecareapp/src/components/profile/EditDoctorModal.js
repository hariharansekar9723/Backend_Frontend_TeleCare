import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Image, Card, Table, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import UserService from '../../Service/UserService';

const EditDoctorModal = (props) => {
  const { handleShow, handleClose, show, setShow, doctorData } = props;

  const [formData, setFormData] = useState({
    doctorEmailId:localStorage.getItem("loginId"),
    doctorName: "",
    contactNo: "",
    dob: "",
    gender: "",
    experience: "",
    specialization: "",
    city: ""
  });

  const { doctorName, contactNo, dob, gender, experience, specialization, city } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const updateDoctorProfile = () => {
    let data=new FormData();
    let file=new File([],"");
    data.append("doctor",JSON.stringify(formData));
    data.append("file",file)
    UserService.updateUserData("/api/v1/doctor/", data)
      .then((response) => {
        handleClose();
        alert("successfull updation");

      })
      .catch(err => console.log(err));

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData)
    updateDoctorProfile()
  };

  useEffect(() => {
    setFormData({
      doctorEmailId:localStorage.getItem("loginId"),
      doctorName: doctorData.doctorName,
      contactNo: doctorData.contactNo,
      dob: doctorData.dob,
      gender: doctorData.gender,
      experience: doctorData.experience,
      specialization: doctorData.specialization,
      city: doctorData.city
    })
  }, [doctorData])


  return (
    <>
      <Modal show={show} onHide={handleClose} scrollable>
        <Modal.Header closeButton style={{ backgroundColor: '#F5F9F9' }}>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#F5F9F9' }}>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group className="mb-3" >
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="eg. john doe"
                autoFocus
                name='doctorName'
                value={doctorName}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={dob}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Select className="mb-3" name='gender' onChange={(e) => onChange(e)}>
              <option>Select Gender</option>
              <option value="MALE" >Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </Form.Select>

            {/* <Form.Select className="mb-3" name='gender' onChange={(e) => onChange(e)}>
              <option>Select Gender</option>
              {gender.toLowerCase() === "male" ? <option value="male" selected>Male</option> : <option value="male" >Male</option>}
              {gender.toLowerCase() === "female" ? <option value="female" selected>Female</option> : <option value="female" >Female</option>}
              {gender.toLowerCase() === "other" ? <option value="other" selected>Other</option> : <option value="other" >Female</option>}
            </Form.Select> */}

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Profile Pic</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Contact No.</Form.Label>
              <Form.Control
                type="number"
                placeholder="eg. 9999XXXXXX"
                autoFocus
                name='contactNo'
                value={contactNo}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                placeholder="eg . ENT"
                autoFocus
                name='specialization'
                value={specialization}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="text"
                placeholder="eg . 3 Years"
                autoFocus
                name='experience'
                value={experience}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="eg . Delhi"
                autoFocus
                name='city'
                value={city}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>

      </Modal>
    </>
  );
}

export default EditDoctorModal