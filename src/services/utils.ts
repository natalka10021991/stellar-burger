import { RootState } from './store/store';

export const getDraggedElements = (store: RootState) => store.burgerConstructor.draggedIngredients;
export const getBurgerIngredients = (store: RootState) => store.burgerIngredients.burgerIngredients;

export const checkResponse = (res: Response) =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const request = (url: string, options?: any) => {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse);
};
