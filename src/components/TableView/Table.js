import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import styled from "styled-components";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./tables.css";
import "../KitchenView/kitchen.css";
import { useEffect } from 'react';

const Table = ({ size, seatingCapacity, shape, id, isReserved }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [persons, setPersons] = useState('');
  const [reserve, setReserve] = useState(isReserved);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderNote, setOrderNote] = useState('');
  const [OTP, setOTP] = useState('');


  useEffect(() => {
    setReserve(isReserved);
  }, [isReserved]);

  const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);  // Generate 4-digit OTP
  };

  const updateReservationStatus = async (tableId, status, customerDetails = {}, otp = null) => {
    try {
     if (otp === null && status) {
        otp = generateOtp();  // Generate OTP only if the status is to reserve
        setOtp(otp);  // Set OTP in state to display it later
      }
      
      const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/GetTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          tableId: tableId,
          isReserved: status,
          otp: otp,
          ...customerDetails,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update reservation status');
      }
      const result = await response.json();
      console.log('Update successful:', result);
      if (status) {
        // setOrderId(`#${result.Table_ID}`);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleReserve = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      const customerDetails = {
        customerName: name,
        customerPhone: phone,
        totalPersons: persons
      };
      setReserve(true);
      setIsReserveModalOpen(false);
      setIsDetailModalOpen(true);
      updateReservationStatus(id, true, customerDetails);
    }
  };
  const handleOpen = async () => {
    try {
      if (reserve) {
        setIsDetailModalOpen(true);
        const payload = { table_id: id }; // Creating payload in the specified format
        console.log('Payload:', JSON.stringify(payload)); // Log the payload in JSON format
        const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/OTPorderdetail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload), // Sending payload to the server
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch order details: ${response.statusText}`);
        }
        const result = await response.json();
        console.log('Response from server:', result); // Log the response from server
  
        // Update state with the response data
        setOrderId(result.Order_ID);
        setOrderDetails(result.Order_Details);
        setOrderNote(result.Order_Note);
        setOTP(result.OTP);
        setOtp(result.OTP);
        
      } else {
        setIsReserveModalOpen(true);
      }
    } catch (error) {
      console.error(error);
      // Show user-friendly error message
      // For example, you can show a snackbar or a toast message
      // Here's a pseudo code example:
      // showErrorMessage("Failed to fetch order details. Please try again later.");
    }
  };
  
  
  
  

  const handleUnreserve = () => {
    if (reserve) {
      setReserve(false);
      setIsReserveModalOpen(false);
      setIsDetailModalOpen(false);
      updateReservationStatus(id, false, {}, null);
    }
  };

  const handleClose = () => {
    setIsReserveModalOpen(false);
    setIsDetailModalOpen(false);
  };

  const tableStyles = {
    width: `${size}px`,
    height: `137px`,
    borderRadius: shape === 'round' ? '50%' : '0%',
    backgroundColor: 'white',
    position: 'relative',
    boxShadow: '1px 2px 5px 1px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: 0,
    boxShadow: 24,
    p: 4,
    height: 450,
    display: 'flex',
    flexDirection: 'column',
  };

  const chairStyles = {
    width: '57px',
    height: '26px',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    position: 'absolute',
    boxShadow: '1px 2px 5px 1px rgba(0, 0, 0, 0.1)',
  };

  const chairs = [];
  // Generate chairs around the table
  if (size === 342 && seatingCapacity === 8) {
    const topChairs = [0, 1, 2];
    const bottomChairs = [5, 6, 7];
    const leftChair = 3;
    const rightChair = 4;
    const topChairsCount = 3;
    const topAngleIncrement = 180 / (topChairsCount + 1);

    for (let i = 1; i <= topChairsCount; i++) {
      const angle = topAngleIncrement * i;
      const chairPosition = {
        left: `${size / 2 - 25 + (size / 2 - 20) * Math.cos((angle * Math.PI) / 180)}px`,
        top: `-37px`,
      };
      chairs.push(<div key={i} className="chair" style={{ ...chairStyles, ...chairPosition }}></div>);
    }

    bottomChairs.forEach((index) => {
      const angle = 45 * index;
      const chairPosition = {
        left: `${size / 2 - 25 + (size / 2 - 20) * Math.cos((angle * Math.PI) / 180)}px`,
        top: `${137 + 10}px`,
      };
      chairs.push(<div key={index} className="chair" style={{ ...chairStyles, ...chairPosition }}></div>);
    });

    const leftChairPosition = {
      left: `-55px`,
      top: `${137 / 2 - 10}px`,
      transform: 'rotate(-90deg)',
    };
    chairs.push(<div key={leftChair} className="chair" style={{ ...chairStyles, ...leftChairPosition }}></div>);

    const rightChairPosition = {
      left: `${size - 1.5}px`,
      top: `${137 / 2 - 10}px`,
      transform: 'rotate(90deg)',
    };
    chairs.push(<div key={rightChair} className="chair" style={{ ...chairStyles, ...rightChairPosition }}></div>);
  } else {
    const angleIncrement = 360 / seatingCapacity;
    for (let i = 0; i < seatingCapacity; i++) {
      const angle = i * angleIncrement;
      const chairPosition = {
        left: `${size / 2 - 27 + (size / 1.5) * Math.cos((angle * Math.PI) / 180)}px`,
        top: `${137 / 2 - 12 + (size / 1.5) * Math.sin((angle * Math.PI) / 180)}px`,
      };

      let rotation = '';
      if (i === 2 && size < 342) {
        rotation = 'rotate(-90deg)';
      }

      if (i === seatingCapacity - 4 && size < 342) {
        rotation = 'rotate(90deg)';
      }

      chairs.push(
        <div key={i} className="chair" style={{ ...chairStyles, ...chairPosition, transform: rotation }}></div>
      );
    }
  }

  const getPersonsPattern = (seatingCapacity) => {
    if (seatingCapacity === 4) {
      return "^[2-4]$";
    } else if (seatingCapacity === 8) {
      return "^[4-8]$";
    }
    return "";
  };

  return (
    <div className="table" style={tableStyles}>
      <Button onClick={handleOpen}>
        <span className='table-ids' style={{ backgroundColor: reserve ? '#FF2C291F' : '#EBFCD0', borderRadius: 50 }}>
          T{id}
        </span>
      </Button>

      {/* Reserve Modal */}
      <Modal
        open={isReserveModalOpen}
        onClose={handleClose}
        aria-labelledby="reserve-modal-title"
        aria-describedby="reserve-modal-description"
      >
        <form onSubmit={handleReserve}>
          <Box sx={style}>
            <Typography id="reserve-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', fontFamily: 'Poppins' }}>
              Table No.{id}
            </Typography>
            <Typography id="reserve-modal-description" sx={{ mt: 2 }} style={{ textAlign: 'center', fontFamily: 'Poppins' }}>
              Total Seats: {seatingCapacity}
            </Typography>
            <label>Name</label>
            <input
              type='text'
              className='recpInput'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              pattern="^[A-Za-z\s]{3,25}$"
              title="Name should be between 3 and 25 characters and only contain letters."
            />
            <br />
            <label>Phone No.</label>
            <input
              type='tel'
              className='recpInput'
              name='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="^\d{11}$"
              title="Please enter a valid 11-digit phone number"
            />
            <br />
            <label>Total Persons</label>
            <input
              type='text'
              className='recpInput'
              name='persons'
              value={persons}
              onChange={(e) => setPersons(e.target.value)}
              required
              pattern={getPersonsPattern(seatingCapacity)}
              title={`Seats available for this table ${seatingCapacity === 4 ? "two or four person(s)" : "4 and 8"}`}
            />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className='tableview-reserve'>Reserve</button>
              <button type="button" onClick={handleClose} className='tableview-cancel'>Cancel</button>
            </div>
          </Box>
        </form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        open={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        aria-labelledby="detail-modal-title"
        aria-describedby="detail-modal-description"
        onOpen={() => console.log(`Detail modal opened for Table T${id}`)}
      >
  <StyledModal>
    <ModalContent className='modalcontentm'>
      <Row style={{ height: '100%', margin: '0px', width: '1200px', justifyContent: 'center', gap: '2pc' }}>
        <Col sm={4} style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column', boxShadow: '0px 4px 11px 0px #0000001F', justifyContent: 'space-evenly', borderRadius: '20px', backgroundColor: 'white'
        }}>
          <div>
            <p className="orderD"> Order ID: {orderId}</p>
            <p className="" style={{textAlign: 'center'}}> OTP: {otp} </p>
          </div>
          <div className="ordernote">
            <h2> Order Note </h2>
            <p> {orderNote} </p>
          </div>
        </Col>
        <Col sm={7} className="orderDetail">
          <div>
            <div className="orderD1">
              <p style={{ paddingLeft: '25px' }}> Items</p>
              <div className="orderD2">
                <p> Qty</p>
                <p> Price </p>
                <p> Total Price </p>
              </div>
            </div>
            {orderDetails && orderDetails.map((item, index) => (
              <div className="orderD1" key={index}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1pc' }}>
                  {/* Assuming you have an image URL for each item */}
                  <p>{item.Item_Name}</p>
                </div>
                <div className="orderD2">
                  <p style={{textAlign: 'center'}}>{item.Item_Qty}</p>
                  <p>Rs{item.Item_Price}</p>
                  <p>Rs{item.Total_Price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="buttonsmodal">
            <div>
              <CloseButton style={{ backgroundColor: 'red' }} onClick={() => setIsDetailModalOpen(false)}>Close</CloseButton>
            </div>
            <div>
              <CloseButton style={{ backgroundColor: '#1C4656' }} onClick={handleUnreserve}>Unreserve</CloseButton>
            </div>
          </div>
        </Col>
      </Row>
    </ModalContent>
  </StyledModal>
</Modal>


      <div className="chairs">{chairs}</div>
    </div>
  );
};

export default Table;

const StyledModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: transparent;
  backdrop-filter: blur(5px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  & .MuiPaper-root {
    box-shadow: none;
    height: auto;
    max-height: calc(100% - 32px);
    margin: auto;
    overflow-y: auto;
  }
`;

const ModalContent = styled.div`
  padding: 35px 0px;
  background-color: white;
  border-radius: 8px;
  outline: none;
  height: 550px;
`;

const CloseButton = styled.button`
  width: 150px;
  height: 62px;
  padding: 8px 20px;
  margin: 20px auto;
  border-radius: 5px;
  background-color: #1C4656;
  color: white;
  border: none;
  cursor: pointer;
  display: block;
`;

