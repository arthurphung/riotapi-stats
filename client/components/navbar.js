import React from 'react'

import Nav from 'react-bootstrap/Nav'
import Navbarb from 'react-bootstrap/Navbar'

const Navbar = () => (
  <div>
    <Navbarb bg="dark" variant="dark">
      <Navbarb.Brand href="/">LoL Stats</Navbarb.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/player">PlayerChamps</Nav.Link>
      </Nav>
    </Navbarb>
  </div>
)

export default Navbar
