import React, { useEffect, useState } from 'react';
import "./analytics.css";
import Navbar from '../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';
import { MenuItem, Select } from "@mui/material";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TrendingOrderComponent from "./TrendingOrderComponent";
import MostSellingComponent from "./MostSellingComponent";

const Analytics = () => {
    const [salesData, setSalesData] = useState({
        weeklySales: [],
        monthlySales: [],
        dailySales: []
    });
    const [duration, setDuration] = useState('daily');
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchSalesData();
    }, []);

    useEffect(() => {
        updateChartData();
    }, [duration, salesData]);

    const fetchSalesData = async () => {
        try {
            const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/GetSales');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSalesData(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching the sales data:', error);
        }
    };

    const updateChartData = () => {
        if (duration === 'daily') {
            setChartData(salesData.dailySales.map(sale => ({
                name: sale.date,
                TotalSales: sale.total_sales,
                AvgSales: sale.avg_sales_per_day,
            })));
        } else if (duration === 'weekly') {
            setChartData(salesData.weeklySales.map(sale => ({
                name: `Week ${sale.week}`,
                TotalSales: sale.total_sales,
                AvgSales: sale.avg_sales_per_day,
            })));
        } else if (duration === 'monthly') {
            setChartData(salesData.monthlySales.map(sale => ({
                name: sale.month,
                TotalSales: sale.total_sales,
                AvgSales: sale.avg_sales_per_day,
            })));
        }
    };

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    };
    const formatNumber = (number) => {
        if (number < 1000) {
            return number.toString();
        } else if (number < 1000000) {
            return (number / 1000).toFixed(1) + 'K';
        } else {
            return (number / 1000000).toFixed(1) + 'M';
        }
    };

    const calculateTotalSales = () => {
        let totalSales = 0;
        if (duration === 'weekly') {
            totalSales = salesData.weeklySales.reduce((total, week) => total + week.total_sales, 0);
        } else if (duration === 'monthly') {
            totalSales = salesData.monthlySales.reduce((total, month) => total + month.total_sales, 0);
        } else if (duration === 'daily') {
            totalSales = salesData.dailySales.reduce((total, day) => total + day.total_sales, 0);
        }
        return formatNumber(totalSales);
    };
    
    const calculateAverageSales = () => {
        let totalSales = 0;
        let count = 0;
        if (duration === 'weekly') {
            totalSales = salesData.weeklySales.reduce((total, week) => total + week.avg_sales_per_day, 0);
            count = salesData.weeklySales.length;
        } else if (duration === 'monthly') {
            totalSales = salesData.monthlySales.reduce((total, month) => total + month.avg_sales_per_day, 0);
            count = salesData.monthlySales.length;
        } else if (duration === 'daily') {
            totalSales = salesData.dailySales.reduce((total, day) => total + day.avg_sales_per_day, 0);
            count = salesData.dailySales.length;
        }
        const averageSales = count > 0 ? totalSales / count : 0;
        return formatNumber(averageSales);
    };

    return (
        <div className="analytics">
            <div className="analiyticsContainer">
                <div className="mainn">
                    <div className="background">
                        <div className="head">
                            <div className="lefthead">
                                <h1 className="analyticstitle">Analytics</h1>
                                <p className="analyticssubtitle">Here are your analytics</p>
                            </div>
                            <div className="righthead">
                                {/* <select id="category" className="analyticspageduration" value={duration} onChange={handleDurationChange}>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select> */}
                            </div>
                        </div>
                        <div className="content">
                            <div className="contentleftside">
                                <div className="head">
                                    <div className="lefthead">
                                        <h2 className="analyticstitle">Sales</h2>
                                        <p className="analyticssubtitle">Here are sales analytics</p>
                                    </div>
                                    <div className="righthead">
                                        <select id="category" className="analyticspageduration" value={duration} onChange={handleDurationChange}>
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="salesSummary">
                                    <div className="mainSalesStats">
                                        <div>
                                            <div className="mainSalesIcons">
                                                <LocalAtmIcon fontSize="large" />
                                                <h1>Rs {calculateTotalSales()}</h1>
                                            </div>
                                            <p>Total Sales</p>
                                        </div>
                                        <div>
                                            <div className="mainSalesIcons">
                                                <LocalAtmIcon fontSize="large" />
                                                <h1>Rs {calculateAverageSales()}</h1>
                                            </div>
                                            <p>AvgSales per Day</p>
                                        </div>
                                    </div>
                                    <div className="salesChart">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                width={500} height={300} data={chartData}
                                                margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dataKey="TotalSales" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
                                                <Line type="monotone" dataKey="AvgSales" stroke="#82ca9d" strokeWidth={3} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="trendingandmostsellingdiv">
                            <div className="trendingorderdiv">
                                <div className="contentrightside">
                                    <TrendingOrderComponent />
                                </div>
                            </div>
                            <div className="mostsellingdiv">
                                <div className="contentrightside">
                                    <MostSellingComponent />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
