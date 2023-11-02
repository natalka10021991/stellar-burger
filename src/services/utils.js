export const getDraggedElements = (store) => store.burgerConstructor.draggedIngredients;
export const getBurgerIngredients = (store) => store.burgerIngredients.burgerIngredients;

export const checkResponse = (res) =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
