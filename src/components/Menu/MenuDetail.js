import React, { useState, useEffect } from 'react';
import MenuTable from './MenuTable';
import NewItemModal from './NewItemModal';

const MenuDetail = () => {
  const [fooditems, setFoodItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/MenuItems');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const transformedData = data.map(item => ({
        itemid: item.Item_ID,
        dishname: item.Item_Name,
        category: item.Item_Category,
        price: `Rs ${item.Item_Price}`,
        dishdesc: item.Item_Description,
        availability: item.Item_Status,
        imageUrl: item.Item_Image_URL,
      }));
      setFoodItems(transformedData);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const updateAvailability = async (itemId, newAvailability) => {
    const updatedItems = fooditems.map(item =>
      item.itemid === itemId ? { ...item, availability: newAvailability } : item
    );
    setFoodItems(updatedItems);

    try {
      const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/ItemStatusUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemid: itemId,
          availability: newAvailability
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Item status updated:', result);
      fetchMenuItems(); // Reload data after update
    } catch (error) {
      console.error('Error updating item status:', error);
    }
  };

  const categories = [...new Set(fooditems.map(item => item.category))];

  return (
    <div className="menudisplayy">
      <MenuTable 
        fooditem={fooditems} 
        updateAvailability={updateAvailability} 
        categories={categories} 
      />
    </div>
  );
};

export default MenuDetail;
