import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import axios from 'axios'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import products from '../products'
import { listProductDetails } from '../actions/productActions'

function ProductScreen( { match, history}) {
    
    const [qty, setQty] = useState(1)

    // code below is for fetching data from backend
    // const { id } = useParams();
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error,product} = productDetails

        useEffect(() => {            
           dispatch(listProductDetails(match.params.id))            
        }, [dispatch, match.params.id ])

        // 
        // const navigate = useNavigate();
        const addToCartHandler = () => {
            
            history.push(`/cart/${match.params.id}?qty=${qty}`)
            // console.log('add to cart: ', id, qty)
            // navigate(`/cart/${id}?qty=${qty}`)
        }

        if (loading) {
            return <Loader />
        }
        if (error) {
            return <Message variant='danger'>{error}</Message>
        }
        if (!product){
            return <Message variant='danger'>Product not found</Message>
        }


  return (
    <div> 
        <Link to='/' className='btn btn-light my-3'>
         Go Back
        </Link>

        { loading ? 
            <Loader />
            : error ? 
            <Message variant='danger'>{error}</Message>
            : (
                <Row>
                <Col md={6}>
                       <Image src={product.image} alt={product.name} fluid />
               </Col>
   
               <Col md={3}>
                   <ListGroup variant="flush">
                       <ListGroup.Item> 
                           <h3>{product.name}</h3>
                       </ListGroup.Item>
   
                       <ListGroup.Item> 
                           <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                       </ListGroup.Item>
   
                       <ListGroup.Item> 
                           Price: KShs {product.price}
                       </ListGroup.Item>
                       <ListGroup.Item> 
                           Description: {product.description}
                       </ListGroup.Item>
                   </ListGroup>
               </Col>
   
   
               <Col md={3}> 
                   <Card>
                    <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <Row>
                               <Col>Price:</Col>
                               <Col>
                                   <strong>KShs {product.price}</strong>
                               </Col>
                           </Row>
                       </ListGroup.Item>
   
                       <ListGroup.Item>
                           <Row>
                               <Col>Status:</Col>
                               <Col xs='auto' className='my-1'>
                                   {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                               </Col>
                           </Row>
                       </ListGroup.Item>

                       {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>Quantity:</Col>
                                <Col>
                                <Form.Control
                                    as="select" value={qty} onChange={(e) => setQty(e.target.value)}
                                >
                                    {
                                        // dynamic dropdown for selecting quantity
                                        [...Array(product.countInStock).keys()].map((x) => (
                                            <option value={x+1} key={x+1}>
                                                {x+1}
                                            </option>
                                        ))
                                    }


                                </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
   
                       <ListGroup.Item>
                           <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock === 0} type='button'>
                               Add to cart
                           </Button>
                       </ListGroup.Item>
                       </ListGroup>
                   </Card>
               </Col>
           </Row>
            )
        }

        
    </div>
  )
}

export default ProductScreen