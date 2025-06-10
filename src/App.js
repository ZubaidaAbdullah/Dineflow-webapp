import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader/Loader";
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
  return token ? <Component /> : <Navigate to="/home" />;
};

const AppRoutes = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 2500);
  }, [navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/home" element={<PrivateRoute element={Home} />}>
            <Route path="" element={<Main />} />
          </Route>
          <Route path="/analytics" element={<PrivateRoute element={Home} />}>
            <Route path="revenueanalytics" element={<Analytics />} />
            <Route path="ratings" element={<Ratings />} />
            <Route path="feedback" element={<Feedbackusers />} />
          </Route>
          <Route path="/" element={<PrivateRoute element={Home} />}>
            <Route path="Table" element={<TableGrid />} />
            <Route path="MenuUpdate" element={<MenuDetail />} />
            <Route path="Registration" element={<Register />} />
          </Route>
          <Route path="/Orders" element={<PrivateRoute element={Home} />}>
            <Route path="OrderHistory" element={<AllOrderDetails />} />
            <Route path="OrderStatus" element={<OrdersDataContainer />} />
          </Route>
        </Routes>
      )}
    </Fragment>
  );
};

const App = () => (
  <BrowserRouter basename="/">
    <AppRoutes />
  </BrowserRouter>
);

export default App;
