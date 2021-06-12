import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signup } from "../../actions";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Ui/Input/Input";

const Signup = () => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!user.loading) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }, [user.loading]);

  const userSignup = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signup(user));
  };

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  if (user.loading) {
    return <p>Loading...!</p>;
  }
  return (
    <Layout>
      {user.message}
      <Container>
        <Container>
          <Row style={{ marginTop: "70px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userSignup}>
                <Row>
                  <Col md={6}>
                    <Input
                      Label="First Name"
                      placeholder="First Name"
                      value={firstName}
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Col>

                  <Col md={6}>
                    <Input
                      Label="Last Name"
                      placeholder="Last Name"
                      value={lastName}
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Input
                  Label="Email"
                  placeholder="Email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  Label="Password"
                  placeholder="Password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
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
