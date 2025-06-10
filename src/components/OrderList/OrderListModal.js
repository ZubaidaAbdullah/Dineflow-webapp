import React from 'react';
import styled from 'styled-components';
import { Modal } from '@mui/base/Modal';

const OrderListModal = ({ open, onClose, selectedOrder }) => {
  const handleClose = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <StyledModalOrder open={open} onClose={onClose} onClick={handleClose}>
      <OrderModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        < OrderListModalContainer>
          {/* First div containing Order ID title and Order Note */}
          <OrderInfoContainer>
            <OrderTitle>Order ID: {selectedOrder?.orderid}</OrderTitle>
            <OrderNote>
              <h3>Order Note</h3>
              <p>{selectedOrder?.note}</p>
            </OrderNote>
          </OrderInfoContainer>
          {/* Second div containing item details and total */}
          <OrderDetailsContainer>
            <OrderDetailsTable>
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder?.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quan}</td>
                    <td>{item.price}</td>
                    <td>{item.totalprice}</td>
                  </tr>
                ))}
              </tbody>
            </OrderDetailsTable>
          </OrderDetailsContainer>
        </ OrderListModalContainer >
      </OrderModalContent>
    </StyledModalOrder>
  );
};

export default OrderListModal;

const StyledModalOrder = styled(Modal)`
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
`;

const OrderModalContent = styled.div`
  position: relative;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  width: 60%;
`;

const OrderListModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding:20px
`;

const OrderInfoContainer = styled.div`
  padding:10px;
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const OrderTitle = styled.h2`
  font-size: 24px;
  margin-botton:10px;
  text-align:center;
`;

const OrderNote = styled.div`
  h3 {
    font-size: 18px;
    margin-bottom: 5px;
    text-align:center;
  }

  p {
    font-size: 16px;
    text-align:center;
  }
  background-color:black;
  color:white;
  padding:10px;
  border-radius:8px;
`;

const OrderDetailsContainer = styled.div`
  margin: 10px;
  margin-top:2rem;

`;

const OrderDetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;


  th,
  td {
    border: none;
    padding: 10px;
    text-align: left;
  }

  th {
    
    border-bottom:1px solid  #f2f2f2;
    font-size:22px;
  }

  td {
    text-align:center;
    vertical-align: middle;
    font-size:18px;
    border-bottom:1px solid  #f2f2f2;
  }
`;

const ItemImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: transparent;
  color: red;
  border: 1px solid red;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

