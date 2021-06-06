import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/Ui/Card/Card";
import "./style.css";
const Orders = () => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  console.log({ order });

  return (
    <Layout sidebar>
      <Card headerLeft="ORDER_ID">
        <div
          style={{
            padding: "50px 50px",
          }}
        >
          <div className="orderTrack">
            <div className="orderStatus">
              <div className="point">
                <div className="orderInfo">
                  <div className="status">Ordered</div>
                  <div className="state">Fri, 2020</div>
                </div>
              </div>
            </div>

            <div className="orderStatus">
              <div className="point">
                <div className="orderInfo">
                  <div className="status">Packed</div>
                  <div className="state">Fri, 2020</div>
                </div>
              </div>
            </div>

            <div className="orderStatus">
              <div className="point">
                <div className="orderInfo">
                  <div className="status">Shipped</div>
                  <div className="state">Fri, 2020</div>
                </div>
              </div>
            </div>

            <div className="orderStatus">
              <div className="point">
                <div className="orderInfo">
                  <div className="status">Delivered</div>
                  <div className="state">Fri, 2020</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default Orders;
