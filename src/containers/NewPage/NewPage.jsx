import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../actions";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Ui/Input/Input";
import Modal from "../../components/Ui/Modal/Modal";
import linearCategories from "../../helper/linearCategories";

const NewPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("");

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  //Ly do ta phai co dependency la vi getInitialstate la mot asynchronous so before that it's executed all of these thing got executed that's why you're not getting the category so instead of using this use effect with an empty array

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    if (title === "") {
      alert("Title is required");
      setCreateModal(false);
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });
    console.log({ title, desc, categoryId, type, banners, products });

    dispatch(createPage(form));

    setCreateModal(false);
  };

  const onCategoryChange = (e) => {
    categories.find((category) => category._id == e.target.value);
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={"Create New Page"}
        handleClose={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              <select
                className="form-control form-control-sm"
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Page Title"}
                className="form-control-sm mt-3"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={"Page Desc"}
                className="form-control-sm"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                type="file"
                label="Choose banners image"
                onChange={handleBannerImages}
                className="form-control-file form-control-sm"
              />
            </Col>
          </Row>

          {banners.length > 0
            ? banners.map((banner, index) => (
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ))
            : null}

          <Row>
            <Col>
              <Input
                type="file"
                onChange={handleProductImages}
                multiple
                label={"Choose product image"}
                className="form-control-file form-control-sm"
              />
            </Col>
          </Row>

          {products.length > 0
            ? products.map((product, index) => (
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ))
            : null}
        </Container>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      {renderCreatePageModal()}
      <button onClick={() => setCreateModal(true)}>Create Page</button>
    </Layout>
  );
};

export default NewPage;
