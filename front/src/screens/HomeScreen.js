import React, { useState, useEffect } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
//import Product from '../components/Product'
import products from '../products'
import Rating from '../components/Rating'
import axios from 'axios'

const HomeScreen = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('https://reqres.in/api/users')
            //const result = JSON.stringify({ data });
            console.log('test :', data)
            setProducts(data)
        }
        fetchProducts()
    }, [])

   
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <Product product={product}/> */}
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>
                                <Link to={`/planillas/${product._id}`} >  {product.name}</Link>

                            </td>
                            <td>
                                {product.brand}
                            </td>
                            <td>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`} />
                            </td>
                            <td>
                                {product.test.nombre}

                            </td>

                        </tr>))}



                    {/* <h1>Latest Prodcuts</h1>
                <Row> 
                    {products.map((product)=>(
                        <Col sm={12} md={6} lg={4} xl={3}>
                                    <h2>{product.name}</h2>
                            <Product product={product}/>
                        </Col>
                    ))}
                    
                </Row> */}
                    {/* <tr>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                </tr>
             */}
                </tbody>
            </Table>

            {/* <h1>Latest Prodcuts</h1>
                <Row> 
                    {products.map((product)=>(
                        <Col sm={12} md={6} lg={4} xl={3}>
                                    <h2>{product.name}</h2>
                            <Product product={product}/>
                        </Col>
                    ))}
                    
                </Row> */}

        </>
    )
}
export default HomeScreen