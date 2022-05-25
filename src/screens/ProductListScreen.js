import React, { useEffect } from 'react'
import Loader from '../components/Loader'
import Messages from '../components/Messages'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table, Nav, Row, Col } from 'react-bootstrap'
import { createProduct, deleteProduct, listProducts } from '../actions/productActions'
import { NavLink } from 'react-router-dom'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'

const ProductListScreen = ({history, match}) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList


    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete


    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

 
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    let keyword = history.location.search



    useEffect(()=>{
        dispatch({ type: PRODUCT_CREATE_RESET })

        // if(userInfo && userInfo.isAdmin){
        //     dispatch(listProducts())
        // }else{
        //     history.push('/login')
        // }

        if(!userInfo.isAdmin){
            history.push('/login')
        }

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts(keyword))
        }
        
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])


    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure you want to delete this product ?')){
            // delete products
            dispatch(deleteProduct(id))
        }
    }


    const createProductHandler = (product) =>{
        console.log('click')
        dispatch(createProduct())
    }


  return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Messages variant='danger'>{errorDelete}</Messages>}


            {loadingCreate && <Loader />}
            {errorCreate && <Messages variant='danger'>{errorCreate}</Messages>}

            {loading 
                ? (<Loader/>)
                :error
                    ? (<Messages variant='danger'>{error}</Messages>)
                
                    :(
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                        <th>UPDATE</th>
                                        <th>DELETE</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td>
                                                <Nav.Link as={NavLink} to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                </Nav.Link>
                                            </td>

                                            <td>
                                                <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <Paginate page={page} pages={pages} isAdmin={true}></Paginate>
                        </div>
                    )}

        </div>
  )
}

export default ProductListScreen