export const getDraggedElements = (store) => store.burgerConstructor.draggedIngredients;
export const getBurgerIngredients = (store) => store.burgerIngredients.burgerIngredients;


export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};
