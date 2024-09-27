import React, { useContext } from 'react'
import LoginBtn from '../LoginSignUp/Model'
import AccountMenu from './Profile'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NameContext } from '../LoginSignUp/LoginSignUp';

function NavigationBar() {
  const { name } = useContext(NameContext)
  const userName = name || localStorage.getItem('username')

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">{!userName ? "Gallery App" : userName}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/gallery">Gallery</Nav.Link>
            <Nav.Link href="/videos">Videos</Nav.Link>
          </Nav>
          <Nav>
            {
              !userName ? <LoginBtn />
              : <AccountMenu />
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;