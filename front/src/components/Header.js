import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >Grupo Empresarial KD</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/Home'>
                                <Nav.Link >Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/planillas'>
                                <Nav.Link >RRHH</Nav.Link>
                            </LinkContainer>
                        </Nav>

                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>

    )
}

export default Header
