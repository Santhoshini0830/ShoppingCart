import React, { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const loginUserEmail = localStorage.getItem("userEmail");
  const [cart, setCart] = useState([]);
  // const [wishlist, setWishlist] = useState([]);
  const [wishlist, setWishlist] = useState(
    // () => {
    // const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");
    // const user = savedUserData.find((user) => user.email === loginUserEmail);
    // if (user) {
    //   return user.wishlistList ? Object.values(user.wishlistList) : [];
    // }
    // return
    []
    // }
  );
  const [order, setOrder] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  const [dataList, setDataList] = useState([]);

  const [filterItem, setFilterItem] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const queryClient = useQueryClient();
  const products = queryClient.getQueryData("products");

  const fetchData = () => {
    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");
    const user = savedUserData.find((user) => user.email === loginUserEmail);
    if (user) {
      setCart(user.cartList || []);
      setWishlist(user.wishlistList ? Object.values(user.wishlistList) : []);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loginUserEmail]);

  // const userData = JSON.parse(localStorage.getItem("userData") || "[]");
  // const updateUserData = (updatedUserData) => {
  //   localStorage.setItem("userData", JSON.stringify(updatedUserData));
  // };

  // const addToCart = (product) => {
  //   setCart((prevCart) => [...prevCart, product]);
  // };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);

    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");
    const user = savedUserData.find((user) => user.email === loginUserEmail);
    if (user) {
      const updatedUser = { ...user, cartList: [...user.cartList, product] };
      const updatedUserData = savedUserData.map((u) =>
        u.email === loginUserEmail ? updatedUser : u
      );
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
  };

  //   case actionTypes.CARTTOCHECKOUTONSEARCH:
  // //       return {
  // //         ...state,
  // //         order: state.selectedProduct,
  // //       };
  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item !== product));

    // Retrieve the existing userdata from localStorage
    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");

    // Find the user with the matching email in the userdata array
    const userIndex = savedUserData.findIndex(
      (user) => user.email === loginUserEmail
    );

    if (userIndex !== -1) {
      // Create a copy of the userdata
      const updatedUserData = [...savedUserData];

      // Find the user's cartList and remove the product
      const cartList = updatedUserData[userIndex].cartList;
      const updatedCartList = cartList.filter((item) => item.id !== product.id);

      // Update the cartList in the userdata
      updatedUserData[userIndex] = {
        ...updatedUserData[userIndex],
        cartList: updatedCartList,
      };

      // Save the updated userdata to localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
  };

  const removeFromWishlist = (product) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item !== product)
    );

    // Retrieve the existing userdata from localStorage
    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");

    // Find the user with the matching email in the userdata array
    const userIndex = savedUserData.findIndex(
      (user) => user.email === loginUserEmail
    );

    if (userIndex !== -1) {
      // Create a copy of the wishlistList object
      const updatedWishlistList = { ...savedUserData[userIndex].wishlistList };

      // Remove the product from the wishlistList object
      delete updatedWishlistList[product.id];

      // Update the userdata with the modified wishlistList
      const updatedUserData = [...savedUserData];
      updatedUserData[userIndex] = {
        ...savedUserData[userIndex],
        wishlistList: updatedWishlistList,
      };

      // Save the updated userdata to localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
  };

  // const addToWishlist = (product) => {
  //   setWishlist((prevWishlist) => [...prevWishlist, product]);
  // };

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);

    // Retrieve the existing userdata from localStorage
    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");

    // Find the user with the matching email in the userdata array
    const userIndex = savedUserData.findIndex(
      (user) => user.email === loginUserEmail
    );

    if (userIndex !== -1) {
      // Create a copy of the wishlistList object
      const updatedWishlistList = { ...savedUserData[userIndex].wishlistList };

      // Add the product to the wishlistList object
      updatedWishlistList[product.id] = product;

      // Update the userdata with the modified wishlistList
      const updatedUserData = [...savedUserData];
      updatedUserData[userIndex] = {
        ...savedUserData[userIndex],
        wishlistList: updatedWishlistList,
      };

      // Save the updated userdata to localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
  };

  const updateOrder = (updatedOrder) => {
    const updatedOrderList = order.map((item) => {
      if (item.id === updatedOrder.id) {
        return updatedOrder;
      }
      return item;
    });

    setOrder(updatedOrderList);
  };
  const addToBuynow = (product) => {
    setOrder(() => [product]);
  };

  const addToBuynowFromCart = (product) => {
    setOrder((prevOrder) => [...cart]);
  };

  const addToBuynowFromCartOnSearch = (product) => {
    setOrder((prevOrder) => [...selectedProduct]);
  };

  // const removeFromCart = (product) => {
  //   setCart((prevCart) => prevCart.filter((item) => item !== product));
  // };

  // const removeFromWishlist = (product) => {
  //   setWishlist((prevWishlist) =>
  //     prevWishlist.filter((item) => item !== product)
  //   );
  // };

  const removeFromBuyNow = (product) => {
    setOrder((prevOrder) => prevOrder.filter((item) => item !== product));
  };

  const handleSnackbar = (open, message, type) => {
    setSnackbar({
      ...snackbar,
      open,
      message,
      type,
    });
  };

  const removeFromCartOnLogout = () => {
    setCart([]);
  };

  const removeFromListOnLogout = () => {
    setWishlist([]);
  };

  const searchDatalist = (dataListItem) => {
    if (dataListItem.length > 0) {
      const data = queryClient.getQueryData("products");
      // console.log(data);
      const product = data.filter((item) =>
        item.title.toLowerCase().includes(dataListItem.toLowerCase())
      );

      setDataList(product);
    } else {
      setDataList([]);
    }
  };

  const clearSearch = (searchText) => {
    if (searchText.length > 0) {
      const product = dataList.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );

      const filterProduct =
        searchText.length > 0 && product.length === 0 && dataList !== searchText
          ? null
          : dataList.length > 0;

      setSelectedProduct(product);
      setFilterItem(filterProduct);
      setDataList(product);
    } else {
      setSelectedProduct([]);
      setFilterItem([]);
    }
  };

  const wishlistSearch = (searchWishListext) => {
    if (searchWishListext.length > 0) {
      const wishlist_search_product = wishlist.filter((item) =>
        item.title.toLowerCase().includes(searchWishListext.toLowerCase())
      );

      setDataList(wishlist_search_product);
    } else {
      setDataList([]);
    }
  };

  const cartSearch = (searchCarttext) => {
    if (searchCarttext.length > 0) {
      const cartlist_search_product = cart.filter((item) =>
        item.title.toLowerCase().includes(searchCarttext.toLowerCase())
      );

      setDataList(cartlist_search_product);
    } else {
      // setSelectedProduct([]);
      setDataList([]);
      // setFilterItem([]);
    }
  };

  const searchCategory = (searchCategoryText, categories) => {
    if (searchCategoryText.length > 0) {
      const data = queryClient.getQueryData("products");
      console.log(data, "categoryData");
      const category_product = data.filter((item) =>
        item.category.toLowerCase().includes(categories.toLowerCase())
      );
      console.log(category_product, "categoryProduct");

      const category_search_product = category_product.filter((item) =>
        item.title.toLowerCase().includes(searchCategoryText.toLowerCase())
      );

      setDataList(category_search_product);
    } else {
      setDataList([]);
    }
  };

  const clearCartAndLocalStorage = () => {
    setCart([]);

    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");
    const updatedUserData = savedUserData.map((user) => {
      if (user.email === loginUserEmail) {
        return { ...user, cartList: [] };
      }
      return user;
    });

    localStorage.setItem("userData", JSON.stringify(updatedUserData));
  };

  const addToCartonNotLogin = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const cartContextValue = {
    cart,
    wishlist,
    order,
    snackbar,
    dataList,
    // search,
    filterItem,
    selectedProduct,
    clearCartAndLocalStorage,
    addToCart,
    addToWishlist,
    addToBuynow,
    updateOrder,
    addToBuynowFromCart,
    removeFromCart,
    removeFromWishlist,
    removeFromBuyNow,
    handleSnackbar,
    searchDatalist,
    wishlistSearch,
    cartSearch,
    searchCategory,
    clearSearch,
    removeFromCartOnLogout,
    removeFromListOnLogout,
    addToCartonNotLogin,
    fetchData,
    addToBuynowFromCartOnSearch,
    // initializeWishlist,
    // initializeCart,
    // loginUser,
    // updateUserData,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export { CartContextProvider, useCartContext };
export default CartContext;
