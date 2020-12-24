import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
    listDispatchedProducts,
} from '../actions/productActions'

const ProductDispatchedScreen = ({ history }) => {
  const dispatch = useDispatch()
 
  const productList = useSelector((state) => state.productDispatchedList)
  const { loading, error, products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  useEffect(() => {
    if (!userInfo.isVendor) { 
      history.push('/login')
    }
    dispatch(listDispatchedProducts())
  }, [
    dispatch,
    history,
    userInfo,
  ])

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Dispatched Products</h1>
        </Col>
      </Row>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.bundleQuantity}</td>
                <td>₹{product.price * product.bundleQuantity}</td>
              </tr>
            ))} 
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductDispatchedScreen