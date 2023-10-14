export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

const CREATE_ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

export const createOrder = (ingredients) => {
  return function (dispatch) {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const payload = {
      ingredients: ingredients,
    };
    fetch(CREATE_ORDER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res && res.ok) {
          return res.json();
        } else {
          dispatch({ type: CREATE_ORDER_FAILED });
        }
      })
      .then((data) => {
        dispatch({ type: CREATE_ORDER_SUCCESS, orderDetails: data });
      })
      .catch((e) => {
        dispatch({ type: CREATE_ORDER_FAILED });
      });
  };
};
