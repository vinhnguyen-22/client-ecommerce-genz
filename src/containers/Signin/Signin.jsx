import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { login } from "../../actions";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Ui/Input/Input";
import { useDispatch } from "react-redux";

const Signin = () => {
  const dispatch = useDispatch();
  const userLogin = (e) => {
    e.preventDefault();

    const user = { email: "vinhnguyenad22@gmai.com", password: "123456" };
    dispatch(login(user));
  };

  return (
    <Layout>
      <Container>
        <Row className="mt-5">
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                Label="Email"
                placeholder="Email"
                value=""
                type="email"
                onChange={() => {}}
              />

              <Input
                Label="Password"
                placeholder="Password"
                value=""
                type="password"
                onChange={() => {}}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
