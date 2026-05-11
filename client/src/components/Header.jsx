import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
} from 'reactstrap';
import Logo from '../assets/logo-t.png';
import { Link } from 'react-router-dom';
import { FaHome,FaUserAlt,FaSignOutAlt   } from "react-icons/fa";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <Container fluid>
            <div>
                <Navbar className='navigation' light expand='md'>
                    <NavbarBrand href="/">
                        <img src={Logo} width='150px' height='75px' alt="logo" />
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ms-auto" navbar>
                            <NavItem className='navitem'>
                                <Link to="/register"><FaHome /></Link>
                            </NavItem>
                            <NavItem className='navitem'>
                                <Link to="/register"><FaUserAlt /></Link>
                            </NavItem>
                            <NavItem className='navitem'>
                                <Link to="/register"><FaSignOutAlt /></Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        </Container>
    )
}
export default Header;