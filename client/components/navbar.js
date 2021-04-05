import React from 'react'

import Nav from 'react-bootstrap/Nav'

const Navbar = () => (
  <div>
    <Nav justify variant="tabs" defaultActiveKey="/home">
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
