import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import Messages from '../components/Messages'
import CheckOutStep from './CheckOutStep'
import { Link } from 'react-router-dom'

const PlaceOrderScreen = ({history}) => {
    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item)=>acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 10 : 0).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const placeOrder = (e) => {
        e.preventDefault()
        console.log('click')
    }

    return (

        <div>
            <CheckOutStep step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping:</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode}
                                {'  '}
                                {cart.shippingAddress.country},
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items:</h2>
                            {cart.cartItems.length === 0 ? 
                            <Messages variant='info'>
                                Your Cart is Empty.
                            </Messages>: (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} x {item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button type='button' className='btn-block'
                                disabled={cart.cartItems === 0} onClick={placeOrder}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>                
                    </Card>                    
                </Col>
                
            </Row>
        </div>
    )
}

export default PlaceOrderScreen