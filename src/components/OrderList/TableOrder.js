import React, { useState } from 'react';
import styled from 'styled-components';
import './orderlist.css';
import MoreArrow from '../../assets/OrdersListimg/exit-arrow.png';
import OrderListModal from './OrderListModal'; // Import the modal component

// Styled component for the image
const MoreIcon = styled.img`
  width: 20px;
  cursor: pointer;
`;

const OrderListDetailButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const TableOrder = ({ orders }) => {
  const [selectedOption, setSelectedOption] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const handleMoreIconClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const filteredOrders = selectedOption === 'All'
    ? orders
    : orders.filter(order => order.status === selectedOption);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="outercontainer">
      <div className="order-container">
        <div className='Order119'>
          <div className="orderlistheading">
            <div className='orderlistmainhead'>
              <h2><strong> Orders</strong></h2>
              <h4>This is the Order List</h4>
            </div>
            <div className='OrderOpts'>
              <select value={selectedOption} onChange={handleOptionSelect} className="opts">
                <option value="All">All</option>
                <option value="Start">Start</option>
                <option value="Complete">Complete</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
          </div>
          <div className="table-container">
            {/* Order List Table */}
            <table className="order-details-table">
              <colgroup>
                <col style={{ width: '10%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Table No</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((orders) => (
                  <tr key={orders.itemid} className="OrderTableRow">
                    <td>{orders.orderid}</td>
                    <td>{orders.date}</td>
                    <td>{orders.customername}</td>
                    <td>{orders.tableno}</td>
                    <td className='amount-column'>{orders.total}</td>
                    <td>
                      <div className='orderstatus' style={{ backgroundColor: orders.status === 'Start' ? 'rgb(47, 76, 221)' : orders.status === 'Complete' ? 'rgb(43, 193, 85)' : 'rgb(247, 43, 80)' }}>{orders.status}</div>
                    </td>
                    <td>
                      <OrderListDetailButton onClick={() => handleMoreIconClick(orders)}>
                        <MoreIcon src={MoreArrow} alt='More' />
                      </OrderListDetailButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination-order">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>&gt;</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <OrderListModal open={isModalOpen} onClose={() => setIsModalOpen(false)} selectedOrder={selectedOrder} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default TableOrder;
