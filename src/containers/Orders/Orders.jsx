import React from "react";
import { useState } from "react";
import { Button, Form, FormControl, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/Ui/Card/Card";
import "./style.css";
const Orders = () => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  console.log({ order });

  const onOrderUpdate = (orderId) => {
    const payload = { orderId, type };
    dispatch(updateOrder(payload));
  };

  const formatDate = (date) => {
    if (date) {
      const day = new Date(date);
      return `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
    }
    return;
  };

  return (
    <Layout sidebar>
      {order.orders.map((orderItem, index) => (
        <div className="cardOrder">
          <Card
            key={index}
            headerLeft={orderItem._id}
            style={{ marginTop: "20px", width: "90%" }}
          >
            <div
              style={{
                padding: "30px 50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div className="title">Items</div>
                {orderItem.items.map((item, index) => (
                  <div className="value" key={index}>
                    {item.productId.name}
                  </div>
                ))}
              </div>

              <div>
                <span className="title">Total Price</span>
                <br />
                <span className="value">{orderItem.totalAmount}</span>
              </div>
              <div>
                <span className="title">Payment Type</span> <br />
                <span className="value">{orderItem.paymentType}</span>
              </div>
              <div>
                <span className="title">Payment Status</span> <br />
                <span className="value">{orderItem.paymentStatus}</span>
              </div>
            </div>

            <div
              style={{
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
              }}
            >
              <div className="orderTrack">
                {orderItem.orderStatus.map((status) => (
                  <div
                    className={`orderStatus ${
                      status.isCompleted ? "active" : ""
                    }`}
                  >
                    <div
                      className={`point ${status.isCompleted ? "active" : ""}`}
                    ></div>
                    <div className="orderInfo">
                      <div className="status">{status.type}</div>
                      <div className="date">{formatDate(status.date)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Select input to apply order action */}
              <div className="manageOrder">
                <div>
                  <select
                    style={{
                      width: "200px",
                    }}
                    onChange={(e) => setType(e.target.value)}
                    className="form-control "
                  >
                    <option value={""}>Select status</option>

                    {orderItem.orderStatus.map((status) => (
                      <>
                        {!status.isCompleted ? (
                          <option key={status.type} value={status.type}>
                            {status.type}
                          </option>
                        ) : null}
                      </>
                    ))}
                  </select>
                </div>

                {/* button to confirm action*/}

                <div>
                  <button onClick={() => onOrderUpdate(orderItem._id)}>
                    confirm
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </Layout>
  );
};

export default Orders;
