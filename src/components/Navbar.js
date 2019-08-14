import React from "react";
import {Image, Menu} from "semantic-ui-react"

const Navbar = () => (
    <Menu style={{height: '52px'}}>
        <Image src={require('../images/vth.png')} style={{height: '30px', marginTop: '10px'}}/>
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