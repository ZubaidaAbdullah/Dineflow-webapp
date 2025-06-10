import React, { useState } from 'react';
import "./reviewratings.css";

const ReviewRatings = () => {
  // Data arrays for Today, Week, Month, and Year
  const todayRatings = Array.from({ length: 12 }, (_, i) => ({
    time: `${i + 12}:00 PM`,
    rating: Math.random() * 5
  }));

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekRatings = daysOfWeek.map(day => ({
    day,
    rating: Math.random() * 5
  }));

  const weeksInMonth = Array.from({ length: 4 }, (_, i) => i + 1);
  const monthRatings = weeksInMonth.flatMap(week => daysOfWeek.map(day => ({
    day,
    week,
    rating: Math.random() * 5
  })));

  const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const yearRatings = monthsOfYear.map(month => ({
    month,
    rating: Math.random() * 5
  }));

  // State to store the selected option
  const [selectedOption, setSelectedOption] = useState("0");

  // Function to handle option selection
  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  // Function to render progress bars based on selected option
  const renderProgressBars = () => {
    switch (selectedOption) {
      case "1": // Today
        return todayRatings.map((data, index) => (
          <div key={index} className="rrProgressItem">
            <div className="rrProgressLabel">{data.time}</div>
            <div className="rrProgressBar">
              <div className="rrProgressFill" style={{ height: `calc(100% * ${data.rating} / 5)` }}></div>
            </div>
          </div>
        ));
      case "2": // Week
        return weekRatings.map((data, index) => (
          <div key={index} className="rrProgressItem">
            <div className="rrProgressLabel">{data.day}</div>
            <div className="rrProgressBar">
              <div className="rrProgressFill" style={{ height: `calc(100% * ${data.rating} / 5)` }}></div>
            </div>
          </div>
        ));
      case "3": // Month
        return monthRatings.map((data, index) => (
          <div key={index} className="rrProgressItem">
            <div className="rrProgressLabel">{data.day} - Week {data.week}</div>
            <div className="rrProgressBar">
              <div className="rrProgressFill" style={{ height: `calc(100% * ${data.rating} / 5)` }}></div>
            </div>
          </div>
        ));
      case "4": // Year
        return yearRatings.map((data, index) => (
          <div key={index} className="rrProgressItem">
            <div className="rrProgressLabel">{data.month}</div>
            <div className="rrProgressBar">
              <div className="rrProgressFill" style={{ height: `calc(100% * ${data.rating} / 5)` }}></div>
            </div>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className='ReviewRatings'>
      <div className="rrHead">
        <h6>Review & Ratings</h6>
        <select 
          name="rrHeadSelect" 
          id="rrHeadSelect"
          className="rrHeadSelect"
          value={selectedOption}
          onChange={handleOptionSelect}
        >
          <option value="0">All</option>
          <option value="1">Today</option>
          <option value="2">Week</option>
          <option value="3">Month</option>
          <option value="4">Year</option>
        </select>
      </div>
      <div className="rrProgressContainer">
        {renderProgressBars()}
      </div>
    </div>
  );
}

export default ReviewRatings;
