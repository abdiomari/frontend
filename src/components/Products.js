import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Products({ product }) {
  return (
    <Card  className='my-3 p-3 rounded'>
        {/* backtick is used to pass a variable */}
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} />
        </Link>

        <Card.Body>
        <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
                <strong>{product.name}</strong>
            </Card.Title>
        </Link>

        <Card.Text as="div" >
            <div className='my-3'>
                {/* {product.rating} from {product.numReviews} reviews */}
                <Rating value={product.rating} text ={`${product.numReviews} reviews`} color={'#f5b0ab'} />
            </div>
        </Card.Text>

        <Card.Text as="h4" >
            Ksh {product.price}
        </Card.Text>
        
        </Card.Body>
    </Card>
  )
}

export default Products