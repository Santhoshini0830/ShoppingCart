import { actionTypes } from "../actions/ActionTypes";

const initialState = {
  productList: [],
  filterItem: [],
  cart: [],
  list: [],
  details: [],
  order: [],
  categories: [],
  dataList: [],
  recent: [],
  selectedProduct: [],
  open: false,
  type: "success",
  message: "",

  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: "",
};

export const allProductsReducer = (state = initialState, action) => {
  const loginUserEmail = localStorage.getItem("userEmail");
  const userData = JSON.parse(localStorage.getItem("userData") || "[]");
  switch (action.type) {
    case actionTypes.FETCHPRODUCT:
        // console.log(productList)
      return { ...state, productList: action.payload };
     case actionTypes.FETCHSUCCESS:
      return {
        ...state,
        productList: action.payload,
      };
    case actionTypes.FETCHERROR:
      return { ...state, error: action.payload };
    case actionTypes.LOGINACTION:
      return { ...state };

    case actionTypes.SEARCHDATALIST:
      if (action.payload.length > 0) {
        const product = state.productList.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );

        return {
          ...state,
          dataList: product,
        };
      } else if (action.payload.length > 0 && state.list.length > 0) {
        const productListIds = state.productList.filter((product) =>
          state.list.includes(product.id)
        );

        const product = productListIds.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );
        return {
          ...state,
          dataList: product,
        };
      } else {
        return {
          ...state,
          dataList: [],
        };
      }
    case actionTypes.SEARCH:
      if (action.payload.length > 0) {
        const product = state.dataList.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );

        const filterProduct =
          action.payload.length > 0 &&
          product.length === 0 &&
          state.dataList !== action.payload
            ? null
            : state.dataList.length > 0;

        return {
          ...state,
          selectedProduct: product,
          filterItem: filterProduct,
          dataList: product,
        };
      } else if (action.payload.length > 0 && state.categories.length > 0) {
        const product = state.productList.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );

        const filterProduct =
          action.payload.length > 0 && state.dataList.length === 0
            ? null
            : state.dataList.length > 0;

        return {
          ...state,
          selectedProduct: product,
          filterItem: filterProduct,
        };
      } else if (action.payload.length > 0 && state.list.length > 0) {
        const productListIds = state.productList.filter((product) =>
          state.list.includes(product.id)
        );
        const product = productListIds.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );
        const filterProduct =
          action.payload.length > 0 &&
          product.length === 0 &&
          state.dataList.length === 0
            ? null
            : state.dataList.length > 0;
        return {
          ...state,
          selectedProduct: product,
          filterItem: filterProduct,
        };
      } else if (action.payload.length > 0 && state.cart.length > 0) {
        const productCartIds = state.productList.filter((product) =>
          state.cart.includes(product.id)
        );

        const product = productCartIds.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );

        const filterProduct =
          action.payload.length > 0 &&
          product.length === 0 &&
          state.dataList.length === 0
            ? null
            : state.dataList.length > 0;
        return {
          ...state,
          selectedProduct: product,
          filterItem: filterProduct,
        };
      } else {
        return {
          ...state,
          selectedProduct: [],
          filterItem: [],
        };
      }
    case actionTypes.WISHLISTSEARCH:
      if (action.payload.length > 0) {
        const product = state.list.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );

        if (product.length === 0 && state.dataList.length <= 0) {
          return {
            ...state,
            dataList: [],
          };
        } else {
          return {
            ...state,
            dataList: product,
          };
        }
      } else {
        return {
          ...state,
          dataList: [],
        };
      }
    case actionTypes.CARTSEARCH:
      if (action.payload.length > 0) {
        const cartIds = state.cart.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );

        return {
          ...state,
          dataList: cartIds,
        };
      } else {
        return {
          ...state,
          dataList: [],
        };
      }
    case actionTypes.CATEGORYSEARCH:
      if (action.payload.length > 0) {
        const producties = state.categories.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        );

        return { ...state, dataList: producties };
      } else {
        return { ...state, dataList: [] };
      }

    case actionTypes.CATEGORYPRODUCT:
      const category_product = state.productList.filter((item) =>
        item.category.toLowerCase().includes(action.payload.toLowerCase())
      );
      return { ...state, categories: category_product };

    case actionTypes.PRODUCTSONLOGIN:
      function getUniqueListById(arr, key) {
        return [...new Map(arr.map((item) => [item[key], item])).values()];
      }
      const localProduct = userData?.find((productItem) => {
        if (productItem.email === loginUserEmail) {
          let newCartArray = productItem.cartList?.concat(state.cart) || [];
          const cartProductArrays = getUniqueListById(newCartArray, "id");
          productItem["cartList"] = cartProductArrays;
          return productItem;
        }
      });
      localStorage.setItem("userData", JSON.stringify(userData));
      const wishListId = localProduct?.wishlistList || [];
      const cartListId = localProduct?.cartList || [];
      if (loginUserEmail) {
        return {
          ...state,

          list: [...wishListId],
          cart: [...cartListId],
        };
      } else {
        return {
          ...state,

          list: [...state.list, ...wishListId],
          cart: [...state.cart, ...cartListId],
        };
      }

    case actionTypes.REMOVEFROMCART:
      const removeCartProducts = state.cart.indexOf(
        state.cart.find((item) => item.id === action.payload)
      );
      const localStorageProductUpdate = userData.map((productItem) => {
        if (productItem.email === loginUserEmail) {
          const updatedCartlist = productItem.cartList.filter(
            (item) => item.id !== action.payload
          );
          productItem["cartList"] = updatedCartlist;
        }
      });
      localStorage.setItem("userData", JSON.stringify(userData));
      state.cart.splice(removeCartProducts, 1);
      return {
        ...state,
      };

    case actionTypes.REMOVEFROMCARTONLOGOUT:
      return {
        ...state,
        cart: [],
      };
    case actionTypes.LOGOUTREMOVEFROMCHECKOUT:
      const updatedCart = [
        ...state.cart.filter((product) => !state.order.includes(product.id)),
        ...state.order,
      ];
      return { ...state, cart: updatedCart };

    case actionTypes.REMOVEFROMLISTONLOGOUT:
      return {
        ...state,
        list: [],
      };
    case actionTypes.UPDATEORDER:
      const updatedOrder = state.order.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        order: updatedOrder,
      };

    case actionTypes.REMOVEORDER:
      const Ite = state.order.filter((product) => product !== action.payload);
      return {
        ...state,
        order: Ite,
      };

    case actionTypes.REMOVEPRODUCTFROMLIST:
      const wishListProducts = state.list.indexOf(
        state.list.find((item) => item.id === action.payload)
      );
      userData.map((items) => {
        if (items.email === loginUserEmail) {
          const wishlistId = items.wishlistList.filter(
            (item) => item.id !== action.payload
          );
          items["wishlistList"] = wishlistId;
        }
      });
      localStorage.setItem("userData", JSON.stringify(userData));
      state.list.splice(wishListProducts, 1);
      return {
        ...state,
      };

    case actionTypes.removePFromOrder:
      const orderProducts = state.order.indexOf(
        state.order.find((item) => item.id === action.payload)
      );

      return {
        ...state,
        order: orderProducts,
      };

    case actionTypes.AddSingleProductToCart:
      const cartProducts = state.productList.find(
        (item) => item.id === action.payload
      );
      let cartLocal = userData.map((productItem) => {
        if (productItem.email === loginUserEmail) {
          if (!productItem.cartList.some((el) => el.id === action.payload.id)) {
            productItem["cartList"].push(cartProducts);
          }
          return productItem.cartList;
        }
      });
      localStorage.setItem("userData", JSON.stringify(userData));
      let cartProductArray;
      function getUniqueListBy(arr, key) {
        return [...new Map(arr.map((item) => [item[key], item])).values()];
      }

      cartLocal = cartLocal.filter((e) => e !== undefined);
      if (loginUserEmail) {
        let newArray = cartLocal[0]?.concat(state.cart) || [state.cart];
        cartProductArray = getUniqueListBy(newArray, "id");
        cartProductArray = cartLocal[0];
        return {
          ...state,
          cart: [...cartProductArray],
        };
      } else {
        cartProductArray = [cartProducts];
        return {
          ...state,
          cart: [...state.cart, ...cartProductArray],
        };
      }

    case actionTypes.LOGOUTREMOVEFROMLIST:
      return {
        ...state,
        list: [],
      };
    case actionTypes.LOGOUTREMOVEFROMCART:
      return {
        ...state,
        cart: [],
      };
    case actionTypes.RECENTPRODUCT:
      {
      }
      return {
        ...state,

        recent: [...state.recent, action.payload],
      };
    case actionTypes.AddSingleProductToList:
      const wishListArray = state.productList.find(
        (item) => item.id === action.payload
      );
      let wishListProduct = userData.find((productItem) => {
        return productItem.email === loginUserEmail;
      });

      if (wishListProduct) {
        if (
          !wishListProduct.wishlistList.some(
            (el) => el.id === action.payload.id
          )
        ) {
          wishListProduct.wishlistList.push(wishListArray);
          localStorage.setItem("userData", JSON.stringify(userData));
        }
        return {
          ...state,
          list: wishListProduct.wishlistList,
        };
      } else {
        return state;
      }

    case actionTypes.CHECKOUT:
      const orderItems = state.productList.find(
        (item) => item.id === action.payload
      );

      return {
        ...state,

        order: [orderItems],
      };
    case actionTypes.CARTTOCHECKOUT:
      return {
        ...state,
        order: state.cart,
      };
    case actionTypes.CARTTOCHECKOUTONSEARCH:
      return {
        ...state,
        order: state.selectedProduct,
      };

    case actionTypes.REMOVEFROMCARTONORDER:
      const filteredCartArrays = state.cart.filter((item) => {
        return !state.order.some((orderItem) => orderItem.id === item.id);
      });
      const localStorageCartProductUpdate = userData.map((productItem) => {
        if (productItem.email === loginUserEmail) {
          const updatedCartlists = productItem.cartList.filter((item) => {
            return !state.order.some((orderItem) => orderItem.id === item.id);
          });
          productItem["cartList"] = updatedCartlists;
        }
      });
      localStorage.setItem("userData", JSON.stringify(userData));
      const newState = { ...state, cart: filteredCartArrays };
      return newState;
    case actionTypes.ALERTOPEN: {
      return {
        ...state,

        open: action.payload,
      };
    }
    case actionTypes.ALERTMESSAGE: {
      return {
        ...state,

        message: action.payload,
      };
    }

    case actionTypes.ALERTTYPE: {
      return {
        ...state,

        type: action.payload,
      };
    }
    // case actionTypes.SNACKBAR: {
    //   const { snackbarOpen, snackbarMessage, snackbarType } = action;
    //   return {
    //     ...state,
    //     snackbarOpen,
    //     snackbarType,
    //     snackbarMessage,
    //   };
    // }
    default:
      return state;
  }
};
