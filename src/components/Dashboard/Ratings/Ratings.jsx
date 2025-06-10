import './ratings.css';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MostSellingDish from '../MostSellingDish/MostSellingDish';
import MyChartComponent from '../Feedback/Donutchart';
import DishesSlider from '../DishesSlider/DishesSlider';

const Ratings = () => {
    const [dishItems, setDishItems] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [duration, setDuration] = useState('');
    const [filterType, setFilterType] = useState('MostSelling'); // Added state for filter type

    const handleChange = (e) => {
        setDuration(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    useEffect(() => {
        const fetchDishItems = async () => {
            try {
                // Replace with your MongoDB Atlas App Services endpoint URL
                const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/MenuItemsRatings');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDishItems(data);
            } catch (error) {
                console.error('Error fetching the dish items:', error);
            }
        };

        fetchDishItems();
    }, []);

    useEffect(() => {
        let sortedDishes = [...dishItems];
        if (filterType === 'MostSelling') {
            sortedDishes.sort((a, b) => b.TimesServed - a.TimesServed);
        } else {
            sortedDishes.sort((a, b) => a.TimesServed - b.TimesServed);
        }
        setFilteredDishes(sortedDishes.slice(0, 10));
    }, [dishItems, filterType]);

    const getCurrentMonth = () => {
        const date = new Date();
        return date.toLocaleString('default', { month: 'short' });
    };

    const calculatePercentageChange = (dish) => {
        const currentMonth = getCurrentMonth();
        const currentMonthData = dish.MonthlyTimesServed.find(m => m.month === currentMonth);
        const previousMonthIndex = dish.MonthlyTimesServed.findIndex(m => m.month === currentMonth) - 1;
        if (currentMonthData && previousMonthIndex >= 0) {
            const previousMonthData = dish.MonthlyTimesServed[previousMonthIndex];
            const change = ((currentMonthData.Served - previousMonthData.Served) / previousMonthData.Served) * 100;
            return change.toFixed(0);
        }
        return null;
    };

    return (
        <div className="ratingspage">
            <div className="ratingspageContainer">
                <div className="ratingspagemainn">
                    <div className="ratingspagebackground">
                        <div className="ratingspagehead">
                            <div className="ratingspagelefthead">
                                <h1 className="ratingspagetitle"><strong>Ratings</strong></h1>
                            </div>
                            <div className="ratingspagerighthead">
                                <select id="category" className="ratingspageduration" onChange={handleChange}>
                                    <option value="all">Duration</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                        </div>
                        <div className="ratingspagecontent">
                            <div className="ratingspagecontentleftside">
                                <div className="ratingspagedishesrating">
                                    <div className="rpdishesratinghead">
                                        <h4 className="rpdishesratingtitle">Most Selling Dishes</h4>
                                        <select name="rpdishesselect" id="rpdishesselect" className="rpdishesselect" onChange={handleFilterChange}>
                                            <option value="MostSelling">Most Selling Dishes</option>
                                            <option value="LeastSelling">Least Selling Dishes</option>
                                        </select>
                                    </div>
                                    <div className="ratingspageitemdiv">
                                        {filteredDishes.map((dish, index) => (
                                            <div key={index} className="ratingspageitem">
                                                <div className="rpitemimgdiv">
                                                    <img src={dish.ItemImgURL} alt={dish.ItemName} className="rpitemimg" />
                                                </div>
                                                <div className="rpitemdetaildiv">
                                                    <div className="rpitemdetailleft">
                                                        <h7><strong>{dish.ItemName}</strong></h7>
                                                        <Rating name="read-only" value={dish.Rating} readOnly />
                                                        <p className="servedp">Served {dish.TimesServed} Times</p>
                                                    </div>
                                                    <div className="rpitemdetailright">
                                                        <h7>
                                                            <strong>
                                                                {calculatePercentageChange(dish)}%
                                                                {calculatePercentageChange(dish) > 0 ? (
                                                                    <ArrowDropUpIcon fontSize='small' />
                                                                ) : (
                                                                    <ArrowDropDownIcon fontSize='small' />
                                                                )}
                                                            </strong>
                                                        </h7>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="ratingspagecontentrightside">
                                <div className="rpfeedbackgraphdiv">
                                    <MyChartComponent bgWidth="100%" bgHeight="100%" />
                                </div>
                                <div className="rpleastsellingdiv">
                                    <MostSellingDish numberOfDishes={5}/>  
                                </div>
                            </div>
                        </div>
                        <div className="rpcarousalSlider">
                            <DishesSlider/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ratings;
