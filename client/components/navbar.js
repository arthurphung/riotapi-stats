import React from 'react'

import Nav from 'react-bootstrap/Nav'

const Navbar = () => (
  <div>
    <h1>LoL Stats</h1>
    <Nav defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/about">About</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/champion">Champion</Nav.Link>
      </Nav.Item>
    </Nav>
  </div>
)

export default Navbar
