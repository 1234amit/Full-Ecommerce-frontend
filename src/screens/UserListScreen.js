import React, { useEffect } from 'react'
import Loader from '../components/Loader'
import Messages from '../components/Messages'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table, Nav } from 'react-bootstrap'
import { deleteUser, listUser } from '../actions/userActions'
import { NavLink } from 'react-router-dom'


const UserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUser())
        }else{
            history.push('/login')
        }
        
    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure you want to delete this user?')){
            dispatch(deleteUser(id))
        }
    }

    return (

        <div>
            <h1>Users</h1>
            {loading 
                ? (<Loader/>)
                :error
                    ? (<Messages variant='danger'>{error}</Messages>)
                
                    :(
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th>UPDATE</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{color: 'green'}}></i>
                                        ):(
                                            <i className='fas fa-check' style={{color: 'red'}}></i>
                                        )}</td>

                                        <td>
                                            <Nav.Link as={NavLink} to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </Nav.Link>
                                        </td>

                                        <td>
                                            <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default UserListScreen