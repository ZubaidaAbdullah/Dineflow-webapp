import React from 'react';
import pizzaImage from '../../assets/Ordersimgs/pizza1.png';
import Allorders from './Allorders';
import Kitchen from '../KitchenView/Kitchen';

const OrdersDataContainer = () => {

    const allOrdersdata = [
        {
            Tableno: 1,
            orderid: 745632,
            bill: '$250.00',
            status: 'In Progress',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },

            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',


        },
        {
            Tableno: 2,
            orderid: 765632,
            bill: '$350.00',
            status: 'Start',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        }

        ,
        {
            Tableno: 3,
            orderid: 765632,
            bill: '$350.00',
            status: 'Complete',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 4,
            orderid: 765632,
            bill: '$350.00',
            status: 'In Progress',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 5,
            orderid: 765632,
            bill: '$350.00',
            status: 'In Progress',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 6,
            orderid: 765632,
            bill: '$350.00',
            status: 'Start',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 7,
            orderid: 765632,
            bill: '$350.00',
            status: 'In Progress',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 8,
            orderid: 765632,
            bill: '$350.00',
            status: 'Start',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },

        {
            Tableno: 9,
            orderid: 765632,
            bill: '$350.00',
            status: 'Cancel',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 10,
            orderid: 765632,
            bill: '$350.00',
            status: 'Complete',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 11,
            orderid: 765632,
            bill: '$350.00',
            status: 'Start',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 12,
            orderid: 765632,
            bill: '$350.00',
            status: 'Cancel',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 13,
            orderid: 765632,
            bill: '$350.00',
            status: 'In Progress',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 14,
            orderid: 765632,
            bill: '$350.00',
            status: 'Complete',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 15,
            orderid: 765632,
            bill: '$350.00',
            status: 'Complete',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 16,
            orderid: 765632,
            bill: '$350.00',
            status: 'In Progress',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 17,
            orderid: 765632,
            bill: '$350.00',
            status: 'Start',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },
        {
            Tableno: 18,
            orderid: 765632,
            bill: '$350.00',
            status: 'Cancel',
            orderItems: [
                { id: 1, name: 'Veg Hawaiian Pizza', size: 'Regular', price: '$12.00', imageUrl: pizzaImage },
                { id: 2, name: 'Veg Italian Pizza', size: 'Medium', price: '$35.00', imageUrl: pizzaImage },
                {
                    id: 3, name: 'Chicken Hawaiian Pizza', size: 'Large', price: '$40.00', imageUrl: pizzaImage
                }
            ],
            Arrivaltime: '10:02 pm',
            Preparetime: '09:00',
        },

    ];

    const pendingOrders = allOrdersdata.filter(order => order.status === 'In Progress');

    return (
        <div>

            <Kitchen kitchenOrders={allOrdersdata} />

        </div>
    )
}


export default OrdersDataContainer;