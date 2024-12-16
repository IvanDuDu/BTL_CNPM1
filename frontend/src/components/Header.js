import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { logout } from "../actions/userActions";
import "./Header.css";
import SearchBox from "./SearchBox";

const Header = ({ history }) => {
  const [navbarTransparent, setNavbarTransparent] = useState(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarTransparent(false);
    } else {
      setNavbarTransparent(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${navbarTransparent ? "transparent" : "solid"}`}>
      <Navbar
        className="fixed-top"
        expand="lg"
        collapseOnSelect
        style={{ backgroundColor: navbarTransparent ? "transparent" : "#2e3192" }}
      >
        <Container fluid className="d-flex">
          <Link className="text-decoration-none" to="/">
            <Navbar.Brand className="text-light fs-1 mx-4 fw-bolder">
              PhuongFourth
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ color: "transparent", border: "1px solid black" }}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ justifyContent: "flex-end" }}
          >
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto my-2 my-lg-0" style={{ maxHeight: "80px" }} navbarScroll>
              <Link className="text-decoration-none" to={userInfo ? "/cart" : "/login"}>
                <Nav.Link href="/cart" className="text-light">
                  <i className="fas fa-shopping-cart" style={{ margin: "2px", color: "#FFF" }}></i> Cart
                </Nav.Link>
              </Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link className="text-decoration-none" to="/login">
                  <Nav.Link href="/login" style={{ color: "#FFF" }}>
                    <i className="fas fa-user" style={{ margin: "2px", color: "#FFF" }}></i> Sign In
                  </Nav.Link>
                </Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <Link className="text-decoration-none" to="/admin/userlist">
                    <NavDropdown.Item href="/admin/userlist">Users</NavDropdown.Item>
                  </Link>
                  <Link className="text-decoration-none" to="/admin/productlist">
                    <NavDropdown.Item href="/admin/productlist">Products</NavDropdown.Item>
                  </Link>
                  <Link className="text-decoration-none" to="/admin/orderlist">
                    <NavDropdown.Item href="/admin/orderlist">Orders</NavDropdown.Item>
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
