import React, { useState } from 'react';
import './Menu.css';
import styled from 'styled-components';
import NewItemModal from './NewItemModal';

const MenuTable = ({ fooditem, updateAvailability, categories }) => {
  const [selectedOption, setSelectedOption] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const toggleAvailability = itemId => {
    const newAvailability = !fooditem.find(item => item.itemid === itemId).availability;
    updateAvailability(itemId, newAvailability);
  };

  const handleAddNewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let filteredFoodItems = fooditem;

  if (selectedOption !== 'All') {
    filteredFoodItems = fooditem.filter(item => item.category === selectedOption);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFoodItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredFoodItems.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="Menu-container">
        <div className="heading">
          <div className='mainhead_Menu'>
            <h2>Food Items</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1pc' }}>
            <div>
              <AddNewButton onClick={handleAddNewClick}>Add New</AddNewButton>
            </div>
            <div className='MenuOpts'>
              <select value={selectedOption} onChange={handleOptionSelect} className="opts">
                <option value="All">All</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='Menutable-container'>
          <table className="Menu-details-table">
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Dish Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(fooditem => (
                <tr key={fooditem.itemid} className="MenuTableRow">
                  <td>{fooditem.itemid}</td>
                  <td>{fooditem.dishname}</td>
                  <td>{fooditem.category}</td>
                  <td>{fooditem.price}</td>
                  <td>
                    <div className="switch-container">
                      <label className="switch">
                        <input
                          type="checkbox"
                          onChange={() => toggleAvailability(fooditem.itemid)}
                          checked={fooditem.availability}
                        />
                        <span className="sliderbutton"></span>
                      </label>
                      <span className={`availability-indicator ${fooditem.availability ? '' : ''}`}>
                        {fooditem.availability ? '' : ''}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>&gt;</button>
        </div>
      {isModalOpen && (
        <NewItemModal onClose={handleCloseModal} />
      )}
    </div>
  );
};

const AddNewButton = styled.button`
  border-radius: 23px;
  padding: 0.4rem;
  background-color: #00eb00;
  border: solid #00eb00;
  color: white;
  cursor: pointer;
`;

export default MenuTable;
