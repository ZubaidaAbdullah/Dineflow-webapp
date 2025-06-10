import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './orders.css';
import Search from './Search';
import "@fontsource/poppins";

const OrderSide = ({ orders }) => {
  const [selectedOption, setSelectedOption] = useState('All');
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    const updatedFilteredOrders = selectedOption === 'All'
      ? orders
      : orders.filter(order => order.status === selectedOption);
    setFilteredOrders(updatedFilteredOrders);
  }, [selectedOption, orders]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedOrderIndex(null);
  };

  const handleOrderClick = (index) => {
    setSelectedOrderIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className='Orders'>
      <h2 className='mainhead'> Orders </h2>
      <div className='RightOrderOpts'>
        <button onClick={() => handleOptionSelect('All')} className={selectedOption === 'All' ? 'selectedOption Rightopts' : 'Rightopts'}> All </button>
        <button onClick={() => handleOptionSelect('Start')} className={selectedOption === 'Start' ? 'selectedOption Rightopts' : 'Rightopts'} > Start </button>
        <button onClick={() => handleOptionSelect('In Progress')} className={selectedOption === 'In Progress' ? 'selectedOption Rightopts' : 'Rightopts'} > In Progress </button>
        <button onClick={() => handleOptionSelect('Complete')} className={selectedOption === 'Complete' ? 'selectedOption Rightopts' : 'Rightopts'}> Complete</button>
      </div>
      <Rectangle />
      {/* <Search /> */}
      <div className='ordersData'>
        {filteredOrders.map(({ Tableno, orderid, bill, status, orderItems, totalQty }, index) => (
          <div className='restorders' key={orderid}>
            <span className='grp1'>
              <h3 className='tableno'> Table No. {Tableno}</h3>
              <Grp>
                <Status style={{ color: status === 'Start' ? 'rgb(47, 76, 221)' : status === 'In Progress' ? 'rgb(247, 43, 80)' : 'rgb(43, 193, 85)', backgroundColor: status === 'Start' ? 'rgb(47 76 221 / 25%)' : status === 'In Progress' ? 'rgb(247 43 80 / 25%)' : 'rgb(43 193 85 / 25%)' }}> {status} </Status>
                <Arrow onClick={() => handleOrderClick(index)} src={require('../../assets/Ordersimgs/Vector.svg').default} alt="Arrow Icon" />
              </Grp>
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 className='orderid'> Order ID: {orderid} | {totalQty} items </h3>
                <h3 className='bill'> {bill}</h3>
              </div>
              <Grp2>
                {/* <Invoice> Invoice </Invoice> */}
                {/* <Info src={require('../../assets/Ordersimgs/Group 14.svg').default} alt="Arrow Icon" /> */}
              </Grp2>
            </div>
            {selectedOrderIndex !== null && selectedOrderIndex === index && (
              <OrderItemsContainer className='OrderItems'>
                <ul style={{padding:'0px'}}>
                  {orderItems.map((item, id) => (
                    <li className='item' key={id}>
                      <div className='item-details'>
                        <div className='orderitemimage'>
                          <span> {item.name} </span>
                        </div>
                        <div className='priceandquantity'>
                          <span style={{ fontSize: '10px', fontWeight: 400, color: '#999999' }}> qty: {item.size} </span>
                          <span style={{ paddingRight: '13px', fontSize: '14px', fontWeight: 900 }}> {item.price} </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </OrderItemsContainer>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSide;

const Rectangle = styled.div`
  width: 100%;
  height: 1px;
  background: #DDDDDD;
`;

const Status = styled.div`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 700;
  line-height: 23px;
  text-align: center;
  width: 80px;
  height: 22px;
  border-radius: 3px;
`;

const Arrow = styled.img`
  width: 13px;
  height: 7px;
  cursor: pointer;
`;

const Grp = styled.div`
  display: flex;
  align-items: center;
  gap: 23px;
  padding-right: 16px;
`;

const Bike = styled.img`
  width: 13px;
  height: 7px;
`;

const Line = styled.div`
  width: 1px;
  height: 18px;
  background-color: #EEEEEE;
`;

const Invoice = styled.div`
  width: 43px;
  height: 18px;
  color: #999999;
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
`;

const Info = styled.img`
  width: 8px;
  height: 8px;
`;

const Grp2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  align-items: baseline;
  padding-right: 16px;
`;

const OrderItemsContainer = styled.div``;
