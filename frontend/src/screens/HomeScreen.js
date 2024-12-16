import React, { useEffect, useState } from "react";
import { Carousel, Col, Dropdown, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from '../components/Meta';
import Paginate from "../components/Paginate";
import Product from "../components/Product";

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
      
      {/* Slider Section */}
      <Carousel className="mb-4">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/slider/slider1.jpg"
            alt="First slide"
            style={{ maxHeight: "570px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Welcome to Our Store</h3>
            <p>Discover the best products at unbeatable prices!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/slider/slider2.jpg"
            alt="Second slide"
            style={{ maxHeight: "570px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Latest Deals</h3>
            <p>Don't miss out on our exclusive offers and discounts.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/slider/slider3.jpg"
            alt="Third slide"
            style={{ maxHeight: "570px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Quality Products</h3>
            <p>Shop confidently with our top-rated products.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

  <h1 className="d-flex justify-content-center align-items-center" >OUR PRODUCTS</h1>

      {/* Filter Section */}
      <Row className="mb-4">
        <Col md={4}>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="filter-dropdown">
              Filter Products
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Header>By Price</Dropdown.Header>
              <Dropdown.Item onClick={() => handlePriceFilter("lt50")}>
                Below $50
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePriceFilter("50to100")}>
                $50 - $100
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePriceFilter("gt100")}>
                Above $100
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Header>By Rating</Dropdown.Header>
              <Dropdown.Item onClick={() => handleRatingFilter("high")}>
                Highest Rated
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleRatingFilter("low")}>
                Lowest Rated
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Product List Section */}
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
