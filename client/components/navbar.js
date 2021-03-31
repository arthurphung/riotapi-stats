import React from 'react'

import Nav from 'react-bootstrap/Nav'
import Navbarb from 'react-bootstrap/Navbar'

const Navbar = () => (
  <div>
    <Navbarb bg="dark" variant="dark">
      <Navbarb.Brand href="#home">
        <img
          alt=""
          src="/poro.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        LoL Stats
      </Navbarb.Brand>
    </Navbarb>
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/about">About</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/champions">Champions</Nav.Link>
      </Nav.Item>
    </Nav>
  </div>
)

export default Navbar
