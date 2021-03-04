import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Ui/Input/Input";

const Signup = () => {
  return (
    <Layout>
      <Container>
        <Container>
          <Row className="mt-5">
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Row>
                  <Col md={6}>
                    <Input
                      Label="First Name"
                      placeholder="First Name"
                      value=""
                      type="text"
                      onChange={() => {}}
                    />
                  </Col>

                  <Col md={6}>
                    <Input
                      Label="Last Name"
                      placeholder="Last Name"
                      value=""
                      type="text"
                      onChange={() => {}}
                    />
                  </Col>
                </Row>
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
      </Container>
    </Layout>
  );
};

export default Signup;
