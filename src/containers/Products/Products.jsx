import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProductById, getInitialData } from "../../actions";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/Ui/Card/Card";
import Input from "../../components/Ui/Input/Input";
import Modal from "../../components/Ui/Modal/Modal";
import { generatePublicUrl } from "../../urlConfig";

import "./style.css";

const Products = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    setProductPictures("");
  };

  useEffect(() => {
    console.log("update");
  }, [product]);

  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    setName("");
    setQuantity("");
    setPrice("");
    setDescription("");
    setCategoryId([]);
    setProductPictures("");

    for (let pic of productPictures) {
      form.append("productPictures", pic);
    }

    dispatch(addProduct(form)).then((result) => {
      if (result) {
        dispatch(getInitialData());
      }
    });
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
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

  const renderProduct = () => {
    return (
      <Table responsive="sm" style={{ fontSize: "12" }} hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th colSpan="2" style={{ textAlign: "center" }}>
              control
            </th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <button
                      className="Button"
                      style={{ backgroundColor: "cornflowerblue" }}
                      onClick={() => showProductDetailsModal(product)}
                    >
                      Info
                    </button>
                  </td>
                  <td>
                    <button
                      className="Button"
                      style={{ background: "coral" }}
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add new product"}
        onSubmit={submitProductForm}
      >
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
          className="form-control-file"
        />

        <Card
          title="Image"
          type="list"
          style={{ marginBottom: "20px", padding: "10px" }}
        >
          {productPictures.length > 0
            ? productPictures.map((pic, index) => (
                <div key={index}>{pic.name}</div>
              ))
            : null}
        </Card>

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
      </Modal>
    );
  };

  const handleCloseProductDetailModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) return null;

    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailModal}
        modalTitle={"Product Detail"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label htmlFor="" className="key">
              Name
            </label>
            <p className="info">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label htmlFor="" className="key">
              Price
            </label>
            <p className="info">{productDetails.price}$</p>
          </Col>
          <Col md="6">
            <label htmlFor="" className="key">
              Quantity
            </label>
            <p className="info">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label htmlFor="" className="key">
              Category
            </label>
            <p className="info">{productDetails.category.name}</p>
          </Col>
          <Col md={{ span: 12 }}>
            <label htmlFor="" className="key">
              Description
            </label>
            <p className="info">{productDetails.description}</p>
          </Col>
        </Row>

        <label className="key">Product Pictures</label>
        <Row>
          <Col style={{ display: "flex" }}>
            {productDetails.productPictures.map((pic) => (
              <div className="product-img-container">
                <img src={generatePublicUrl(pic.img)} alt="photo" />
              </div>
            ))}
          </Col>
        </Row>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
              <button
                onClick={handleShow}
                className="Button"
                style={{ backgroundColor: "#555" }}
              >
                Add
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProduct()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
