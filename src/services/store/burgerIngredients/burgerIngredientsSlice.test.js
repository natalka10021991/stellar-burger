import { getBurgerIngredients } from './burgerIngredients';

global.fetch = jest.fn();

describe('burgerIngredientsThunk', () => {
  it('should fetchBurgerIngredients with resolved response', async () => {
    const mockBurgerIngredients = [
      {
        _id: '1',
        name: 'Burger',
        type: 'bun',
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 100,
        price: 1000,
        image: '',
        image_mobile: '',
        image_large: '',
      },
    ]

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockBurgerIngredients)
    })
    const dispatch = jest.fn();
    const thunk = getBurgerIngredients();

    await thunk(dispatch, () => ({}))
    const {calls} = dispatch.mock
    
    expect(calls).toHaveLength(2)

    const [start, end] = calls;
    expect(start[0].type).toBe(getBurgerIngredients.pending().type)
    expect(end[0].type).toBe(getBurgerIngredients.fulfilled().type)
    expect(end[0].payload).toBe(mockBurgerIngredients)


  });

  it('should fetchBurgerIngredients with rejected response', async () => {


    fetch.mockResolvedValue({
      ok: false,
    })
    const dispatch = jest.fn();
    const thunk = getBurgerIngredients();

    await thunk(dispatch, () => ({}))
    const {calls} = dispatch.mock
    
    expect(calls).toHaveLength(2)

    const [start, end] = calls;
    expect(start[0].type).toBe(getBurgerIngredients.pending().type)
    expect(end[0].type).toBe(getBurgerIngredients.rejected().type)
    expect(end[0].meta.requestStatus).toBe('rejected')


  });
});

