import React from "react";
import logo from '../patient.png';
import axios from "axios";
import { useNavigate, Navigate } from 'react-router-dom';


export default class Login extends React.Component {
  // navigate=useNavigate()
  constructor(props) {
    super(props);
    this.state = {
      doctor: [],
      patient: [],
      emailId: '',
      password: '',
      emailErr: '',
      passwordErr: '',
      inValidErr: '',
      emailErrMsg: '',
      userType: ''
    };
  }

  componentDidMount() {
    // axios.get("http://localhost:4000/doctor").then(res => {
    //   console.log(res.data)
    //   this.setState({
    //     doctor: res.data,
    //     inValidErr: ''
    //   })
    //   console.log(this.state.doctor)
    // })

    // axios.get("http://localhost:4000/patient").then(res => {
    //   console.log(res.data)
    //   this.setState({
    //     patient: res.data,
    //   })
    //   console.log(this.state.patient)
    // })

  }

  handleSubmit = (e) => {

    e.preventDefault();

    let validationErrors = false;
    if (this.state.emailId === "") {
      this.setState({
        emailErr: 'Please Enter EmailId'
      });
      validationErrors = true;
    }

    if (this.state.password === "") {
      this.setState({
        passwordErr: 'Please Enter Password'
      });
      validationErrors = true;
    }

    if (!!validationErrors) {
      return;
    }
    axios.get("http://localhost:8095/api/v2/usertype?userId=" + this.state.emailId)
      .then(userType => {
        console.log(userType.data)
        localStorage.setItem("userType", userType.data)

      })
    axios.post("http://localhost:8095/api/v2/login", {
      userEmail: this.state.emailId,
      password: this.state.password
      // userType: "DOCTOR"

    })
      .then((response) => {

        if (response.data) {
          console.log(response)
          localStorage.setItem("loginId", this.state.emailId)
          localStorage.setItem("isLoggedIn", response.data.loginStatus);
          localStorage.setItem("token", response.data.jwt);

          this.setState({
            userType: localStorage.getItem("userType")
          });

          //update the header component
          document.getElementById("hiddenBtn").click();

          if (localStorage.getItem("userType") == "PATIENT") {
            console.log("patient is good")
            //this.props.history.replace("/patient-profile")
            //navigate("/patient-profile")


          }
          else if (localStorage.getItem("userType") == "DOCTOR") {
            console.log("doctor is good")

            //this.props.history.replace("/doctor-profile")
            //navigate("/doctor-profile")
          }
        }
        else {
          // this.navigate("/login") 
        }
      })
    // this.handleAuthenticate()

    // this.handleUser()

  }

  handleEmail = (e) => {
    this.setState({
      emailId: e.target.value,
      emailErr: ''
    });
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
      passwordErr: ''
    });
  }

  // handleAuthenticate =() => {
  //  let authenticate = this.state.doctor.filter(name =>name.doctorEmailId===this.state.emailId && name.password===this.state.password)
  // }

  // handleUser = () =>{
  // let user = this.state.patient.filter(name=>name.patientEmailId===this.state.emailId && name.password===this.state.password)
  //   console.log(user)
  //   // return user !== [] ? 'Invalid Credentials' : user
  // }

  render() {
    return (

      <div style={{ backgroundColor: "#D3EAEA" }}>
        {this.state.userType == "PATIENT" ? (
          <Navigate to="/patient-profile" replace={true} />)
          : this.state.userType == "DOCTOR" ? <Navigate to="/doctor-profile" replace={true} /> : null}

        <section class="vh-150" >
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col col-xl-10">
                <div class="card" style={{ borderRadius: "1rem", height: '570px' }}>
                  <div class="row g-0">
                    <div class="col-md-6 col-lg-5 d-none d-md-block">
                      <img src={logo}
                        alt="login form" class="img-fluid" style={{ borderRradius: "1rem 0 0 1rem", width: '500 px', height: '500px', backgroundColor: '#936c6c' }} />
                    </div>
                    <div class="col-md-6 col-lg-7 d-flex align-items-center">
                      <div class="card-body p-4 p-lg-5 text-black">

                        <form>

                          <div class="d-flex align-items-center mb-3 pb-1">
                            <i class="fas fa-cubes fa-2x me-3" style={{ color: "#B0E0E6" }}></i>
                            <span class="h1 fw-bold mb-0" style={{ marginLeft: '90px', color: '#89CFF0' }}>Telecare</span>
                          </div>

                          <h5 class="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px", marginLeft: '120px', color: '#89CFF0' }}>Login Page</h5>

                          <div style={{ color: 'red' }}>{this.state.emailErrMsg}</div>

                          <label class="form-label" for="form2Example17" style={{ color: 'grey' }}>Email address</label>
                          <div class="form-outline mb-4">
                            <input type="email" id="form2Example17" class="form-control form-control-lg" onChange={this.handleEmail} isInvalid={!!this.state.emailErr} />
                            <div style={{ color: 'red' }}>{this.state.emailErr}</div>
                          </div>

                          <label class="form-label" for="form2Example27" style={{ color: 'grey' }}>Password</label>
                          <div class="form-outline mb-4">
                            <input type="password" id="form2Example27" class="form-control form-control-lg" onChange={this.handlePassword} isInvalid={!!this.state.passwordErr} />
                            <div style={{ color: 'red' }}>{this.state.passwordErr}</div>
                          </div>


                          <div class="pt-1 mb-4">
                            <button style={{ padding: '15px', width: '100%', borderRadius: '10px', backgroundColor: 'green' }} type="button" onClick={this.handleSubmit}>Login</button>
                          </div>

                          <p class="mb-5 pb-lg-2" style={{ color: "grey", marginTop: '10px' }}>Don't you have an account? <a href={'/doctor-register'}
                            style={{ color: "gold" }}>Register as Doctor</a> , <a href={'/patient-register'}
                              style={{ color: "gold" }}>Register as Patient</a></p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
