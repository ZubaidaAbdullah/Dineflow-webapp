import "./trendingordercomponent.css"
import food2Image from './../../../assets/Kitchenimgs/food2.jpeg';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrendingOrderComponent = () => {
    const [dishesData, setDishesData] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const fetchDishData = async () => {
            try {
                const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/MenuItemsRatings');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                const uniqueCategories = Array.from(new Set(data.map(dish => dish.ItemCategory)));
                setCategories(['all', ...uniqueCategories]);
                
                setDishesData(data);
                setFilteredDishes(data);
            } catch (error) {
                console.error('Error fetching dish data:', error);
            }
        };

        fetchDishData();
    }, []);

    const calculatePercentageChange = (currentMonthSales, previousMonthSales) => {
        if (previousMonthSales === 0) return 0;
        return ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);

        if (category === 'all') {
            setFilteredDishes(dishesData);
        } else {
            const filtered = dishesData.filter(dish => dish.ItemCategory === category);
            setFilteredDishes(filtered);
        }
    };

    const topDishes = filteredDishes.sort((a, b) => b.TimesServed - a.TimesServed).slice(0, 5);

    return (
        <div>
            <div className="head">
                <div className="lefthead">
                    <h2 className="toctitle">Trending Orders</h2>
                    <p className="tocsubtitle">Here are top trending orders</p>
                </div>
                <div className="righthead">
                    <select id="category" className="analyticspageduration" onChange={handleCategoryChange} value={selectedCategory}>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="topSellingDishes">
                {topDishes.map((dish, index) => (
                    <div className="dishesdiv" key={index}>
                        <div className="dishesdivleft">
                            <div className={`dishleftrating ${index === 0 ? 'firstDishLeftRating' : ''}`}>
                                <h3><strong>#{index + 1}</strong></h3>
                            </div>
                            <div className="dishesimgsdiv">
                                <img src={dish.ItemImgURL} alt="" className="dishesdivimg" />
                            </div>
                        </div>
                        <div className="dishesdivright">
                            <div className="dishrightdetails">
                                <div className="dishrightdetailscontent">
                                    <div className="dishcontenttitle">
                                        <h5><strong>{dish.ItemName}</strong></h5>
                                    </div>
                                    <div className="dishcontentprice">
                                        <h5><strong>Rs {dish.ItemPrice}</strong></h5>
                                    </div>
                                </div>
                                <div className="dishrightdetailstats">
                                    <div className="dishrightstatcontent">
                                        <div className="dishrightgraph">
                                            <ResponsiveContainer width="100%" height={100}>
                                                <LineChart width={150} height={100} data={dish.MonthlyTimesServed}>
                                                    <Line type="natural" dataKey="Served" stroke="#ffbf1e" strokeWidth={2} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="dishrightstatrating">
                                            <div className="">
                                                <h3><strong>{dish.TimesServed}</strong></h3>
                                            </div>
                                            <div className="dishrightsalespercentage">
                                                <h7>Sales {calculatePercentageChange(dish.MonthlyTimesServed[11].Served, dish.MonthlyTimesServed[10].Served).toFixed(0)}%</h7>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingOrderComponent;
