import React from "react";
import logo from '../doctorappointment.png';
import axios from "axios";

export default class DoctorRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorEmailId: '',
      password: '',
      doctorEmailErr: '',
      passwordErr: '',
      confirmPassword: '',
      passwordConfirmErr: '',
      passwordErrMsg: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = false;
    if (this.state.doctorEmailId === "") {
      this.setState({
        doctorEmailErr: 'Please Enter EmailId'
      });
      validationErrors = true;
    }

    if (this.state.password === "") {
      this.setState({
        passwordErr: 'Please Enter Password'
      });
      validationErrors = true;
    }
    if (this.state.confirmPassword === '') {
      this.setState({
        passwordErrMsg: 'Please Confirm your password'
      })
    }
    if (this.state.confirmPassword !== this.state.password) {
      this.setState({
        passwordConfirmErr: 'Password mismatched'
      });
      validationErrors = true;
    }

    if (!!validationErrors) {
      return;
    }
    axios.post("http://localhost:8095/api/v2/createuser", {
      userEmail: this.state.doctorEmailId,
      password: this.state.password,
      userType: "DOCTOR"

    }).then((response)=>{console.log(response)})
    axios.post('http://localhost:8080/api/v1/doctor', {
      // id: "40",
      doctorEmailId: this.state.doctorEmailId,
      password: this.state.password,
      doctorName: "",
      contactNo: "",
      dob: "",
      // gender: "",
      experience: "",
      specialization: "",
      city: ""
    })
      .then(function (response) {
        console.log('register response', response);

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  handleDoctorEmail = (e) => {
    this.setState({
      doctorEmailId: e.target.value,
      doctorEmailErr: ''
    });
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
      passwordErr: ''
    });
  }


  handleConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
      passwordConfirmErr: '',
      passwordErrMsg: ''
    });
  }

  render() {
    return (

      <section class="vh-150" style={{ backgroundColor: "#D3EAEA" }}>
        <div class="container py-5 h-150">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
              <div class="card" style={{ borderRadius: "1rem", height: '680px' }}>
                <div class="row g-0">
                  <div class="col-md-6 col-lg-5 d-none d-md-block">
                    <img src={logo}
                      alt="login form" class="img-fluid" style={{ borderRradius: "1rem 0 0 1rem", width: '500 px', height: '590px' }} />
                  </div>
                  <div class="col-md-6 col-lg-7 d-flex align-items-center">
                    <div class="card-body p-4 p-lg-5 text-black">

                      <form >
                        <div class="d-flex align-items-center mb-3 pb-1">
                          <i class="fas fa-cubes fa-2x me-3" style={{ color: "#B0E0E6" }}></i>
                          <span class="h1 fw-bold mb-0" style={{ marginLeft: '90px', color: '#89CFF0' }}>Telecare</span>
                        </div>

                        <h5 class="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px", marginLeft: '90px', color: '#89CFF0' }}>Doctor Register Page</h5>

                        <label class="form-label" for="form2Example17" style={{ color: 'grey' }}>Email address</label>
                        <div class="form-outline mb-4">
                          <input type="email" id="form2Example17" class="form-control form-control-lg" onChange={this.handleDoctorEmail} isInvalid={!!this.state.doctorEmailErr} />
                          <div style={{ color: 'red' }}>{this.state.doctorEmailErr}</div>
                        </div>

                        <label class="form-label" for="form2Example27" style={{ color: 'grey' }}>Password</label>
                        <div class="form-outline mb-4">
                          <input type="password" id="form2Example27" class="form-control form-control-lg" onChange={this.handlePassword} isInvalid={!!this.state.passwordErr} />
                          <div style={{ color: 'red' }}>{this.state.passwordErr}</div>
                        </div>

                        <label class="form-label" for="form2Example27" style={{ color: 'grey' }}>Confirm Password</label>
                        <div class="form-outline mb-4">
                          <input type="password" id="form2Example28" class="form-control form-control-lg" onChange={this.handleConfirmPassword} isInvalid={!!this.state.passwordConfirmErr} />
                          <div style={{ color: 'red' }}>{this.state.passwordConfirmErr}</div>
                          <div style={{ color: 'red' }}>{this.state.passwordErrMsg}</div>
                        </div>

                        <div class="pt-1 mb-4">
                          <button style={{ padding: '15px', width: '100%', borderRadius: '10px', backgroundColor: 'green' }} type="button" onClick={this.handleSubmit}>Register</button>
                        </div>

                        <p class="mb-5 pb-lg-2" style={{ color: "grey" }}>Already have an account? <a href={'/login'}
                          style={{ color: "gold" }}>Login Here</a></p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
