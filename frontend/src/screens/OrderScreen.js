import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Table, Card, Button } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions' 
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderScreen = ({ match }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!order || successPay || successDeliver || order._id !== orderId){
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, orderId, successPay, successDeliver, order]) 


  const successPaymentHandler = () => {
    dispatch(payOrder(orderId))
  } 

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {/* {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                {order.orderItems.map((product) => (
                  <tr key={product._id}>
                    <td> <Link to={`/product/${product.product._id}`}>{product.name}</Link></td>
                    <td>{product.qty} x ₹{product.price} = ₹{product.qty * product.price}</td>
                    <td>
                      {product.product.status === 'Waiting' || 
                            product.product.status === 'Cancelled'? (
                        <Message variant='danger'>
                          {product.product.status}
                          {product.product.status === 'Waiting' ? 
                            ( - product.product.remainingQuantity +' Qty left'):('')}
                        </Message>
                      ) : product.product.status === 'Dispatched' ? (
                        <Message variant='success'>
                          {product.product.status}
                        </Message>
                      ) : (
                        <Message variant='info'>
                          {product.product.status}
                        </Message>
                      )
                      }
                    </td>
                  </tr>
                ))} 
              </tbody>
              </Table>
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
                  <Col>Items</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  { <Button type='submit' variant='primary' onClick={successPaymentHandler}>
                      Click to Pay
                    </Button>
                  }
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo.isVendor && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen