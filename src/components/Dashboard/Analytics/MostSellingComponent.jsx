import "./mostsellingcomponent.css";
import { useState, useEffect } from 'react';
import { Tooltip } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import food2Image from './../../../assets/Kitchenimgs/food2.jpeg';

const MostSellingComponent = () => {
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

    const topDishes = filteredDishes.sort((a, b) => b.TotalItemSales - a.TotalItemSales).slice(0, 5);

    return (
        <div>
            <div>
                <div className="head">
                    <div className="lefthead">
                        <h2 className="msctitle">Most Selling Items</h2>
                        <p className="mscsubtitle">Here are most selling items</p>
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
                                    <img src={dish.ItemImgURL || food2Image} alt={dish.ItemName} className="dishesdivimg" />
                                </div>
                            </div>
                            <div className="dishesdivright">
                                <div className="dishrightdetails">
                                    <div className="msdishrightdetailscontent">
                                        <div className="dishcontenttitle">
                                            <h5><strong>{dish.ItemName}</strong></h5>
                                        </div>
                                    </div>
                                    <div className="dishrightdetailstats">
                                        <div className="dishrightstatcontent">
                                            <div className="msdishrightstatrating">
                                                <div className="">
                                                    <h5><strong>Rs{dish.ItemPrice}</strong></h5>
                                                </div>
                                                <div className="moreoptiondiv">
                                                    <Tooltip title={`Total Sales: Rs ${dish.TotalItemSales}`} arrow>
                                                        <MoreHorizIcon />
                                                    </Tooltip>
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
        </div>
    );
};

export default MostSellingComponent;
