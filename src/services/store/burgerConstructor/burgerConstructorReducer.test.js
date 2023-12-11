import {
  addIngredient,
  burgerConstructorSlice,
  removeIngredient,
  replaceIngredient,
} from './burgerConstructor';

const initialState = {
  draggedIngredients: [
    {
      _id: '1',
      id: '12345',
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
    {
      _id: '2',
      id: '3234',
      name: 'Sauce',
      type: 'sauce',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 1000,
      image: '',
      image_mobile: '',
      image_large: '',
    },
  ],
};

describe('burgerConstructorSlice', () => {
  it('should change state with removeIngredient action', () => {
    const mockBurgerIngredient = {
      _id: '1',
      id: '12345',
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
    };
    const state = burgerConstructorSlice.reducer(
      initialState,
      removeIngredient(mockBurgerIngredient.id)
    );
    expect(state).toEqual({
      draggedIngredients: [
        {
          _id: '2',
          id: '3234',
          name: 'Sauce',
          type: 'sauce',
          proteins: 10,
          fat: 10,
          carbohydrates: 10,
          calories: 100,
          price: 1000,
          image: '',
          image_mobile: '',
          image_large: '',
        },
      ],
    });
  });

  it('should change state with addIngredient action', () => {
    const mockBurgerIngredient = {
      _id: '3',
      id: '2323',
      name: 'Burger',
      type: 'sauce',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 1000,
      image: '',
      image_mobile: '',
      image_large: '',
    };
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient({ ingredient: mockBurgerIngredient })
    );
    expect(state).toEqual({
      draggedIngredients: [
        {
          _id: '1',
          id: '12345',
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
        {
          _id: '2',
          id: '3234',
          name: 'Sauce',
          type: 'sauce',
          proteins: 10,
          fat: 10,
          carbohydrates: 10,
          calories: 100,
          price: 1000,
          image: '',
          image_mobile: '',
          image_large: '',
        },
        {
          _id: '3',
          id: '2323',
          name: 'Burger',
          type: 'sauce',
          proteins: 10,
          fat: 10,
          carbohydrates: 10,
          calories: 100,
          price: 1000,
          image: '',
          image_mobile: '',
          image_large: '',
        },
      ],
    });
  });

  it('should change state with replaceIngredient action', () => {
    const mockBurgerIngredient = {
      _id: '3',
      id: '2323',
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
    };
    const state = burgerConstructorSlice.reducer(
      initialState,
      replaceIngredient({ ingredient: mockBurgerIngredient })
    );
    expect(state).toEqual({
      draggedIngredients: [
        {
          _id: '2',
          id: '3234',
          name: 'Sauce',
          type: 'sauce',
          proteins: 10,
          fat: 10,
          carbohydrates: 10,
          calories: 100,
          price: 1000,
          image: '',
          image_mobile: '',
          image_large: '',
        },
        {
          _id: '3',
          id: '2323',
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
        }
      ],
    });
  });
});
