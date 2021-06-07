import React from "react";
import { Button, Container, Modal } from "react-bootstrap";
import "./style.css";
const newModal = (props) => {
  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={props.show}
      size={props.size}
      onHide={props.handleClose}
    >
      <Modal.Header closeLabel closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.buttons ? (
          props.buttons.map((btn, index) => (
            <Button variant={btn.color} key={index} onClick={btn.onClick}>
              {btn.label}
            </Button>
          ))
        ) : (
          <>
            <Button
              variant="primary"
              {...props}
              className="btn-sm"
              onClick={props.onSubmit}
            >
              Save Changes
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default newModal;
