import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4 gap-3">
      <Nav.Item>
        {step1 ? (
          <Link className=" text-decoration-none nav-link text-primary" to="/login">
            Home
          </Link>
        ) : (
          <span className=" nav-link text-muted">Sign In</span>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Link className=" text-decoration-none nav-link text-primary" to="/shipping">
            Shipping
          </Link>
        ) : (
          <span className=" nav-link text-muted">Shipping</span>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Link className=" text-decoration-none nav-link text-primary" to="/payment">
            Payment
          </Link>
        ) : (
          <span className=" nav-link text-muted">Payment</span>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <Link className=" text-decoration-none nav-link text-primary" to="/placeorder">
            Place Order
          </Link>
        ) : (
          <span className=" nav-link text-muted">Place Order</span>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
