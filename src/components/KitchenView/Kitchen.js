import React, { useState, useEffect } from "react";
import "./kitchen.css";
import styled from "styled-components";
import Arrowrightimg from "../../assets/Kitchenimgs/arrowright.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Modal } from "@mui/base/Modal";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Kitchen = () => {
  const [kitchenOrders, setKitchenOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [timers, setTimers] = useState({});
  const [orderId, setOrderId] = useState(null);

  const startOrderTimer = (orderId) => {
    const startTime = Date.now();
    const intervalId = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      setTimers((prevTimers) => ({
        ...prevTimers,
        [orderId]: { elapsedTime, intervalId, startTime },
      }));
    }, 1000);
    setTimers((prevTimers) => ({
      ...prevTimers,
      [orderId]: { elapsedTime: 0, intervalId, startTime },
    }));
  };

  const stopOrderTimer = (orderId) => {
    clearInterval(timers[orderId].intervalId);
    setTimers((prevTimers) => ({
      ...prevTimers,
      [orderId]: { ...prevTimers[orderId], intervalId: null },
    }));
  };

  useEffect(() => {
    // Fetch orders and their details from MongoDB Atlas
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/GetOrders"
        );
        const orders = await response.json();

        const ordersWithDetails = await Promise.all(
          orders.map(async (order) => {
            const orderDetailsResponse = await fetch(
              "https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/GetOrderDetails",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId: order.Order_ID }),
              }
            );
            const orderDetails = await orderDetailsResponse.json();
            const orderDetail = orderDetails[0] || {};
            return { ...order, ...orderDetail };
          })
        );

        console.log("Fetched Orders with Details:", ordersWithDetails); // Debugging line
        setKitchenOrders(ordersWithDetails);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleArrowClick = async (orderId) => {
    try {
      const response = await fetch(
        "https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/GetOrderDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        }
      );
      const data = await response.json();
      console.log("Fetched Order Details:", data); // Debugging line
      setSelectedOrder(data[0]); // Assuming data is an array with one object
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const updateOrderStatus = async (newStatus) => {
    if (selectedOrder) {
      console.log("Updating Order Status:", {
        orderId: selectedOrder.Order_ID,
        status: newStatus,

      }); // Debugging line
      closeModal();
      try {
        const response = await fetch(
          "https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/GetOrderDetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ updateStatus: { orderId: selectedOrder.Order_ID, status: newStatus } }),
          }
        );
        const result = await response.json();
        console.log("Update Response:", result); // Debugging line

        if (result.status === "Success") {
          const updatedOrder = { ...selectedOrder, Order_Status: newStatus };
          setSelectedOrder(updatedOrder);
          setKitchenOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.Order_ID === updatedOrder.Order_ID ? updatedOrder : order
            )
          );

          if (newStatus === "In Progress") {
            startOrderTimer(selectedOrder.Order_ID);
          } else if (newStatus === "Complete") {
            stopOrderTimer(selectedOrder.Order_ID);
          }
        } else {
          console.error("Error updating order status:", result.message);
        }
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };


  const formatElapsedTime = (elapsedTime) => {
    if (elapsedTime >= 3600) {
      const hours = Math.floor(elapsedTime / 3600);
      const minutes = Math.floor((elapsedTime % 3600) / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else if (elapsedTime >= 60) {
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      return `${minutes} minute${minutes > 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''}`;
    } else {
      return `${elapsedTime} second${elapsedTime !== 1 ? 's' : ''}`;
    }
  };

  return (
    <Containerc>
      <div className="kitchenborder">
        <Rowc>
          {kitchenOrders && kitchenOrders.length > 0 ? (
            kitchenOrders.map(
              (
                {
                  table_number,
                  Order_ID,
                  Order_Status,
                  Arrivaltime,
                  Preparetime,
                  Order_Details,
                },
                index
              ) => (
                <Colc className="orders" key={index}>
                  <div
                    className="orderhead"
                    style={{
                      backgroundColor:
                        Order_Status === "In Progress"
                          ? "#f72b50"
                          : Order_Status === "Start"
                            ? "#2F4CDD"
                            : Order_Status === "Complete"
                              ? "#2BC155"
                              : "grey",
                    }}
                  >
                    <div className="set1">
                      <p style={{ fontWeight: "500", fontSize: "21px" }}>
                        {" "}
                        Orders{" "}
                      </p>
                      <p style={{ fontSize: "12px" }}>#{Order_ID} </p>
                    </div>
                    <div className="set1">
                      <p
                        style={{
                          textAlign: "center",
                          display:
                            Order_Status === "In Progress" ? "block" : "none",
                        }}
                      >
                        {" "}
                        {Preparetime}{" "}
                      </p>
                      <p className="status"> {Order_Status} </p>
                    </div>
                  </div>
                  <div>
                    <Status> Arrival Time: {Arrivaltime}</Status>
                    <Status>Timer: {timers[Order_ID] ? formatElapsedTime(timers[Order_ID].elapsedTime) : "0 seconds"}</Status>
                    <div>
                      <ul className="orderitemsK" style={{ marginBottom: "0rem" }}>
                        {Order_Details && Order_Details.length > 0 ? (
                          Order_Details.slice(0, 4).map((item, id) => (
                            <li className="item" key={id}>
                              <div className="items">
                                <span> {item.Item_Name}</span>
                              </div>
                            </li>
                          ))
                        ) : (
                          <p>No items in this order</p>
                        )}
                      </ul>

                      <div style={{ float: 'right' }}>

                        <button style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                          onClick={() => handleArrowClick(Order_ID)}> <MoreHorizIcon style={{ color: '#1c4656' }} fontSize="large" /> </button>
                      </div>
                    </div>

                  </div>
                </Colc>
              )
            )
          ) : (
            <p>No orders available</p>
          )}
        </Rowc>
      </div>
      <StyledModal open={isModalOpen} onClose={closeModal}>
        {/* Modal Content */}
        <ModalContent>
          {/* Display order details */}
          <Row
            style={{
              height: "100%",
              margin: "0px",
              width: "1329px",
              justifyContent: "space-evenly",
              alignItems: 'center',
              padding: '30px 0px'
            }}
          >
            <Col
              sm={4}
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 11px 0px #0000001F",
                justifyContent: "space-evenly",
                borderRadius: "20px",
                backgroundColor: "white",
                height: '100%'
              }}
            >
              <div>
                <p className="orderD"> Order ID: {selectedOrder?.Order_ID}</p>
              </div>
              <div className="ordernote">
                <h2> Order Note </h2>
                <p>{selectedOrder?.Order_Note}</p>
              </div>
            </Col>
            <Col sm={7} className="orderDetail">
              <div>
                <div className="orderD1">
                  <p style={{ paddingLeft: "25px" }}> Items</p>
                  <div className="orderD2">
                    <p>Qty</p>
                    <p>Price</p>
                    <p>Total Price</p>
                  </div>
                </div>
                {selectedOrder &&
                  selectedOrder.Order_Details &&
                  selectedOrder.Order_Details.length > 0 ? (
                  selectedOrder.Order_Details.map((item, id) => (
                    <div key={id} className="orderD1">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1pc",
                        }}
                      >
                        <p style={{ fontWeight: 'normal' }}>{item.Item_Name}</p> {/* Render item name */}
                      </div>
                      <div className="orderD2" style={{ fontWeight: 'normal' }}>
                        <p>{item.Item_Qty}x</p>
                        <p>Rs {item.Item_Price}</p>
                        <p>Rs {item.Total_Price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items in this order</p>
                )}
              </div>
              <div className="buttonsmodal">
                <div>
                  <CloseButton
                    onClick={() =>
                      updateOrderStatus(
                        selectedOrder.Order_Status === "Start"
                          ? "In Progress"
                          : "Complete"
                      )

                    }
                  >
                    {selectedOrder?.Order_Status === "Start"
                      ? "Start Order"
                      : "Complete Order"}
                  </CloseButton>
                </div>
                <div>
                  <CloseButton
                    style={{ backgroundColor: "red" }}
                    onClick={closeModal}
                  >
                    Close
                  </CloseButton>
                </div>
              </div>
            </Col>
          </Row>
        </ModalContent>
      </StyledModal>
    </Containerc>
  );
};

export default Kitchen;

const Status = styled.div`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 12.1px;
  text-align: left;
  color: black;
  opacity: 0.63;
  padding-top: 7px;
  padding-left: 20px;
`;

const Containerc = styled.div``;

const Rowc = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  gap: 5pc;
  padding: 30px;
  margin-left: 6%;
  align-items: center;
`;

const Colc = styled.div``;

const Arrowright = styled.img`
  width: 30px;
  cursor: pointer;
`;

// Styled modal with custom width and centered position
const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: transparent;
  backdrop-filter: blur(5px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  & .modal-content {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 1000px;
    padding: 16px;
  }
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 1329px;
  padding: 15pxpx;
  height: 630px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
  &:focus {
    outline: none;
  }
`;
