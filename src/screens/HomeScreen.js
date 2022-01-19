import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product/Product'
//import axios here
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Messages from '../components/Messages'

const HomeScreen = () => {
    // const[products, setProducts] = useState([])

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    useEffect(()=>{
        dispatch(listProducts())
        // async function fetchProducts(){
        //     const{data} = await axios.get('/api/products/')
        //     setProducts(data)
        // }

        // fetchProducts()
    },[dispatch])

    return (
        <div>
            <h1>Latest Product</h1>
            {
                loading ? <Loader />
                    : error ? <Messages variant="danger">{error}</Messages>

                    :

                    <Row>
                    {
                        products.map(product=>(
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}></Product>
                            </Col>
                        ))
                    }
                     </Row>
            }
            
        </div>
    )
}

export default HomeScreen
