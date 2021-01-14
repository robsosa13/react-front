import React from 'react'
import { Card } from 'react-bootstrap'

import PropTypes from 'prop-types'



 class Product extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Card className='my-3 p-3 rounded'>
                    <a href={`/product/${this.props.product._id}`}>
                        <Card.img src={this.props.product.image} variant='top' />

                    </a>
                </Card>

            </div>
        )
    }
}

export default Product


// const Product = ({product}) => {
//     return (
//         <Card className='my-3 p-3 rounded'>
//             <a href={`/product/${product._id}`}>
//             <Card.img src={product.image}    variant='top'/>

//             </a>
//         </Card>
//     )
// }
// export default Product
