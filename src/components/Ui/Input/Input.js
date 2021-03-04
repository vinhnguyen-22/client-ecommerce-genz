import React from "react";
import { Form } from "react-bootstrap";

const Input = (props) => {
  return (
    <Form.Group controlId="formBasicEmail">
      <Form.Label>{props.Label}</Form.Label>
      <Form.Control type={props.type} placeholder={props.placeholder} />
      <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
    </Form.Group>
  );
};

export default Input;
