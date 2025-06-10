import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import './home.css';
import Sidebar from '../../Sidebar/Sidebar';
import Allorders from '../../Orders/Allorders';
import Navbar from '../Navbar/Navbar';
import Main from '../Main/Main';

const Home = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    const hideOrdersContainerPaths = [
        "/Table", 
        "/MenuUpdate", 
        "/Orders/OrderStatus", 
        "/Orders/OrderHistory", 
        "/Registration", 
        "/registration"
    ];
    const shouldHideOrdersContainer = hideOrdersContainerPaths.includes(location.pathname);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className="home">
            <div className={`sidebarr ${shouldHideOrdersContainer ? 'sidebarr-expanded' : ''}`}>
                <Sidebar />
            </div>
            <div className="homeContainer">
                <Navbar />
                <div className="graphs">
                    <Outlet />
                </div>
            </div>
            {!shouldHideOrdersContainer && (
                <div className="ordersContainer">
                    <Allorders />
                </div>
            )}
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default Home;
