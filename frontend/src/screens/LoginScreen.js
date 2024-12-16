import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: Password
  const [alert, setAlert] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setStep(2);
      setAlert(""); // Clear any alert
    } else {
      setAlert("Please enter a valid email address");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.length === 0) {
      setAlert("Please enter your password.");
    } else {
      dispatch(login(email, password));
    }
  };

  return (
    <div className="mt-5">

    <FormContainer>
      <h1>Sign In</h1>
      {alert && <Message variant="danger">{alert}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {step === 1 && (
        <Form onSubmit={handleEmailSubmit}>
          <Form.Group className="my-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Next
          </Button>
        </Form>
      )}
      {step === 2 && (
        <Form onSubmit={handlePasswordSubmit}>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Form>
      )}

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
    </div>

  );
};

export default LoginScreen;
