import React, { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const loginUserEmail = localStorage.getItem("userEmail");
  const [cart, setCart] = useState([]);
  // const [wishlist, setWishlist] = useState([]);
  const [wishlist, setWishlist] = useState([]);
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

  // const addToCart = (product) => {
  //   setCart((prevCart) => [...prevCart, product]);
  // };

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

  // const fetchD = (email, setCart, setWishlist) => {
  //   // Perform any necessary actions after the user logs in

  //   // Retrieve cart and wishlist data
  //   const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");
  //   const user = savedUserData.find((user) => user.email === email);
  //   if (user) {
  //     const cartList = user.cartList || [];
  //     const wishlistList = user.wishlistList ? Object.values(user.wishlistList) : [];
  //     // Update the cart and wishlist data
  //     setCart(cartList);
  //     setWishlist(wishlistList);
  //   }

  //   // Perform any other actions after retrieving the cart and wishlist data
  // };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);

    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");
    const userIndex = savedUserData.findIndex(
      (user) => user.email === loginUserEmail
    );
    if (userIndex !== -1) {
      const updatedUserData = [...savedUserData];
      updatedUserData[userIndex].cartList = updatedCart;
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
  };

  const addToWishlist = (product) => {
    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);

    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");
    const userIndex = savedUserData.findIndex(
      (user) => user.email === loginUserEmail
    );
    if (userIndex !== -1) {
      const updatedUserData = [...savedUserData];
      updatedUserData[userIndex].wishlistList = updatedWishlist.reduce(
        (acc, curr) => ({ ...acc, [curr.id]: curr }),
        {}
      );
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);

    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");
    const userIndex = savedUserData.findIndex(
      (user) => user.email === loginUserEmail
    );
    if (userIndex !== -1) {
      const updatedUserData = [...savedUserData];
      updatedUserData[userIndex].cartList = updatedCart;
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
  };

  const removeFromWishlist = (product) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    setWishlist(updatedWishlist);

    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");
    const userIndex = savedUserData.findIndex(
      (user) => user.email === loginUserEmail
    );
    if (userIndex !== -1) {
      const updatedUserData = [...savedUserData];
      updatedUserData[userIndex].wishlistList = updatedWishlist.reduce(
        (acc, curr) => ({ ...acc, [curr.id]: curr }),
        {}
      );
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
  };
  // const addToWishlist = (product) => {
  //   setWishlist((prevWishlist) => [...prevWishlist, product]);
  // };

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
