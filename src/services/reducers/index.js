import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { currentIngredientReducer } from "./currentIngredient";
import { orderReducer } from "./order";
import { activeTabReducer } from "./activeTab";
import { userReducer } from "./user";


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  activeTab: activeTabReducer,
  user: userReducer
});
