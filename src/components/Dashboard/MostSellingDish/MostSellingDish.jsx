import React, { useState, useEffect } from 'react';
import "./mostsellingdish.css";

const MostSellingDish = ({ numberOfDishes }) => {
    // State to store products
    const [products, setProducts] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null);

    // Fetch data from MongoDB endpoint
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/MenuItemsRatings');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    // Function to handle rating selection
    const handleRatingSelect = (event) => {
        const rating = parseFloat(event.target.value);
        setSelectedRating(rating);
    };

    // Filter products based on the selected rating
    let filteredProducts;
    if (selectedRating) {
        filteredProducts = products
            .filter(product => Math.abs(product.Rating - selectedRating) < 0.5)
            .sort((a, b) => b.Rating - a.Rating)
            .slice(0, numberOfDishes);
    } else {
        // If "Select Rating" is selected, show the top dishes based on the provided number
        filteredProducts = [...products]
            .sort((a, b) => b.Rating - a.Rating)
            .slice(0, numberOfDishes);
    }

    return (
        <div className='MostSellingDish'>
            <div className="msdHead">
                <h7 className="msdHeadTitle"><strong>Most Selling Dish</strong></h7>
                <select 
                    name="msdHeadSelect" 
                    id="msdHeadSelect"
                    className='msdHeadSelect'
                    onChange={handleRatingSelect}>
                        <option className='msdHeadSelectOption' value="">Select Rating</option>
                        <option className='msdHeadSelectOption' value="1">Rating 1</option>
                        <option className='msdHeadSelectOption' value="2">Rating 2</option>
                        <option className='msdHeadSelectOption' value="3">Rating 3</option>
                        <option className='msdHeadSelectOption' value="4">Rating 4</option>
                        <option className='msdHeadSelectOption' value="5">Rating 5</option>
                </select>
            </div>
            <div className="msdContent">
                {filteredProducts.map((product, index) => (
                    <div key={index} className="msdContentItem">
                        <div className="msdContentHead">
                            <div className="msdContentProductTitle">
                                <h7>{product.ItemName}</h7>
                            </div>
                            <div className="msdContentProductRating">
                                <h7>{product.Rating}</h7>
                            </div>
                        </div>
                        <div className="msdContentBar">
                            <div className="progressBar" style={{ width: `calc(100% * ${product.Rating} / 5)` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MostSellingDish;
