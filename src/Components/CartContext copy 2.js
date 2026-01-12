import React, { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
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

  const loginUserEmail = localStorage.getItem("userEmail");
  const userData = JSON.parse(localStorage.getItem("userData") || "[]");

  const addToCartonNotLogin = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const getUniqueListById = (arr, key) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()].filter(
      (item) => item && item[key] !== null
    );
  };

  const handleLogin = () => {
    // Your login logic here

    // Fetch the user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Retrieve the user's email
    const loginUserEmail = localStorage.getItem("userEmail");

    // Find the user's data based on the email
    const localProduct = userData?.find((productItem) => {
      if (productItem.email === loginUserEmail) {
        let newCartArray = productItem.cartList?.concat(cart) || [];
        const cartProductArrays = getUniqueListById(newCartArray, "id");
        productItem["cartList"] = cartProductArrays;
        return productItem;
      }
    });

    // Update the userData in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    // Retrieve wishlist and cart list from localProduct
    const wishListId = localProduct?.wishlistList || [];
    const cartListId = localProduct?.cartList || [];

    if (loginUserEmail) {
      setWishlist([...wishListId]);
      setCart([...cartListId]);
    } else {
      setWishlist((prevWishlist) => [...prevWishlist, ...wishListId]);
      setCart((prevCart) => [...prevCart, ...cartListId]);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  // const productList = queryClient.getQueryData("products");
  // const cartProducts = productList.find((item) => item.id === productId);
  // let cartLocal = userData.map((productItem) => {
  //   if (productItem.email === loginUserEmail) {
  //     if (!productItem.cartList.some((el) => el.id === productId)) {
  //       productItem.cartList.push(cartProducts);
  //     }
  //     return productItem.cartList;
  //   }
  // });
  // localStorage.setItem("userData", JSON.stringify(userData));
  // let cartProductArray;
  // // function getUniqueListBy(arr, key) {
  // //   return [...new Map(arr.map((item) => [item[key], item])).values()];
  // // }

  // cartLocal = cartLocal.filter((e) => e !== undefined);
  // if (loginUserEmail) {
  //   let newArray = cartLocal[0]?.concat(cart) || [cart];
  //   // cartProductArray = getUniqueListBy(newArray, "id");
  //   cartProductArray = cartLocal[0];
  //   setCart([...cartProductArray]);
  // } else {
  //   cartProductArray = [cartProducts];
  //   const cartProduct = userData.find((productItem) => {
  //     return productItem.email === loginUserEmail;
  //   });

  //   if (cartProduct) {
  //     if (
  //       cartProduct.cartList &&
  //       !cartProduct.cartList.some((el) => el.id === product.id)
  //     ) {
  //       const updatedCartList = [...cartProduct.cartList, product];
  //       cartProduct.cartList = updatedCartList;
  //       localStorage.setItem("userData", JSON.stringify(userData));
  //     }
  //   } else {
  //     const newCartProduct = {
  //       email: loginUserEmail,
  //       cartList: [product],
  //     };
  //     userData.push(newCartProduct);
  //     localStorage.setItem("userData", JSON.stringify(userData));
  //   }

  //   setCart((prevCart) => [...prevCart, product]);
  // };

  const addToBuynow = (product) => {
    setOrder(() => [product]);
  };

  const addToBuynowFromCart = (product) => {
    setOrder((prevOrder) => [...cart]); // Add cart items to the order
    // setCart([]); // Clear the cart after adding items to the order
  };

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  // const addToWishlist = (product) => {
  //   const wishListProduct = userData.find((productItem) => {
  //     return productItem.email === loginUserEmail;
  //   });

  //   if (wishListProduct) {
  //     if (!wishListProduct.wishlistList.some((el) => el.id === product.id)) {
  //       const updatedWishlistList = [...wishListProduct.wishlistList, product];
  //       wishListProduct.wishlistList = updatedWishlistList;
  //       localStorage.setItem("userData", JSON.stringify(userData));
  //     }
  //   } else {
  //     const newWishListProduct = {
  //       email: loginUserEmail,
  //       wishlistList: [product],
  //     };
  //     userData.push(newWishListProduct);
  //     localStorage.setItem("userData", JSON.stringify(userData));
  //   }

  //   setWishlist((prevWishlist) => [...prevWishlist, product]);
  // };

  // const updateOrder = (updatedOrder) => {
  //   setOrder(updatedOrder);
  // };

  // const updateOrder = (product) => {
  //   order.map((item) => {
  //     if (item === product) {
  //       return product;
  //     }
  //     return item;
  //   });

  //   setOrder((prevOrder) => [...order]); // Add cart items to the order

  //   // setWishlist((prevWishlist) => [...prevWishlist, product]);
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

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item !== product));
  };
  // const removeFromCart = (productId) => {
  //   const removeCartProducts = cart.indexOf(
  //     cart.find((item) => item.id === productId)
  //   );

  //   const updatedCart = [...cart];
  //   updatedCart.splice(removeCartProducts, 1);
  //   setCart(updatedCart);

  //   const updatedUserData = userData.map((productItem) => {
  //     if (productItem.email === loginUserEmail) {
  //       const updatedCartlist = productItem.cartList.filter(
  //         (item) => item.id !== productId
  //       );
  //       return { ...productItem, cartList: updatedCartlist };
  //     }
  //     return productItem;
  //   });

  //   const updatedLocalStorageData = updatedUserData.map((productItem) => {
  //     if (productItem.email === loginUserEmail) {
  //       return { ...productItem, cartList: updatedCart };
  //     }
  //     return productItem;
  //   });

  //   localStorage.setItem("userData", JSON.stringify(updatedLocalStorageData));
  // };

  // const removeFromCart = (productId) => {
  //   const updatedCart = cart.filter((item) => item.id !== productId);
  //   const updatedUserData = userData.map((productItem) => {
  //     if (productItem.email === loginUserEmail) {
  //       const updatedCartList = productItem.cartList.filter(
  //         (item) => item.id !== productId
  //       );
  //       productItem.cartList = updatedCartList;
  //     }
  //     return productItem;
  //   });
  //   localStorage.setItem("userData", JSON.stringify(updatedUserData));
  //   setCart(updatedCart);
  // };

  const removeFromWishlist = (product) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item !== product)
    );
  };

  // const removeFromWishlist = (productId) => {
  //   const wishListProducts = wishlist.indexOf(
  //     wishlist.find((item) => item.id === productId)
  //   );

  //   const updatedWishlist = [...wishlist];
  //   updatedWishlist.splice(wishListProducts, 1);
  //   setWishlist(updatedWishlist);

  //   const updatedUserData = userData.map((items) => {
  //     if (items.email === loginUserEmail) {
  //       const wishlistId = items.wishlistList.filter(
  //         (item) => item.id !== productId
  //       );
  //       return { ...items, wishlistList: wishlistId };
  //     }
  //     return items;
  //   });

  //   const updatedLocalStorageData = updatedUserData.map((items) => {
  //     if (items.email === loginUserEmail) {
  //       return { ...items, wishlistList: updatedWishlist };
  //     }
  //     return items;
  //   });

  //   localStorage.setItem("userData", JSON.stringify(updatedLocalStorageData));
  // };

  // const removeFromWishlist = (productId) => {
  //   setWishlist((prevWishlist) =>
  //     prevWishlist.filter((item) => item.id !== productId)
  //   );

  //   const updatedUserData = [...userData];
  //   updatedUserData.forEach((user) => {
  //     if (user.email === loginUserEmail) {
  //       const updatedWishlist = user.wishlistList.filter(
  //         (item) => item.id !== productId
  //       );
  //       user.wishlistList = updatedWishlist;
  //     }
  //   });

  //   localStorage.setItem("userData", JSON.stringify(updatedUserData));
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
      // console.log(dataList);
      // const filterProduct =
      //   searchWishListext.length > 0 &&
      //   wishlist_search_product.length === 0 &&
      //   wishlist !== searchWishListext
      //     ? null
      //     : wishlist.length > 0;

      // setSelectedProduct(wishlist_search_product);
      // setFilterItem(filterProduct);
      setDataList(wishlist_search_product);
    } else {
      // setSelectedProduct([]);
      setDataList([]);
      // setFilterItem([]);
    }
  };

  const cartSearch = (searchCarttext) => {
    if (searchCarttext.length > 0) {
      const cartlist_search_product = cart.filter((item) =>
        item.title.toLowerCase().includes(searchCarttext.toLowerCase())
      );

      // const filterProduct =
      //   searchCarttext.length > 0 &&
      //   cartlist_search_product.length === 0 &&
      //   dataList !== searchCarttext
      //     ? null
      //     : dataList.length > 0;

      // setSelectedProduct(cartlist_search_product);
      // setFilterItem(filterProduct);
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

      // if (category_search_product.length === 0 && dataList.length <= 0) {
      //   setDataList([{ title: "Product not Found" }]);
      // } else {
      setDataList(category_search_product);
      // }
    } else {
      setDataList([]);
    }
  };

  // const getUniqueListById = (arr, key) => {
  //   return [...new Map(arr.map((item) => [item[key], item])).values()];
  // };

  useEffect(() => {
    // Call handleLogin when component mounts
    handleLogin();
  }, []);

  const cartContextValue = {
    cart,
    wishlist,
    order,
    snackbar,
    dataList,
    // search,
    filterItem,
    selectedProduct,
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
    handleLogin,
    getUniqueListById,
    addToCartonNotLogin,
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
