import { getOrderSlice, getOrder } from './order';

const initialState = {
  order: {
    ingredients: [''],
    _id: '',
    status: '',
    number: 0,
    name: '',
    price: '',
    createdAt: '',
    updatedAt: '',
  },
  loadingStatus: 'idle',
  error: null,
};

describe('orderSlice', () => {
  it('should change status with getOrder.pending action', () => {
    const state = getOrderSlice.reducer(initialState, getOrder.pending());
    expect(state.loadingStatus).toBe('loading');
    expect(state.error).toBe(null);
  });
  it('should change status with getOrder.fulfilled action', () => {
    const mockOrder = {
      _id: '1',
      name: 'Burger',
      price: 1000,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
        },
      ],
      status: 'done',
      number: 1,
      createdAt: '2023-12-08T19:52:20.715Z',
      updatedAt: '2023-12-08T19:52:21.119Z',
    };
    const state = getOrderSlice.reducer(
      initialState,
      getOrder.fulfilled({ orders: [mockOrder] })
    );
    expect(state).toEqual({
      order: mockOrder,
      loadingStatus: 'resolved',
      error: null,
    });
  });

  it('should change status with getOrder.rejected action', () => {
    const state = getOrderSlice.reducer(
      initialState,
      getOrder.rejected()
    );
    expect(state).toEqual({
      order: {
        ingredients: [''],
        _id: '',
        status: '',
        number: 0,
        name: '',
        price: '',
        createdAt: '',
        updatedAt: '',
      },
      loadingStatus: 'failed',
      error: { message: 'Rejected' }
    });
  });

});
