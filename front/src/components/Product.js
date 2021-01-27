import React from 'react'
import { Card,Table ,tr,td} from 'react-bootstrap'

// import PropTypes from 'prop-types'

//  class Product extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <div>
//                 <Card className='my-3 p-3 rounded'>
//                     <a href={`/product/${this.props.product._id}`}>
//                         <Card.img src={this.props.product.image} variant='top' />

//                     </a>
//                 </Card>

//             </div>
//         )
//     }
// }

// export default Product


const Product = ({ product }) => {
    return (
        // <Card className='my-3 p-3 rounded'>
        //     <a key={product._id}>

        //             <h5>{product.name}</h5>
        //             <h5>{product.brand}</h5>
        //     </a>
        // </Card>
    
                <tr>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                </tr>
    )
}
export default Product
