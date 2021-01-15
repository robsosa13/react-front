import React from 'react'
import {Row,Col,Table} from 'react-bootstrap'

import Product from '../components/Product'
import products from '../products'


  const HomeScreen = ({product}) => {
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
                <Product product={product}/>
            {/* {products.map((product)=>(
                       <tr key={product._id}>
                           <td>
                               {product.name}
                           </td>
                           <td>
                               {product.brand}
                           </td>
                           <td>
                               <img src={product.image}></img>
                               
                           </td>

                       </tr> */}
                                  
                            
                    
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