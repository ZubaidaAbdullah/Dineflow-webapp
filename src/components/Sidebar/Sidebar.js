import React, { useState, useEffect } from 'react';
import './side.css';
import { Link } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import logo from "../../assets/Logo/brand-logo.png";

const Sidebar = () => {
    const [showGraphDropdown, setShowGraphDropdown] = useState(false);
    const [showTableDropdown, setShowTableDropdown] = useState(false);
    const [showOrderDropdown, setShowOrderDropdown] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const role = sessionStorage.getItem('role');
        setUserRole(role);
    }, []);

    const toggleGraphDropdown = () => {
        setShowGraphDropdown(!showGraphDropdown);
    };

    const toggleTableDropdown = () => {
        setShowTableDropdown(!showTableDropdown);
    };

    const toggleOrderDropdown = () => {
        setShowOrderDropdown(!showOrderDropdown);
    };

    return (
        <div className='container sidebar'>
            <div className='navbar'>
                <div className='logo-place'>
                    <img src={logo} alt='logo' className='logo sidebar'></img>
                    <span>Dineflow</span>
                </div>
                <div className='sidebar-items'>
                    <ul className='sidebar-ul'>
                        {userRole !== 'KitchenStaff' && (
                            <>
                                <li className='home-item' id='home-tab'>
                                    <Link to="/home">
                                        <span>Home</span>
                                        <i className='ri-home-3-line' />
                                    </Link>
                                </li>
                                <li className='graph23' id='graph-tab'>
                                    <a href='#' onClick={toggleGraphDropdown}>
                                        <span>Analytics</span>
                                        <i className='ri-line-chart-line' />
                                        <i className='ri-arrow-down-s-line' />
                                    </a>
                                    <div className={`dropdown-graph ${showGraphDropdown ? 'show' : ''}`}>
                                        <Link to="/analytics/revenueanalytics">Revenue Analytics</Link>
                                        <Link to="/analytics/feedback">Feedbacks</Link>
                                        <Link to="/analytics/ratings">Ratings</Link>
                                    </div>
                                </li>
                                <li className='table-view23' id='tableview-tab'>
                                    <Link to="/Table">
                                        <span>Table</span>
                                        <i className='ri-table-alt-line' />
                                    </Link>
                                </li>
                                <li className='menu23' id='menu-tab'>
                                    <Link to="/MenuUpdate">
                                        <span>Menu Update</span>
                                        <i className="ri-menu-4-line" />
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className='order23' id='order-tab'>
                            <a href='#' onClick={toggleOrderDropdown}>
                                <span>Orders</span>
                                <i className='ri-sticky-note-line' />
                                <i className='ri-arrow-down-s-line' />
                            </a>
                            <div className={`dropdown-order ${showOrderDropdown ? 'show' : ''}`}>
                                <Link to="/Orders/OrderStatus">Order Status</Link>
                                <Link to="/Orders/OrderHistory">Order History</Link>
                            </div>
                        </li>
                        {userRole === 'Owner' && (
                            <li className='Register' id='register-tab'>
                                <Link to="/Registration">
                                    <span>Register</span>
                                    <i className="ri-login-box-line" />
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
