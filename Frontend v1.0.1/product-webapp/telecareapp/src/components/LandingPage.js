import React from 'react';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import DocImg from '../assets/doctor2.svg';

const Landing = () => {
  return (
    <>

      <section className="text-dark p-5 p-lg-0  pt-lg-5 text-center text-sm-start" >
        <Container>
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1 className='display-3'>Find local <span className="text-warning">Doctors</span></h1>
              <p className="lead my-4">
                One Place Solution For All Your Health Needs
              </p>

              <Link to="/login" className="btn btn-lg" style={{ backgroundColor: "#E1A697" }}>Explore</Link>

            </div>
            <Image src={DocImg} fluid className='w-50 d-none d-sm-block' alt='haeder-img' />
          </div>
        </Container>
      </section>

      <section className="p-5 mt-5" id="learn" style={{ backgroundColor: "#F0F6F6" }}>
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md">
              <Image src="https://cdn.pixabay.com/photo/2017/01/29/21/16/nurse-2019420_960_720.jpg" fluid alt='doc-img' />
            </div>
            <div className="col-md p-5">
              <h2>Doctor Can Register</h2>
              <p className="lead">Want to reach to new patients?</p>
              {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis illo culpa dolore obcaecati molestiae libero
                dignissimos sit, consequuntur facilis aspernatur quaerat saepe. Minima commodi optio sapiente consectetur
                quibusdam hic voluptate?
              </p> */}
              <ul>
                <li >Reach patients in your area looking for a new provider</li>

              </ul>
              <Link to="/doctor-register" className="btn btn-light mt-3" style={{ backgroundColor: "#E1A697" }}>Register</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="p-3 text-center position-relative" style={{ backgroundColor: "#D8D6E6" }}>
        <div className="container">
          <p className="lead">
            Copyright &copy; 2022 Telecare
          </p>
        </div>
      </footer>
    </>
  )
}

export default Landing;