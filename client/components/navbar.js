import React from 'react'

import Nav from 'react-bootstrap/Nav'
import NavbarBS from 'react-bootstrap/Navbar'

const Navbar = () => (
  <>
    <NavbarBS bg="primary" variant="dark">
      <NavbarBS.Brand href="/">
        <img
          src="/poroLogo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Porolytix logo"
        />
      </NavbarBS.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
      </Nav>
    </NavbarBS>
    {/* <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/about">About</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/champions">Champions</Nav.Link>
      </Nav.Item>
    </Nav> */}
  </>
)

export default Navbar
