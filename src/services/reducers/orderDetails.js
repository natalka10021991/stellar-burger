import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
} from '../actions/orderDetails';

const initialState = {
  createOrderRequest: false,
  createOrderFailed: false,
  orderDetails: {
    name: '',
    order: {
      number: '',
    },
  },
};

export const createOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        createOrderRequest: true,
        orderDetails: {
          name: '',
          order: {
            number: '',
          },
        },
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        createOrderRequest: false,
        createOrderFailed: false,
        orderDetails: action.orderDetails,
      };
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        createOrderRequest: false,
        createOrderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
