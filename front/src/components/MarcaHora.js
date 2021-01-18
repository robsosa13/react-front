import React, { Component } from 'react'
import { Container, Table, Jumbotron, Button } from 'react-bootstrap';

//import products from '../planilla/products'
class MarcaHora extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
        }
    }
    render() {

        return (
            <>
                <Container>
                    <Jumbotron>
                        <h1>Grupo Empresarial KD </h1>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                        <p>
                            This is a simple hero unit, a simple jumbotron-style component for calling
                            extra attention to featured content or information.
                        </p>
                                <p>
                                    <Button variant="primary">Ver más...</Button>
                                </p>
                    </Jumbotron>

                </Container>
            </>
        )
    }
}
export default MarcaHora