import React from 'react';
import "./widgets.css";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Widgets = ({ type, total, chartData, dataKey }) => {
  let data;

  const backgroundColors = {
    orders: "#c6def1",
    revenue: "#faedcb",
    customers: "#e3e1cf"
  };

  const backgroundColor = backgroundColors[type] || "white";

  const formatNumber = (number) => {
    if (number < 1000) {
      return number.toString();
    } else if (number < 1000000) {
      return (number / 1000).toFixed(1) + 'K';
    } else {
      return (number / 1000000).toFixed(1) + 'M';
    }
  };

  const calculatePercentageChange = (data, dataKey) => {
    const length = data.length;
    if (length < 2) {
      return 0;
    }
    const lastMonthValue = data[length - 1][dataKey];
    const secondLastMonthValue = data[length - 2][dataKey];
    if (secondLastMonthValue === 0) {
      return 0;
    }
    const diff = ((lastMonthValue - secondLastMonthValue) / secondLastMonthValue) * 100;
    return diff.toFixed(1);
  };

  const diff = calculatePercentageChange(chartData, dataKey);

  switch (type) {
    case "orders":
      data = {
        title: "Total Orders",
        isMoney: false,
        icon: <ShoppingBasketIcon className="icon" />,
      };
      break;
    case "revenue":
      data = {
        title: "Total Revenue",
        isMoney: true,
        icon: <MonetizationOnIcon className="icon" />,
      };
      break;
    case "customers":
      data = {
        title: "Total Customers",
        isMoney: false,
        icon: <PeopleIcon className="icon" />,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget" style={{ backgroundColor }}>
      <div className="left">
        <div className="icondiv">
          {data.icon}
        </div>
        <div className="text">
          <span className="counter">
            {data.isMoney && "Rs"} {formatNumber(total)}
          </span>
          <span className="widgetstitle">{data.title}</span>
        </div>
      </div>
      <div className="right">
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="natural" dataKey={dataKey} stroke="#ffbf1e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={`percentage ${diff >= 0 ? "positive" : "negative"}`}>
          {diff >= 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          {diff} %
        </div>
      </div>
    </div>
  )
}

export default Widgets;
