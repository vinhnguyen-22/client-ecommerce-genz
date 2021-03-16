import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosAdd,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosCloudUpload,
  IoIosTrash,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategories as deleteCategoriesAction,
  getAllCategory,
  updateCategories,
} from "../../actions";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/Ui/Modal/Modal";
import AddCategoryModal from "./components/AddCategoryModal";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import "./style.css";

const Category = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);

  //UPDATE CATRGORY
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

  //Delete category
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));

    setCategoryName("");
    setCategoryImage("");
    setParentCategoryId("");

    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const renderCategories = (categories) => {
    let myCategories = [];

    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });

      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];

    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    console.log({ checked, expanded, categories, checkedArray, expandedArray });

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );

      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const upadatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );

      setExpandedArray(upadatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });

    setUpdateCategoryModal(false);
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = (e) => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
        }
      });
    }

    setDeleteCategoryModal(false);
  };

  const renderDeleteCategoryModal = () => {
    return (
      <Modal
        modalTitle="Delete Category"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "confirm",
            color: "danger",
            onClick: deleteCategories,
          },
          {
            label: "cancel",
            color: "primary",
            onClick: () => {
              alert("No");
            },
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <p key={index}>{item.name}</p>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <p key={index}>{item.name}</p>
        ))}
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="action-btn-container">
                <span>Actions: </span>
                <button onClick={handleShow}>
                  <IoIosAdd /> Add
                </button>
                <button onClick={deleteCategory}>
                  <IoIosTrash /> Delete
                </button>
                <button onClick={updateCategory}>
                  <IoIosCloudUpload /> Update
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
      </Container>
      {/* TODO AddCategory */}
      <AddCategoryModal
        show={show}
        size="lg"
        handleClose={handleClose}
        modalTitle={"Add Category"}
        categoryList={createCategoryList(category.categories)}
        handleCategoryImage={handleCategoryImage}
        parentCategoryId={parentCategoryId}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        setParentCategoryId={setParentCategoryId}
        categoryImage={categoryImage}
      />
      {/* TODO UPDATE */}
      <UpdateCategoriesModal
        show={updateCategoryModal}
        size="lg"
        handleClose={updateCategoriesForm}
        modalTitle={"Update Category"}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={createCategoryList(category.categories)}
      />
      {/* TODO Delete */}
      {renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
