import React, { useState } from 'react';
import logo from "../../assets/Logo/brand-logo.png";
import "../Login/login.css";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    try {
      const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/UserAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status) {
        const intendedRole = location.state?.role;

        if (intendedRole !== data.role) {
          setLoginError(`Please sign in through ${data.role} portal.`);
        } else {
          const sessionResponse = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/createSession', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: data.userId }),
          });
          // eslint-disable-next-line no-undef

          const sessionData = await sessionResponse.json();

          if (sessionData.status) {
            sessionStorage.setItem('userId', data.userId);
            sessionStorage.setItem('userName', data.name);
            sessionStorage.setItem('role', data.role);
            sessionStorage.setItem('token', sessionData.token);
            navigate('/home');
          } else {
            setLoginError('Session creation failed. Please try again.');
          }
        }
      } else {
        setLoginError('Incorrect email or password. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setLoginError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <section className='loginsection'>
        <Container className='loginContainer'>
          <Row className='alertRow'>
            <Col className="alertCol" lg={12}>
              {loginError && <Alert className='loginAlert' variant="danger" onClose={() => setLoginError('')} dismissible>{loginError}</Alert>}
            </Col>
          </Row>
          <Row>
            <Col sm={12} className='LoginCol12'>
              <Form className='loginform' onSubmit={handleLogin}>
                <Row>
                  <Col sm={12} className='loginbrand'>
                    <img src={logo} className='loginLogo' alt="logo-img"></img>
                    <p className='loginp'>Dineflow</p>
                  </Col>
                </Row>
                <h4 className="loginh4">Sign in</h4>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Email'
                  className='logininput'
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                  type="password"
                  id="password"
                  name="password"
                  placeholder='Password'
                  className='logininput'
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Row className="chckbox">
                  <Col sm={3} className="chck">
                    <input type="checkbox"/>
                  </Col>
                  <Col sm={9} className="chckboxlabel">
                    <Form.Label>
                      Remember me
                    </Form.Label>
                  </Col>
                </Row>
                <Button type="submit" className='btn loginbtn'>Login</Button>
              </Form>      
            </Col>
          </Row>
        </Container>
      </section>
      <Backdrop open={loading} style={{ zIndex: 999, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Login;
