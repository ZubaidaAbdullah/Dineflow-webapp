import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import "./reviewratings.css";

const ReviewRatings = ({ orderData }) => {
  // Create an array of month names in order
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Initialize an object to store order counts for each month
  const ordersByMonth = months.reduce((acc, month) => {
    acc[month] = 0;
    return acc;
  }, {});

  // Populate ordersByMonth with the actual order data
  orderData.forEach(item => {
    if (ordersByMonth.hasOwnProperty(item.month)) {
      ordersByMonth[item.month] = item.orders;
    }
  });

  // Generate progress items based on order data
  const progressItems = months.map((month, index) => {
    const orders = ordersByMonth[month];
    const fillHeight = orders / 1000; // Calculate fill height based on orders

    return (
      <div key={index} className="rrProgressItem">
        <Tooltip title={`Total Reviews: ${orders}`} arrow>
          <div className="rrProgressBar">
            <div className="rrProgressFill" style={{ height: `calc(100% * ${fillHeight})` }}></div>
          </div>
        </Tooltip>
        <div className="rrProgressLabel">{month}</div>
      </div>
    );
  });

  return (
    <div className='ReviewRatings'>
      <div className="rrHead">
        <h6>Review & Ratings</h6>
        {/* <select 
          name="rrHeadSelect" 
          id="rrHeadSelect"
          className="rrHeadSelect"
        >
          <option value="0">All</option>
          <option value="1">Today</option>
          <option value="2">Week</option>
          <option value="3">Month</option>
          <option value="4">Year</option>
        </select> */}
      </div>
      <div className="rrProgressContainer">
        {progressItems}
      </div>
    </div>
  );
}

export default ReviewRatings;
