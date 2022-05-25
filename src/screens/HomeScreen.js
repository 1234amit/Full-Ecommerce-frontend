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
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'


const HomeScreen = ({history}) => {
    // const[products, setProducts] = useState([])

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    let keyword = history.location.search

    useEffect(()=>{
        dispatch(listProducts(keyword))
        // async function fetchProducts(){
        //     const{data} = await axios.get('/api/products/')
        //     setProducts(data)
        // }

        // fetchProducts()
    },[dispatch, keyword])

    return (
        <div>
            {!keyword && <ProductCarousel />}
            <h1>Latest Product</h1>
            {
                loading ? <Loader />
                    : error ? <Messages variant="danger">{error}</Messages>

                    :

                    <div>
                        <Row>
                            {
                                products.map(product=>(
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product}></Product>
                                    </Col>
                                ))
                            }
                        </Row>

                        <Paginate page={page} pages={pages} keyword={keyword}></Paginate>
                    </div>

              
            }
            
        </div>
    )
}

export default HomeScreen
