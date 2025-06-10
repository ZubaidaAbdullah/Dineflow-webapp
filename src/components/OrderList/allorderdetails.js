import React, { useState, useEffect } from 'react';
import './orderlist.css';
import TableOrder from './TableOrder'; 

const AllOrderDetails = () => {
  const [OrdersDetail, setOrdersDetail] = useState([]);
  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response1 = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/GetOrdersData');
      const response2 = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/GetOrderHistory');
  
        if (!response1.ok || !response2.ok) {
          throw new Error('One of the network responses was not ok');
        }
        const data1 = await response1.json();
        const data2 = await response2.json();
       
        const transformedData1 = data1.map(order => ({
          orderid: order.Order_ID,
          date: order.order_time,
          tableno: order.table_number,
        }));
        const transformedData2 = data2.map(order=> ({
      orderid: order.Order_ID,
      total: `Rs ${order.Total_Amount}`,
      status: order.Order_Status,
      customername: order.Customer_name || order.Customer_Name,
      note:order.Order_Note,
      items: order.Order_Details.map(detail => ({
        name: detail.Item_Name,
        quan: detail.Item_Qty,
        price: `Rs ${detail.Item_Price}`,
        totalprice: `Rs ${detail.Total_Price}`
      }))
        }));
    
        const combinedData = combineData(transformedData1, transformedData2);
        setOrdersDetail(combinedData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    const combineData = (data1, data2) => {
      // Create a map to store data from the first response using orderid as the key
      const data1Map = {};
      data1.forEach(item => {
        data1Map[item.orderid] = item;
      });
    
      // Merge data from the second response into the data from the first response
      const combinedData = data2.map(item => {
        const matchingItem = data1Map[item.orderid];
        if (matchingItem) {
          // If matching orderid exists in data1, merge the data
          return {
            ...matchingItem,
            ...item
          };
        } else {
          // If matching orderid doesn't exist in data1, simply return data from data2
          return item;
        }
      });
    
      return combinedData;
    };
    
  return (
    <div style={{width:"100%"}}>
      <TableOrder orders={OrdersDetail} />
    </div>
  );
};

export default AllOrderDetails;
