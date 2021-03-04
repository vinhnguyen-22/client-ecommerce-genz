import React from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";

const Home = () => {
  return (
    <div>
      <Layout>
        <Jumbotron
          className="text-center"
          style={{ margin: "5rem", backgroundColor: "whitesmoke" }}
        >
          <h1>Welcome To Admin Dashboard</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
            rem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
            hic. Est voluptates, minus nemo ea odio sit accusamus illo commodi
            asperiores, et perspiciatis. Aliquid esse obcaecati, mollitia beatae
            repellendus ullam!
          </p>
        </Jumbotron>
      </Layout>
    </div>
  );
};

export default Home;
