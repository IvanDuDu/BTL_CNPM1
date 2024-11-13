import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)   //lấy link trang

  dispatch({   
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })    // gửi gói đata
// bình thường để lưu dũ liệu nó có 2 phương pháp : 1 là lưu vào localStorage dành cho những phương thức yêu cầu ít bộ nhớ 
// phương pháp thứ 2 là sử dụng redux 
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))    //lưu trữ ở trong cart/cartItems
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,  
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))    // chức năng remove, tuy nhiên cũng chỉ là remove khi nhấn icon
                                                                                  // cần cập nhật thêm remove khi đã thực hiện mua hàng
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
