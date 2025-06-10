import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./chart.css";

// Function to fetch monthly revenue data
const fetchMonthlyRevenueData = async () => {
    try {
        const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/MonthlyRevenue');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching monthly revenue data:', error);
        return [];
    }
};

// Sorting function to sort data by month
const sortMonthlyData = (data) => {
    const monthOrder = {
        'Jan': 1,
        'Feb': 2,
        'Mar': 3,
        'Apr': 4,
        'May': 5,
        'Jun': 6,
        'Jul': 7,
        'Aug': 8,
        'Sep': 9,
        'Oct': 10,
        'Nov': 11,
        'Dec': 12
    };

    return data.sort((a, b) => monthOrder[a.Month] - monthOrder[b.Month]);
};

const Chart = () => {
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        // Fetch data from the API using the function
        fetchMonthlyRevenueData()
            .then(data => {
                const sortedData = sortMonthlyData(data);
                setMonthlyData(sortedData);
            })
            .catch(error => console.error('Error setting monthly revenue data:', error));
    }, []);

    return (
        <div className="charts">
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart width={730} height={250} data={monthlyData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="Revenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ffbf1e" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="Month" />
                    <YAxis className="yaxis" />
                    <CartesianGrid strokeDasharray="3 3" className="gridcolor" />
                    <Tooltip />
                    <Area type="monotone" dataKey="Revenue" stroke="#8884d8" fillOpacity={1} fill="url(#Revenue)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
