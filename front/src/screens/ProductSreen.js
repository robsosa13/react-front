import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, CardColumns } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const ProductSreen = ({ match }) => {
    const product = products.find((p) => p._id === match.params.id)
    console.log(product)
    return (
        <>
            <Link className='btn btn-dark my-3' to='/planillas'>Atras</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item >
                            <h3>{product.name}</h3>

                        </ListGroup.Item>
                        <ListGroup.Item >
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item >
                            Descripton:  {product.description}
                        </ListGroup.Item>
                        <ListGroup.Item >
                            Price:  <h3>{product.price}</h3>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item >
                                <Row>
                                    <Col>
                                        Price:
                              </Col>
                                    <Col>
                                    <strong>{product.price}</strong>
                                     
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                            <ListGroup.Item >
                           
                                <Row>
                                    <Col>
                                        status:
                              </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Stock'}
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                            <ListGroup.Item variant='flush'>
                                <Button className='btn-clock' type='button' disabled={product.countInStock===0}> Add to Cart  </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductSreen
