export const GET_BURGER_INGREDIENTS = 'GET_BURGER_INGREDIENTS';
export const GET_BURGER_INGREDIENTS_FAILED = 'GET_BURGER_INGREDIENTS_FAILED';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS';

const DATA_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const getBurderIngredients = () => {
  return function (dispatch) {
    dispatch({ type: GET_BURGER_INGREDIENTS });
    let promise = fetch(DATA_URL);
    promise.then((res) => {
      if (res && res.ok) {
        return res.json()
      } else {
        dispatch({
          type: GET_BURGER_INGREDIENTS_FAILED,
        });
      }
    }).then((data) => {
      dispatch({
        type: GET_BURGER_INGREDIENTS_SUCCESS,
        burgerIngredients: data.data,
      });
    }).catch((e) => {
      dispatch({
        type: GET_BURGER_INGREDIENTS_FAILED,
      });
    })
  };
};
