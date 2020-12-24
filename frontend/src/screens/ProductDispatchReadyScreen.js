import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listDispatchReadyProducts,
  dispatchProduct,
} from '../actions/productActions'

const ProductWaitingListScreen = ({ history }) => {
  const dispatch = useDispatch()
 
  const productList = useSelector((state) => state.productDispatchReady)
  const { loading, error, products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  const productDispatch = useSelector((state) => state.productDispatch)
  const { loading: dispatchLoading, error: dispatchError } = productDispatch

  useEffect(() => {
    if (!userInfo.isVendor) { 
      history.push('/login')
    }
    dispatch(listDispatchReadyProducts())
  }, [
    dispatch,
    history,
    userInfo,
    productDispatch,
  ])

  const dispatchHandler = (id) => {
    dispatch(dispatchProduct(id))
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Ready to Dispatch</h1>
          {dispatchError && <Message variant='danger'>{dispatchError}</Message>}
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
                <Button type='submit' variant='primary' onClick={() => dispatchHandler(product._id)}>
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