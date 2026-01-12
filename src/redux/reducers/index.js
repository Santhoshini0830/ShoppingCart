import { allProductsReducer } from "./ProductsReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  allProduct: allProductsReducer,
});

export default rootReducers;
