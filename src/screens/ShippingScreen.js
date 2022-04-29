import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { saveShippingAddress } from '../actions/cartActions'
import CheckOutStep from './CheckOutStep'

const ShippingScreen = ({history}) => {

    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }

    return (

        <FormContainer>
            <CheckOutStep step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Address'
                        value={address ? address : ''}
                        onChange={(e)=>setAddress(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your City'
                        value={city ? city : ''}
                        onChange={(e)=>setCity(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>postalCode</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter Your postalCode'
                        value={postalCode ? postalCode : ''}
                        onChange={(e)=>setPostalCode(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Country'
                        value={country ? country : ''}
                        onChange={(e)=>setCountry(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>

                <br />
                <Button type="submit" variant="primary">Submit</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen