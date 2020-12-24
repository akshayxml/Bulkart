import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listDispatchReadyProducts,
} from '../actions/productActions'

const ProductWaitingListScreen = ({ history, match }) => {
  const dispatch = useDispatch()
 
  const productList = useSelector((state) => state.productDispatchReady)
  const { loading, error, products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo.isVendor) { 
      history.push('/login')
    }
    dispatch(listDispatchReadyProducts())
  }, [
    dispatch,
    history,
    userInfo,
  ])

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Ready to Dispatch</h1>
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
              <th>ORDERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.bundleQuantity - product.remainingQuantity}/{product.bundleQuantity}
                </td>
                <td>
                <Button type='submit' variant='primary'>
                    Dispatch
                  </Button>
                </td>
              </tr>
            ))} 
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductWaitingListScreen