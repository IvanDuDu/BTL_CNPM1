import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { logout } from "../actions/userActions";
import "./Header.css";
import SearchBox from "./SearchBox";

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <header className="header solid">
      <Navbar
        className="fixed-top p-3"
        collapseOnSelect
        expand="lg"
        style={{
          backgroundColor: "#0a1128", // Solid color for the header
        }}
      >
        <Container fluid className="d-flex align-items-center">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand text-light fs-3 fw-bold me-5">
            PhuongFourth
          </Link>

          {/* SearchBox Component */}
          <div className="d-none d-lg-block flex-grow-1">
            <Route render={({ history }) => <SearchBox history={history} />} />
          </div>

          {/* Navbar Toggle for Mobile */}
          <Navbar.Toggle aria-controls="navbar-nav" />

          {/* Right-aligned Navigation */}
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav className="align-items-center">
              {/* Cart Link */}
              <Link to={userInfo ? "/cart" : "/login"} className="nav-link text-light">
                <i className="fas fa-shopping-cart"></i> Cart
              </Link>

              {/* User Links */}
              {userInfo ? (
                <NavDropdown
                  title={<span className="text-light">{userInfo.name}</span>}
                  id="username"
                  className="text-light"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" className="nav-link text-light">
                  <i className="fas fa-user"></i> Sign In
                </Link>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={<span className="text-light">Admin</span>}
                  id="adminmenu"
                  className="text-light"
                >
                  <Link to="/admin/userlist" className="dropdown-item">
                    Users
                  </Link>
                  <Link to="/admin/productlist" className="dropdown-item">
                    Products
                  </Link>
                  <Link to="/admin/orderlist" className="dropdown-item">
                    Orders
                  </Link>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
