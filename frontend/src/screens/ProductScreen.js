import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Image, Button, Form, ListGroup,Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listProductDetails, listProducts, createProductReview } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
    dispatch(listProducts());
  }, [dispatch, match, successProductReview]);

  const relatedProducts = products.filter(
    (p) =>
      product?.name?.split(" ")[0]?.toLowerCase() ===
      p.name?.split(" ")[0]?.toLowerCase()
  );

  const addToCartHandler = () => {
    dispatch(addToCart(match.params.id, qty));
    setShowModal(true);  // Hiển thị thông báo
  };

  // Mua hàng (thêm vào giỏ hàng và điều hướng)
  const buyNowHandler = () => {
    dispatch(addToCart(match.params.id, qty));
    history.push("/cart");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  <p>{product.description}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                        variant="success"
                        disabled={product.countInStock === 0}
                      >
                        Add to Cart
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        onClick={buyNowHandler}
                        className="btn-block"
                        type="button"
                        variant="primary"
                        disabled={product.countInStock === 0}
                      >
                        Buy this Item
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2 className="my-4">Reviews</h2>
              {product.reviews?.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews?.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating" className="py-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment" className="my-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Product Added</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{product.name} has been added to your cart.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Continue Shopping
              </Button>
              <Button variant="primary" onClick={() => history.push("/cart")}>
                Go to Cart
              </Button>
            </Modal.Footer>
          </Modal><Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Product Added</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{product.name} has been added to your cart.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Continue Shopping
              </Button>
              <Button variant="primary" onClick={() => history.push("/cart")}>
                Go to Cart
              </Button>
            </Modal.Footer>
          </Modal>

          <h2 className="my-4">Related Products</h2>
          {relatedProducts.length === 0 ? (
            <Message>No Related Products</Message>
          ) : (
            <Row className="overflow-auto flex-nowrap">
              {relatedProducts.map((related) => (
                <Col
                  key={related._id}
                  xs={8}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-3"
                >
                  <Card className="h-100 text-center">
                    <Link to={`/product/${related._id}`}>
                      <Card.Img
                        src={related.image}
                        variant="top"
                        alt={related.name}
                        className="p-3"
                      />
                    </Link>
                    <Card.Body>
                      <Card.Title>{related.name}</Card.Title>
                      <Card.Text>${related.price}</Card.Text>
                      <Link
                        to={`/product/${related._id}`}
                        className="btn btn-primary"
                      >
                        View Product
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default ProductScreen;
