import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Ui/Input/Input";

const Products = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price");
    form.append("description", description);
    form.append("category", category);
    form.append("productPictures", productPictures);

    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleProductPictures = (e) => {
    setProductPictures(e.target.files[0]);
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

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="Name"
            value={name}
            placeholder={"Product Name"}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Quantity"
            type="number"
            value={quantity}
            placeholder={"Quantity"}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            label="Product Price"
            type="number"
            value={price}
            placeholder={"Product Price"}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="Description"
            value={description}
            placeholder={"Description"}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            label="Pictures"
            type="file"
            onChange={handleProductPictures}
            className="form-control-file "
          />

          <select
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {createCategoryList(category.categories).map((option) => (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            ))}
          </select>
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

export default Products;
