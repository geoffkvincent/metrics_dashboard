import React from "react";
import { Menu, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"; 

const Navbar = () => (
  <Menu>
    <Image src={require('../images/vivint_logo.jpg')} style={{height:'30px'}} />
    {/* <Link to="/">
      <Menu.Item>
        Home
      </Menu.Item>
    </Link>
    <Link to="/about">
      <Menu.Item>
        About
      </Menu.Item>
    </Link> */}
  </Menu>
);

export default Navbar;