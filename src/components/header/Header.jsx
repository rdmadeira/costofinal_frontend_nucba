import React from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../../assets/logo.jpg';

const CustomNavLink = styled(Nav.Link)`
  padding: var(--bs-navbar-nav-link-padding-x);
`;

const Header = () => {
  return (
    <Navbar variant="dark" bg="dark" expand="sm">
      <Container fluid={true}>
        <Navbar.Brand href="./">
          <img src={Logo} alt="Brand Logo" width="30%" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav defaultActiveKey="/home" className="flex-sm-row" as="ul">
            <Nav.Item as="li" bsPrefix="nav-item">
              <CustomNavLink>Home</CustomNavLink>
            </Nav.Item>
            <Nav.Item as="li">
              <CustomNavLink>Products</CustomNavLink>
            </Nav.Item>
            <Nav.Item as="li">
              <CustomNavLink>Carrito</CustomNavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
