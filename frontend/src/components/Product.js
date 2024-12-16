import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Link className="text-decoration-none" to={`/product/${product._id}`}>
      <Card
        className="product-card my-2"
        style={{
          width: "auto",
          height: "100%",
          borderRadius: "8px", // Rounded corners
          boxShadow: "0 2px 3px rgba(0, 0, 0, 0.2)", // Custom shadow
          overflow: "hidden", // Ensures content fits within the rounded corners
        }}
      >
        {/* Set a fixed size for the image */}
        <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
          <Card.Img
            src={product.image}
            variant="top"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <Card.Body className="product-card">
          <Card.Title as="div" style={{ minHeight: "40%" }}>
            <strong className="text-dark font-size-4">{product.name}</strong>
          </Card.Title>
          <Card.Text as="div" className="text-muted">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text style={{ color: "#1f2120", fontWeight: "400" }} as="h6">
            ${product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default Product;
