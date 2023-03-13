import { getOrderNumber } from "../../components/utils/data";
export const GET_NUMBER_REQUEST = 'GET_NUMBER_REQUEST';
export const GET_NUMBER_SUCCESS = "GET_NUMBER_SUCCESS";
export const GET_NUMBER_FAILED = "GET_NUMBER_FAILED";



export function makeOrder(ingredientArr) {
  return function (dispatch) {
    dispatch({
        type: GET_NUMBER_REQUEST,
      });
    getOrderNumber(ingredientArr).then((res) => {
      if (res.success) {
        dispatch({
          type: GET_NUMBER_SUCCESS,
          payload: res.order.number,
        });
      } else {
        dispatch({
          type: GET_NUMBER_FAILED,
        });
      }
    });
  };
}


