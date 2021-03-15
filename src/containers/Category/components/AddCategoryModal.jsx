import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../../../components/Ui/Input/Input";
import Modal from "../../../components/Ui/Modal/Modal";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    categoryList,
    handleCategoryImage,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
  } = props;

  return (
    <Modal show={show} handleClose={handleClose} modalTitle={modalTitle}>
      <Row>
        <Col>
          <Input
            className="form-control"
            value={categoryName}
            placeholder={"Category Name"}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Col>

        <Col>
          <select
            className="form-control form-control"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {categoryList.map((option) => (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      <Row>
        <Col>
          <Input
            type="file"
            onChange={handleCategoryImage}
            className="form-control-file  mt-3"
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default AddCategoryModal;
