import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const [miniCart, setMiniCart] = useState([])

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    setMiniCart(miniCart.filter((item) => item.product !== id))
  }

  const checkoutHandler = () => {
    localStorage.setItem('miniCart', JSON.stringify(miniCart))
    history.push('/login?redirect=shipping')
  }

  const handleCheckboxChange = (item) => {
    if (miniCart.find((selectedItem) => selectedItem.product === item.product)) {
      setMiniCart(miniCart.filter((selectedItem) => selectedItem.product !== item.product))
    } else {
      setMiniCart([...miniCart, item])
    }
  }

  const miniCartTotalQuantity = miniCart.reduce((acc, item) => acc + item.qty, 0)
  const miniCartTotalPrice = miniCart.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={1}>
                    <Form.Check
                      type="checkbox"
                      style={{ transform: 'scale(3)' }}
                      checked={miniCart.find((selectedItem) => selectedItem.product === item.product)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  </Col>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link className="text-decoration-none text-dark" to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({miniCartTotalQuantity}) items</h2>
              ${miniCartTotalPrice}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={miniCart.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen



//đã xử lí xong

// còn thiếu 1 điểm là cho phép thanh toán đơn lẻ bằng cách :
// tạo 1 ô tick trong  shopping cart  rồi sau đó  chọn các mặt hàng đã đánh dấu , ở đó tạo ra 1 đơn nhỏ hơn
// thực hiện các chức năng tương tự với đơn nhỏ này 
// do đó cần chỉnh sửa chức năng xóa mặt hàng 


// sau nút trash cho thêm 1 nút form check  để chọn  mặt hàng muốn thanh toán , truyền vào 1 cartItem nhỏ  
// và thực hiện các chức năng tương tự như cartItem lớn , và ưu tiên thực hiện trên MiniCart; nếu size(MiniCart)==0 thì thực hiện chức năng trên cart lớn
// tạo ra chức năng addToMiniCart được thực hiện khi nhấn form Check, MiniCart là mảng lưu các chỉ số được chọn của BigCart rồi sau đó cho thực hiện duyệt 