import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import "../Register/register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cnic: '',
    role: '',
    termsAccepted: false
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userPayload = {
      DF_UserID: Math.floor(Math.random() * 10000),
      DF_Username: formData.name,
      DF_UserEmail: formData.email,
      DF_UserPassword: formData.password,
      CNIC: formData.cnic,
      Role: formData.role
    };

    try {
      const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userPayload)
      });

      const result = await response.json();
      if (response.status === 400) {
        setAlertVariant('danger');
        setAlertMessage(`Error: ${result.message}`);
        setShowAlert(true);
      } else if (result.status === 'success') {
        setAlertVariant('success');
        setAlertMessage('User created successfully!');
        setShowAlert(true);
        setFormData({
          name: '',
          email: '',
          password: '',
          cnic: '',
          role: '',
          termsAccepted: false
        });
      } else {
        setAlertVariant('danger');
        setAlertMessage(`Error: ${result.message}`);
        setShowAlert(true);
      }
    } catch (error) {
      setAlertVariant('danger');
      setAlertMessage(`Error: ${error.message}`);
      setShowAlert(true);
    }
  };

  return (
    <section className='registrationPage'>
      <Container>
        <Row className='RegRow'>
          <Alert show={showAlert} variant={alertVariant} className="registration-alert" onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
          <Form className='registrationForm' onSubmit={handleSubmit} id="registrationForm">
            <Col sm={12} className='registrationtitle'>
              <h1 className="Regtitle">Employee Registration Portal</h1>
            </Col>
            <Col sm={12} className='registrationinputcontainer'>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className='inputregister'
                value={formData.name}
                onChange={handleChange}
                id="name"
                required
                pattern="^[A-Za-z\s]{3,25}$"
                title="Name should be between 3 and 25 characters and only contain letters."
              />
              <br />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className='inputregister'
                value={formData.email}
                onChange={handleChange}
                id="email"
                required
              />
              <br />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className='inputregister'
                value={formData.password}
                onChange={handleChange}
                id="password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Password must contain at least 8 characters, including UPPER/lowercase and numbers."
              />
              <br />

              <input
                type="text"
                name="cnic"
                placeholder="CNIC#"
                className='inputregister'
                value={formData.cnic}
                onChange={handleChange}
                id="cnic"
                required
                pattern="\d{5}-\d{7}-\d{1}"
                title="CNIC should be in the format 12345-1234567-1."
              />
              <br />

              <Form.Select
                aria-label="Employee Type"
                name="role"
                className='inputregister'
                value={formData.role}
                onChange={handleChange}
                id="role"
                required
              >
                <option value="">Employee type</option>
                <option value="KitchenStaff">Kitchen staff</option>
                <option value="Manager">Manager</option>
              </Form.Select>
              <br />
            </Col>
            <Row className="chckbox">
              <Col sm={3} className="chck">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  className='inputregister'
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col sm={9} className="chckboxlabel">
                <Form.Label>
                  I agree with terms of use
                </Form.Label>
              </Col>
            </Row>
            <Button
              type="submit"
              color="primary"
              className="registerbtn"
            >
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </section>
  );
}

export default Register;
