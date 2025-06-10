import React, { useState, useEffect } from 'react';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./main.css";
import Chart from "../Chart/Chart";
import Widgets from "../Widgets/Widgets";
import MostSellingDish from "../MostSellingDish/MostSellingDish";
import ReviewRatings from "../ReviewsRatings/ReviewRatings";
import DishesSlider from "../DishesSlider/DishesSlider";

const Main = () => {
  const [data, setData] = useState([]);
  const [totals, setTotals] = useState({ customers: 0, revenue: 0, orders: 0 });

  useEffect(() => {
    fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/MonthlyRevenue')
      .then(response => response.json())
      .then(data => {
        setData(data);
        const totalCustomers = data.reduce((sum, item) => sum + item.Customers, 0);
        const totalRevenue = data.reduce((sum, item) => sum + item.Revenue, 0);
        const totalOrders = data.reduce((sum, item) => sum + item.Orders, 0);
        setTotals({ customers: totalCustomers, revenue: totalRevenue, orders: totalOrders });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const orderData = data.map(item => ({
    month: item.Month,
    orders: item.Orders
  }));

  return (
    <div className="dashboard">
      <div className="featured">
        <div className="top">
          <h1 className="title">Total Revenue</h1>
          <MoreVertIcon fontSize="small" />
        </div>
        <Chart data={data} />
      </div>
      <div className="subfeatured">
        <Widgets type="orders" total={totals.orders} chartData={data} dataKey="Orders" />
        <Widgets type="revenue" total={totals.revenue} chartData={data} dataKey="Revenue" />
        <Widgets type="customers" total={totals.customers} chartData={data} dataKey="Customers" />
      </div>
      <div className="ratingsSection">
        <div className="mostSellingDish">
          <MostSellingDish numberOfDishes={3} />
        </div>
        <div className="reviewRatings">
          <ReviewRatings orderData={orderData} />
        </div>
      </div>
      <div className="carousalSlider">
        <DishesSlider />
      </div>
    </div>
  );
}

export default Main;
