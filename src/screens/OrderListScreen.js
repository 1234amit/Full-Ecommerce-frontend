import React, { useEffect } from 'react'
import Loader from '../components/Loader'
import Messages from '../components/Messages'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table, Nav, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {

    const dispath = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispath(listOrders())
        }else{
            history.push('/login')
        }
    },[dispath, history, userInfo])

    return (
        <div>
            <h1>Orders</h1>
            {loading
                ? (<Loader />)
                : error
                    ? (<Messages variant='danger'>{error}</Messages>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>Total</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>

                                        <td>{order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>{order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}
                                        </td>


                                        <td>
                                            <Nav.Link as={NavLink} to={`/order/${order._id}`}>
                                                <Button className="btn-sm">Details</Button>
                                            </Nav.Link>
                                        </td>

                                        
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>

        
    )
}

export default OrderListScreen