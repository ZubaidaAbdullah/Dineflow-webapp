import React, { useState, useEffect } from 'react';
import './dishesslider.css';
import Rating from '@mui/material/Rating';

const DishesSlider = () => {
    const [dishes, setDishes] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 2;

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/MenuItemsRatings');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDishes(data);

                const categorySet = new Set(data.map(dish => dish.ItemCategory));
                setCategories(['all', ...categorySet]);

                setFilteredDishes(data);
            } catch (error) {
                console.error('Error fetching the dishes:', error);
            }
        };

        fetchDishes();
    }, []);

    useEffect(() => {
        let filtered = dishes;
        if (selectedCategory !== 'all') {
            filtered = dishes.filter(dish => dish.ItemCategory === selectedCategory);
        }
        filtered.sort((a, b) => b.TimesServed - a.TimesServed);
        setFilteredDishes(filtered);
    }, [dishes, selectedCategory]);

    const nextSlide = () => {
        if (currentIndex < filteredDishes.length - itemsPerPage) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentIndex(0); // Reset to first page when category changes
    };

    return (
        <div className="top-selling-dishes">
            <div className="dishessliderhead">
                <div className="dishesslidertst">
                    <h2 style={{ fontWeight: 600 }}>Top Selling Dishes</h2>
                    <p>Eum fuga consequuntur utadsjh et.</p>
                </div>
                <div className="filters">
                    <div className="dishescategory">
                        <select id="category" className="slidercategoryselect" onChange={handleCategoryChange}>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="navigation">
                        <button onClick={prevSlide} disabled={currentIndex === 0}>&lt;</button>
                        <button onClick={nextSlide} disabled={currentIndex >= filteredDishes.length - itemsPerPage}>&gt;</button>
                    </div>
                </div>
            </div>
            <div className="dishes">
                {filteredDishes.slice(currentIndex, currentIndex + itemsPerPage).map((dish, index) => (
                    <div className="dish-card" key={index}>
                        <img src={dish.ItemImgURL} alt={dish.ItemName} />
                        <br />
                        <h2><strong>{dish.ItemName}</strong></h2>
                        <p>{dish.ItemDesc}</p>
                        <br /><hr />
                        <p className="category">{dish.ItemCategory}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DishesSlider;
