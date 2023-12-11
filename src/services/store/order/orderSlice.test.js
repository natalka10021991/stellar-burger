import { getOrder } from './order';

global.fetch = jest.fn();

describe('orderThunk', () => {
  it('should fetchOrder with resolved response', async () => {
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

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockOrder),
    });
    const dispatch = jest.fn();
    const thunk = getOrder();

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe(getOrder.pending().type);
    expect(end[0].type).toBe(getOrder.fulfilled().type);
    expect(end[0].payload).toBe(mockOrder);
  });

  it('should fetchOrder with rejected response', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });
    const dispatch = jest.fn();
    const thunk = getOrder();

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(getOrder.pending().type);
    expect(end[0].type).toBe(getOrder.rejected().type);
    expect(end[0].meta.requestStatus).toBe('rejected');
  });
});
