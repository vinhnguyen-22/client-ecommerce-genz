import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory } from "../../actions";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Ui/Input/Input";

const Category = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [categoyName, setCategoryName] = useState("");
  const [parentCategoyId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoyName);
    form.append("parentId", parentCategoyId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));

    const cat = {
      categoyName,
      parentCategoyId,
      categoryImage,
    };
    console.log(cat);

    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });

      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={categoyName}
            placeholder={"Category Name"}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <select
            className="form-control"
            value={parentCategoyId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {createCategoryList(category.categories).map((option) => (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <Input
            type="file"
            onChange={handleCategoryImage}
            className="form-control-file mt-3"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Category;
