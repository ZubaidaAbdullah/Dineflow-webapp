import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/Landingpage";
import Loader from "./components/Loader/Loader";
import Login from "./components/Login/login";
import Home from "./components/Dashboard/Home/Home";
import TableGrid from "./components/TableView/TableGrid";
import TableOrder from "./components/OrderList/TableOrder";
import OrdersDataContainer from "./components/Orders/OrdersDataContainer";
import MenuDetail from "./components/Menu/MenuDetail";
import Analytics from "./components/Dashboard/Analytics/Analytics";
import Ratings from "./components/Dashboard/Ratings/Ratings";
import Feedbackusers from "./components/Dashboard/Feedback/Feedbackusers";
import Main from "./components/Dashboard/Main/Main";
import Register from "./components/Register/register";
import AllOrderDetails from "./components/OrderList/allorderdetails";

const PrivateRoute = ({ element: Component }) => {
  const token = sessionStorage.getItem('token');
  return token ? <Component /> : <Navigate to="/" />;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" exact element={<LandingPage change={change} setChange={setChange} />} />
            <Route path="/login" exact element={<Login change={change} setChange={setChange} />} />
            <Route path="/home" element={<PrivateRoute element={Home} />}>
              <Route path="" element={<Main />} />
              {/* <Route path="tableview" element={<TableGrid />} />
              <Route path="cards" element={<OrdersDataContainer />} />
              <Route path="orderlist" element={<TableOrder />} />
              <Route path="menudetail" element={<MenuDetail />} /> */}
            </Route>
            <Route path="/analytics" element={<PrivateRoute element={Home} />}>
              <Route path="revenueanalytics" element={<Analytics />} />
              <Route path="ratings" element={<Ratings />} />
              <Route path="feedback" element={<Feedbackusers />} />
            </Route>
            <Route path="/" element={<PrivateRoute element={Home} />}>
              <Route path="Table" element={<TableGrid />} />
            </Route>
            <Route path="/" element={<PrivateRoute element={Home} />}>
              <Route path="MenuUpdate" element={<MenuDetail />} />
            </Route>
            <Route path="/Orders" element={<PrivateRoute element={Home} />}>
              <Route path="OrderHistory" element={<AllOrderDetails/>} />
              <Route path="OrderStatus" element={<OrdersDataContainer />} />
            </Route>
            <Route path="/" element={<PrivateRoute element={Home} />}>
              <Route path="Registration" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </Fragment>
  );
};

export default App;
