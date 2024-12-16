import React, { useEffect, useState } from "react";
import { Col, Row, Button, Dropdown } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Meta from '../components/Meta';

function HomeScreen({ match }) {
  const keyword = match.params.keyword || "";
  const pageNumber = match.params.pageNumber || 1;

  const [filter, setFilter] = useState({ price: "", rating: "" });

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, filter));
  }, [dispatch, keyword, pageNumber, filter]);

  const handlePriceFilter = (range) => {
    setFilter((prev) => ({ ...prev, price: range }));
  };

  const handleRatingFilter = (order) => {
    setFilter((prev) => ({ ...prev, rating: order }));
  };

  return (
    <div>
      <Meta />
      <Row className="mb-4">
        <Col md={4}>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="filter-dropdown">
              Filter Products
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Header>By Price</Dropdown.Header>
              <Dropdown.Item onClick={() => handlePriceFilter("lt50")}>Below $50</Dropdown.Item>
              <Dropdown.Item onClick={() => handlePriceFilter("50to100")}>$50 - $100</Dropdown.Item>
              <Dropdown.Item onClick={() => handlePriceFilter("gt100")}>Above $100</Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Header>By Rating</Dropdown.Header>
              <Dropdown.Item onClick={() => handleRatingFilter("high")}>Highest Rated</Dropdown.Item>
              <Dropdown.Item onClick={() => handleRatingFilter("low")}>Lowest Rated</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row xs={1} md={2} className="g-4">
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </div>
  );
}

export default HomeScreen;
