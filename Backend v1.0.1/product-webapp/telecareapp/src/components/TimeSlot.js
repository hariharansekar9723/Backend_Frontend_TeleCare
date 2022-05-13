import React from "react";
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import axios from "axios";
import './TimeSlot.css'
import Modal from 'react-bootstrap/Modal'

class TimeSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue1: '',
      inputValue2: '',
      inputValue3: ''
    };

  }

  updateInputValue1 = (evt) => {
    this.setState({
      inputValue1: evt.target.value
    });
  }
  updateInputValue2 = (evt) => {
    this.setState({
      inputValue2: evt.target.value
    });
  }
  updateInputValue3 = (evt) => {
    this.setState({
      inputValue3: evt.target.value
    });
  }

  createStarEndTime = () => {

    const slotObject = {
      "doctorEmailId": "",
      "slotDate": this.state.inputValue1,
      "slotStartTime": this.state.inputValue2,
      "slotEndTime": this.state.inputValue3,
      "slotAvailable": true
    }
    console.log(this.state.inputValue1)
    axios.post('http://localhost:3001/doctorSlot', slotObject);
    return 0
  };

  render() {

    return (
      <div className="divBox">
        <Modal.Dialog className="main">
          <Modal.Header style={{ backgroundColor: '#F2F2F2' }} closeButton>
            <Modal.Title >Create Appointment slot</Modal.Title>
          </Modal.Header>
          <Modal.Body className="main">
            <Card.Text style={{ textAlign: 'left' }}>Appointment Date: <input type="date" placeholder='Select date' value={this.state.inputValue1} onChange={evt => this.updateInputValue1(evt)} /></Card.Text>
            <Card.Text style={{ textAlign: 'left' }}> <span className="padingStartT">Start Time :</span> <input type="time" value={this.state.inputValue2} onChange={evt => this.updateInputValue2(evt)} />
              <span className="padingStartT padingEndT">End Time :</span><input type="time" value={this.state.inputValue3} onChange={evt => this.updateInputValue3(evt)} /></Card.Text>
            <Button variant="primary" onClick={this.createStarEndTime}>Create Slot</Button>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#F2F2F2' }}>
            <Button variant="secondary">Close</Button>
            {/* <Button variant="primary">Save changes</Button> */}
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

export default TimeSlot