import React, { createContext, useContext, useState } from "react";
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
  // const [search, setSearch] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const queryClient = useQueryClient();
  const products = queryClient.getQueryData("products");
  // console.log("products", products);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const addToBuynow = (product) => {
    setOrder(() => [product]);
  };

  // const addToBuynowFromCart = (product) => {
  //   setOrder(() => [cart]);
  // };

  const addToBuynowFromCart = (product) => {
    setOrder((prevOrder) => [...cart]); // Add cart items to the order
    // setCart([]); // Clear the cart after adding items to the order
  };

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  const updateOrder = (product) => {
    order.map((item) => {
      if (item === product) {
        return product;
      }
      return item;
    });

    setOrder((prevOrder) => [...prevOrder, ...order]); // Add cart items to the order

    // setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item !== product));
  };

  const removeFromWishlist = (product) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item !== product)
    );
  };

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

  // const clearSearch = (searchText) => {
  //   if (searchText.length > 0) {
  //     const product = dataList.filter((item) =>
  //       item.title.toLowerCase().includes(searchText.toLowerCase())
  //     );

  //     if (product.length <= 0 && dataList.length <= 0) {
  //       setSearch("Product Not Found");
  //     } else if (dataList.title !== "Product not Found") {
  //       setSearch(product);
  //     }
  //   } else {
  //     setSearch([]);
  //   }
  // };

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

  // const clearSearch = (action) => {
  //   const { payload } = action;

  //   if (payload.length > 0) {
  //     const product = dataList.filter((item) =>
  //       item.title.toLowerCase().includes(payload.toLowerCase())
  //     );

  //     const filterProduct =
  //       payload.length > 0 && product.length === 0 && dataList !== payload
  //         ? null
  //         : dataList.length > 0;

  //     setSelectedProduct(product);
  //     setFilterItem(filterProduct);
  //     setDataList(product);
  //   } else if (payload.length > 0 && wishlist.length > 0) {
  //     const product = products.filter((item) =>
  //       item.title.toLowerCase().includes(payload.toLowerCase())
  //     );

  //     const filterProduct =
  //       payload.length > 0 && dataList.length === 0
  //         ? null
  //         : dataList.length > 0;

  //     setSelectedProduct(product);
  //     setFilterItem(filterProduct);
  //   } else if (payload.length > 0 && wishlist.length > 0) {
  //     const productListIds = products.filter((product) =>
  //       wishlist.includes(product.id)
  //     );
  //     const product = productListIds.filter((item) =>
  //       item.title.toLowerCase().includes(payload.toLowerCase())
  //     );
  //     const filterProduct =
  //       payload.length > 0 && product.length === 0 && dataList.length === 0
  //         ? null
  //         : dataList.length > 0;
  //     setSelectedProduct(product);
  //     setFilterItem(filterProduct);
  //   } else if (payload.length > 0 && cart.length > 0) {
  //     const productCartIds = products.filter((product) =>
  //       cart.includes(product.id)
  //     );

  //     const product = productCartIds.filter((item) =>
  //       item.title.toLowerCase().includes(payload.toLowerCase())
  //     );

  //     const filterProduct =
  //       payload.length > 0 && product.length === 0 && dataList.length === 0
  //         ? null
  //         : dataList.length > 0;
  //     setSelectedProduct(product);
  //     setFilterItem(filterProduct);
  //   } else {
  //     setSelectedProduct([]);
  //     setFilterItem([]);
  //   }
  // };

  const wishlistSearch = (searchWishListext) => {
    if (searchWishListext.length > 0) {
      const wishlist_search_product = wishlist.filter((item) =>
        item.title.toLowerCase().includes(searchWishListext.toLowerCase())
      );
      const filterProduct =
        searchWishListext.length > 0 &&
        wishlist_search_product.length === 0 &&
        dataList !== searchWishListext
          ? null
          : dataList.length > 0;

      setSelectedProduct(wishlist_search_product);
      setFilterItem(filterProduct);
      setDataList(wishlist_search_product);
    } else {
      setSelectedProduct([]);
      setFilterItem([]);
    }

    //   if (wishlist_search_product.length === 0 && dataList.length <= 0) {
    //     setDataList([{ title: "Product not Found" }]);
    //   } else {
    //     setDataList(wishlist_search_product);
    //   }
    // } else {
    //   setDataList([]);
    // }
  };

  const cartSearch = (searchCarttext) => {
    if (searchCarttext.length > 0) {
      const cartlist_search_product = cart.filter((item) =>
        item.title.toLowerCase().includes(searchCarttext.toLowerCase())
      );

      if (cartlist_search_product.length === 0 && dataList.length <= 0) {
        setDataList([{ title: "Product not Found" }]);
      } else {
        setDataList(cartlist_search_product);
      }
    } else {
      setDataList([]);
    }
  };

  const searchCategory = (searchCategoryText, categories) => {
    if (searchCategoryText.length > 0) {
      const { data } = queryClient.getQueryData("elements");
      const category_product = data.filter((item) =>
        item.category.toLowerCase().includes(categories.toLowerCase())
      );

      const category_search_product = category_product.filter((item) =>
        item.title.toLowerCase().includes(searchCategoryText.toLowerCase())
      );

      if (category_search_product.length === 0 && dataList.length <= 0) {
        setDataList([{ title: "Product not Found" }]);
      } else {
        setDataList(category_search_product);
      }
    } else {
      setDataList([]);
    }
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
