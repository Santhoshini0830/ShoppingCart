import axios from "axios";
import { actionTypes } from "./ActionTypes";
import { data } from "../Data";

export const fetchSuccess = (productList) => {
  return {
    type: actionTypes.FETCHSUCCESS,
    payload: productList,
  };
};

export const loginAction = (productList) => {
  return {
    type: actionTypes.LOGINACTION,
    payload: productList,
  };
};

export const fetchProductsOnLogin = (items) => {
  return {
    type: actionTypes.PRODUCTSONLOGIN,
    payload: items,
  };
};

export const fetchProducts = () => async (dispatch) => {
  const response = await axios
    .get("https://my-json-server.typicode.com/winterbear-50/mockjson/products")
    .catch((error) => {
      dispatch(fetchError(error.message));
      console.log("Error", error);
    })
    .then((response) => {
      let combinedProductList = response.data;
      combinedProductList = combinedProductList.concat(data);
      console.log(combinedProductList)
      // dispatch({
      //   type: actionTypes.FETCHPRODUCT,
      //   payload: combinedProductList,
      // });
       dispatch(fetchSuccess(combinedProductList));
    });
  dispatch(fetchProductsOnLogin());
};

export const fetchError = (error) => {
  return {
    type: actionTypes.FETCHERROR,
    payload: error,
  };
};

export const categorySearch = (fiter) => {
  return {
    type: actionTypes.CATEGORYSEARCH,
    payload: fiter,
  };
};

export const searchCategory = (filter) => (dispatch) => {
  dispatch(categorySearch(filter));
};

export const categoryProduct = (filterProduct) => {
  return {
    type: actionTypes.CATEGORYPRODUCT,
    payload: filterProduct,
  };
};

export const categoryProducts = (product) => (dispatch) => {
  dispatch(categoryProduct(product));
};

export const AddSingleProductToList = (products) => {
  return {
    type: actionTypes.AddSingleProductToList,
    payload: products,
  };
};

export const CheckOutList = (order) => {
  return {
    type: actionTypes.CHECKOUT,
    payload: order,
  };
};
export const alertOpen = (alert) => {
  console.log(alert);
  return {
    type: actionTypes.ALERTOPEN,
    payload: alert,
  };
};
export const alertMessage = (alert) => {
  console.log(alert);

  return {
    type: actionTypes.ALERTMESSAGE,
    payload: alert,
  };
};
export const alertType = (alert) => {
  console.log(alert);

  return {
    type: actionTypes.ALERTTYPE,
    payload: alert,
  };
};
export const snackBar = (
  snackbarOpen,
  snackbarType = "success",
  snackbarMessage = ""
) => {
  return {
    type: actionTypes.SNACKBAR,
    snackbarOpen,
    snackbarType,
    snackbarMessage,
  };
};

export const wishlist = (list) => (dispatch) => {
  dispatch(AddSingleProductToList(list));
};

export const AddSingleProductToCart = (products) => {
  return {
    type: actionTypes.AddSingleProductToCart,
    payload: products,
  };
};
export const AddSingleProductToWishlist = (wishlistItems) => {
  return {
    type: actionTypes.ADDSINGLEPRODUCTTOWISHLIST,
    payload: wishlistItems,
  };
};
export const OnClickOfPlaceOrder = (products) => {
  return {
    type: actionTypes.ONCLICKOFPALCEORDER,
    payload: products,
  };
};
export const removeFromCartOnOrder = (products) => {
  return {
    type: actionTypes.REMOVEFROMCARTONORDER,
    payload: products,
  };
};
export const AddAllProductsToCheckOut = (products) => {
  return {
    type: actionTypes.CARTTOCHECKOUT,
    payload: products,
  };
};
export const AddAllProductsToCheckOutOnSearch = (products) => {
  return {
    type: actionTypes.CARTTOCHECKOUTONSEARCH,
    payload: products,
  };
};
export const recentProducts = (recent) => {
  return {
    type: actionTypes.RECENTPRODUCT,
    payload: recent,
  };
};

export const cartProduct = (cart) => (dispatch) => {
  dispatch(AddSingleProductToCart(cart));
};
export const recentP = (recent) => (dispatch) => {
  dispatch(recentProducts(recent));
};

export const checkOut = (order) => (dispatch) => {
  dispatch(CheckOutList(order));
};

export const removeProductFromList = (removeProduct) => {
  return {
    type: actionTypes.REMOVEPRODUCTFROMLIST,
    payload: removeProduct,
  };
};

export const updateCartAndList = (cart, list) => {
  return {
    type: actionTypes.UPDATE,
    payload: { cart, list },
  };
};
export const removeFromList = (list) => (dispatch) => {
  dispatch(removeProductFromList(list));
};
export const removePFromOrder = (removeOrder) => {
  return {
    type: actionTypes.REMOVEPFROMORDER,
    payload: removeOrder,
  };
};

export const removeFromOrder = (check) => (dispatch) => {
  dispatch(removePFromOrder(check));
};

export const removeFromCart = (productItem) => {
  return {
    type: actionTypes.REMOVEFROMCART,
    payload: productItem,
  };
};
export const logoutRemoveFromCart = (produm) => {
  return {
    type: actionTypes.LOGOUTREMOVEFROMCART,
    payload: produm,
  };
};
export const logoutRemoveFromWishList = (ductItem) => {
  return {
    type: actionTypes.LOGOUTREMOVEFROMLIST,
    payload: ductItem,
  };
};

export const checkoutRemoveFromCart = (ductItem) => {
  return {
    type: actionTypes.LOGOUTREMOVEFROMCHECKOUT,
    payload: ductItem,
  };
};
export const removeOrder = (productItm) => {
  return {
    type: actionTypes.REMOVEORDER,
    payload: productItm,
  };
};

export const removeProductFromCart = (cart) => (dispatch) => {
  dispatch(removeFromCart(cart));
};
export const removeOrderP = (or) => (dispatch) => {
  dispatch(removeOrder(or));
};

export const search = (filterData) => {
  return {
    type: actionTypes.SEARCH,
    payload: filterData,
  };
};

export const clearSearch = (result) => (dispatch) => {
  dispatch(search(result));
};
export const searchDatalist = (filterData) => {
  return {
    type: actionTypes.SEARCHDATALIST,
    payload: filterData,
  };
};
export const wishlistSearch = (filterData) => {
  return {
    type: actionTypes.WISHLISTSEARCH,
    payload: filterData,
  };
};
export const cartSearch = (filterData) => {
  return {
    type: actionTypes.CARTSEARCH,
    payload: filterData,
  };
};
export const removeFromCartOnLogout = (filterData) => {
  return {
    type: actionTypes.REMOVEFROMCARTONLOGOUT,
    payload: filterData,
  };
};
export const fetchLocalProduct = (data) => {
  return {
    type: actionTypes.FETCHLOCALPRODUCT,
    payload: data,
  };
};
export const removeFromListOnLogout = (filterData) => {
  return {
    type: actionTypes.REMOVEFROMLISTONLOGOUT,
    payload: filterData,
  };
};

export const selectedCategoryProduct = (filterItems) => {
  return {
    type: actionTypes.SELECTCATEGORY_PRODUCT,
    payload: filterItems,
  };
};
export const updateOrder = (orderItems) => {
  return {
    type: actionTypes.UPDATEORDER,
    payload: orderItems,
  };
};

export const selectedCategoryProducts = (result) => (dispatch) => {
  dispatch(selectedCategoryProduct(result));
};
