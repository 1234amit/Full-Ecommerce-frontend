import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../../actions/userActions'
const Header = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // logout section
    const dispatch = useDispatch()

    const logoutHandler = () =>{
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">AmitShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={NavLink} to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username">         
                                <Nav.Link as={NavLink} to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </Nav.Link>

                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ):(
                            <Nav.Link as={NavLink} to="/login"><i className="fas fa-sign-in-alt"></i> Login</Nav.Link>
                        )}
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
