import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS,
  CART_FETCH_ITEMS,
 } from '../constants/cartConstants'


 export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState(); // Lấy thông tin người dùng từ state

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`, // Xác thực bằng token
    },
  };
  try {
    const { data } = await axios.post(
      `/api/users/${userInfo._id}/cart/${productId}`, 
      { qty }, 
      config
    );

   
    dispatch({
      type: "CART_ADD_ITEM",
      payload: data, 
    });
  } catch (error) {
   
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: "CART_ADD_ITEM_FAIL",
      payload: message,
    });
  }
};



export const removeFromCart = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  await axios.delete(`/api/users/${userInfo._id}/cart/${id}`, config); // Xóa sản phẩm khỏi giỏ hàng

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id, // Truyền ID sản phẩm cần xóa
  });
};

export const fetchCart = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  try {
    const { data } = await axios.get(`/api/users/cart/${userInfo._id}`, config);
    //thử sử dụng URL của phương thức khác
    dispatch({
      type: CART_FETCH_ITEMS,
      payload: data, // Dữ liệu giỏ hàng từ server
    });
  } catch (error) {
    dispatch({
      type: "CART_FETCH_FAIL",
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};





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
