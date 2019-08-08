import React from "react";
import { Menu, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"; 

const Navbar = () => (
  <Menu>
    <Image src={require('../images/vth.png')} style={{height:'40px'}} />
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