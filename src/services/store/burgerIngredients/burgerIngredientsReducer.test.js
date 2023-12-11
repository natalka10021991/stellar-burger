import { burgerIngredientsSlice, getBurgerIngredients } from './burgerIngredients';

const initialState = {
  burgerIngredients: [],
  loadingStatus: 'idle',
  error: null,
};

describe('burgerIngredientsSlice', () => {
  it('should change status with getBurgerIngredients.pending action', () => {
    const state = burgerIngredientsSlice.reducer(initialState, getBurgerIngredients.pending());
    expect(state.loadingStatus).toBe('loading');
    expect(state.error).toBe(null);
  });
  it('should change status with getBurgerIngredients.fulfilled action', () => {
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
    ];
    const state = burgerIngredientsSlice.reducer(
      initialState,
      getBurgerIngredients.fulfilled({data: mockBurgerIngredients})
    );
    expect(state).toEqual({
      burgerIngredients: mockBurgerIngredients,
      loadingStatus: 'resolved',
      error: null,
    });
  });
  it('should change status with getBurgerIngredients.rejected action', () => {
    const state = burgerIngredientsSlice.reducer(
      initialState,
      getBurgerIngredients.rejected()
    );
    expect(state).toEqual({
      burgerIngredients: [],
      loadingStatus: 'failed',
      error: { message: 'Rejected' }
    });
  });
});
