import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DoctorProfile from './components/profile/DoctorProfile';
import PatientProfile from './components/profile/PatientProfile';
import DoctorList from './components/DoctorList';
import DoctorRegister from './components/DoctorRegister';
import PatientRegister from './components/PatientRegister';
import Login from './components/Login';
import { toast, ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <ToastContainer closeButton={false} position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<DoctorProfile />} /> */}
          {/* <Route path='/doctor-list' element={<DoctorList />} /> */}
           <Route path='/slot' element={<TimeSlot />} /> 

          {/* 
          <Route path='/login' element={<Login />} /> */}
          <Route exact path='/doctor-profile' element={<DoctorProfile />} />
          <Route exact path='/patient-profile' element={<PatientProfile />} />
          <Route exact path='/doctor-list' element={<DoctorList />} />
          <Route exact path='/doctor-register' element={<DoctorRegister />} />
          <Route exact path='/patient-register' element={<PatientRegister />} />
          <Route exact path='/login' element={<Login />} />
          {/* <Route path='/' element={<DoctorProfile />} />
          <Route path='/doctor-list' element={<DoctorList />} />
          <Route path='/doctor-register' element={<DoctorRegister />} />
          <Route path='/patient-register' element={<PatientRegister />} />
          <Route path='/login' element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
