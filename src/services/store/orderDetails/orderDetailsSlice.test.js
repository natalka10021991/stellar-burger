import { createOrder } from './orderDetails';

global.fetch = jest.fn();

describe('orderDetails/createOrderThunk', () => {
  it('should createOrder with resolved response', async () => {
    const mockIngredients = [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0945',
    ];

    const mockResponse = {
      success: true,
      name: 'Антарианский флюоресцентный space бургер',
      order: {
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
          {
            _id: '643d69a5c3f7b9001cfa0943',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
            __v: 0,
          },
          {
            _id: '643d69a5c3f7b9001cfa0945',
            name: 'Соус с шипами Антарианского плоскоходца',
            type: 'sauce',
            proteins: 101,
            fat: 99,
            carbohydrates: 100,
            calories: 100,
            price: 88,
            image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
            __v: 0,
          },
        ],
        _id: '657384e57fd657001ba07b38',
        owner: {
          name: 'Наталья Быстровf',
          email: 'natalka91@bk.ru',
          createdAt: '2023-10-23T10:35:20.623Z',
          updatedAt: '2023-11-14T08:36:35.295Z',
        },
        status: 'done',
        name: 'Антарианский флюоресцентный space бургер',
        createdAt: '2023-12-08T21:04:37.500Z',
        updatedAt: '2023-12-08T21:04:37.961Z',
        number: 28635,
        price: 1156,
      },
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });
    const dispatch = jest.fn();
    const thunk = createOrder(mockIngredients);

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(createOrder.pending().type);
    expect(end[0].type).toBe(createOrder.fulfilled().type);
    expect(end[0].payload).toBe(mockResponse);
  });

  it('should fetchBurgerIngredients with rejected response', async () => {
    fetch.mockResolvedValue({
      ok: false,
    });
    const dispatch = jest.fn();
    const thunk = createOrder();

    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(createOrder.pending().type);
    expect(end[0].type).toBe(createOrder.rejected().type);
    expect(end[0].meta.requestStatus).toBe('rejected');
  });
});
