import React, { useState } from 'react';
import styled from 'styled-components';

const NewItemModal = ({  onClose, fetchMenuItems  }) => {
  const [formData, setFormData] = useState({
    itemid: '',
    dishname: '',
    category: '',
    price: '',
    dishdesc: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/AddMenuItems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Item added:', result);
      fetchMenuItems(); // Re-fetch menu items after adding a new item
    } catch (error) {
      console.error('Error adding new item:', error);
    }
    onClose();
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h2 style={{textAlign:'center'}}>Add New Item</h2>
       
        <AddNewForm onSubmit={handleSubmit}>
          {/* <AddNewFormLabel>Item ID:</AddNewFormLabel>
          <AddNewFormInput
            type="text"
            name="itemid"
            value={formData.itemid}
            onChange={handleChange}
            required
          /> */}
          <AddNewFormLabel>Dish Name</AddNewFormLabel>
          <AddNewFormInput
            type="text"
            name="dishname"
            value={formData.dishname}
            onChange={handleChange}
            required
          />
          <AddNewFormLabel>Category</AddNewFormLabel>
          <AddNewFormInput
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <AddNewFormLabel>Price</AddNewFormLabel>
          <AddNewFormInput
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <AddNewFormLabel>Description</AddNewFormLabel>
          <AddNewFormInput
            style={{ lineHeight: '3' }}
            type="text"
            name="dishdesc"
            value={formData.dishdesc}
            onChange={handleChange}
            required
          />
          <AddNewFormLabel>Image</AddNewFormLabel>
           <AddNewFormInput
           
            type="URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
          <br/>
          <div className='AddNewItemButton' style={{ display: 'flex', justifyContent: 'center', gap:'1rem' }}>
            <AddNewItemButton type="submit" onSubmit={fetchMenuItems}> Add Item</AddNewItemButton>
            <CloseButton onClick={onClose}>Cancel</CloseButton>
          </div>
        </AddNewForm>
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
position: fixed;
background-color: rgba(0, 0, 0, 0.5);
// backdrop-filter: blur(5px);
top: 0;
left: 0;
right: 0;
bottom: 0;
opacity: 1;
transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const ModalContent = styled.div`
position: relative;
padding: 20px;
background-color: white;
border-radius: 8px;
width: 36%;
box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);


`;

const AddNewForm = styled.form`
display: flex;
flex-direction: column;
padding: 10px;
margin: 10px;
overflow-y:auto;
max-height:70vh;
`;
const AddNewFormLabel = styled.label`
line-height: 2;
`;
const AddNewFormInput = styled.input`
margin-bottom:10px;
line-height: 1.56;
background-color: gainsboro;
`;
const AddNewItemButton = styled.button`
width: Hug(163px) px;
    height: Hug(63px) px;
    top: 1042px;
    left: 783px;
    padding: 12px 30px 12px 30px;
    gap: 10px;
    border-radius: 5px;
    border: none;
    color: white;
    background: #1C4656;
`;
const CloseButton = styled.button`
width: Hug(163px) px;
height: Hug(63px) px;
top: 1042px;
left: 783px;
padding: 12px 30px 12px 30px;
gap: 10px;
border-radius: 5px;
border: none;
color: white;
background: #E12A2F;
`;
export default NewItemModal;
