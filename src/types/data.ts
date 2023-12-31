import { SerializedError } from '@reduxjs/toolkit';

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile?: string;
  image_large?: string;
}

export interface IIngredientDragged extends IIngredient {
  id: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  password?: string;
  name: string;
}

export interface IUserStore {
  loadingStatus: string;
  error: SerializedError | null;
  user: {
    email: string;
    name: string;
    password?: string;
  };
}

export interface IOrderDetailsStore {
  loadingStatus: string;
  error: SerializedError | null;
  orderDetails: {
    name: string;
    order: {
      number: string;
    };
  };
}

export interface IOrdersStore {
  loadingStatus: string;
  error: SerializedError | null;
  orders: any;
}

export interface IBurgerIngredientsStore {
  loadingStatus: string;
  error: SerializedError | null;
  burgerIngredients: IIngredient[] | [];
}

export interface IBurgerConstructorStore {
  draggedIngredients: IIngredientDragged[];
}
export interface IResetPasswordStore {
  loadingStatus: string;
  error: SerializedError | null;
}

export interface IUserAuthenticated extends IUserStore {
  isAuthenticated: boolean;
}

export interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  name: string;
  price?: string | number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderStore {
  loadingStatus: string;
  error: SerializedError | null;
  order: IOrder;
}

export interface IOrders {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}
