import React from 'react'
import { Navbar ,Nav,Container } from 'react-bootstrap'

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>

                <Navbar.Brand href="#home">Grupo Empresarial KD</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="">HOME</Nav.Link>
                        <Nav.Link href="">RRHH</Nav.Link>
                 
                    </Nav>
       
                </Navbar.Collapse>
                                    
                </Container>
            </Navbar>
        </>

    )
}

export default Header
