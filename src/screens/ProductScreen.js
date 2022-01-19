import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating/Rating'
//import axios here
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Messages from '../components/Messages'

const ProductScreen = ({match, history}) => {
    const[qty, setQty] = useState(1)

    // const[product, setProduct] = useState([])

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails


    useEffect(()=>{
        // async function fetchProduct(){
        //     const{data} = await axios.get(`/api/products/${match.params.id}`)
        //     setProduct(data)
        // }

        // fetchProduct()
        dispatch(listProductDetails(match.params.id))
    },[dispatch, match])


    // const product = products.find((p)=>p._id === match.params.id)

    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>

            {
                loading ? 
                    <Loader />
                    : error
                    ? <Messages variant='danger'>{error}</Messages>
                    :(
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt="product-image" fluid></Image>
                            </Col>

                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Price: ${product.price}
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
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    <strong>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {
                                            product.countInStock > 0 &&(
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>

                                                        <Col xs="auto" className="my-1">
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange = {(e)=>setQty(e.target.value)}
                                                            >

                                                                {
                                                                    [...Array(product.countInStock).keys()].map((x)=>(
                                                                        <option key={x+1} value={x+1}>
                                                                            {x+1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )
                                        }

                                        <ListGroup.Item>
                                            <Button
                                                onClick={addToCartHandler}
                                                className='btn-block text-center' 
                                                disabled={product.countInStock === 0} 
                                                type="button">
                                                    Add To Cart
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
