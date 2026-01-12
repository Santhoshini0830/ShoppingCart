import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { useProductsData } from "../Components/useProductsData";

jest.mock("../Components/useProductsData", () => ({
  ...jest.requireActual("../Components/useProductsData"),
  useProductsData: jest.fn(),
}));

describe("CartContextProvider", () => {
  const wrapper = ({ children }) => (
    <CartContextProvider>{children}</CartContextProvider>
  );

  beforeEach(() => {
    useProductsData.mockReturnValue({
      data: [
        { id: 1, name: "Product 1", price: 10 },
        { id: 2, name: "Product 2", price: 20 },
      ],
    });
  });

  test("addToCart should add a product to the cart", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, title: "Product 1" });
    });

    expect(result.current.cart).toEqual([{ id: 1, title: "Product 1" }]);
  });

  test("removeFromCart should remove a product from the cart", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.removeFromCart(1);
    });

    expect(result.current.cart).toEqual([]);
  });

  test("removeFromWishlist should remove a product from the wishlist", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addToWishlist({ id: 1, name: "Product 1" });
    });

    act(() => {
      result.current.removeFromWishlist(1);
    });

    act(() => {
      result.current.removeFromListOnLogout({ id: 1, title: "Product 1" });
    });

    expect(result.current.wishlist).toEqual([]);
  });

  test("clearCartAndLocalStorage should clear the cart and order lists", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, title: "Product 1" });
    });

    act(() => {
      result.current.addToCartonNotLogin({ id: 1, title: "Product 1" });
    });

    act(() => {
      result.current.addToBuynow({ id: 2, title: "Product 2" });
    });

    act(() => {
      result.current.addToConfirmOrder({ id: 2, title: "Product 2" });
    });

    act(() => {
      result.current.addToBuynowFromCartOnSearch({ id: 2, title: "Product 2" });
    });

    act(() => {
      result.current.clearCartAndLocalStorage();
    });

    act(() => {
      result.current.removeFromCartOnLogout();
    });

    expect(result.current.cart).toEqual([]);
    expect(result.current.order).toEqual([]);
  });

  test("updateOrder should update the order with the provided updated order", () => {
    const initialOrder = [
      { id: 1, title: "Product 1", price: 10 },
      { id: 2, title: "Product 2", price: 20 },
    ];

    const wrapper = ({ children }) => (
      <CartContextProvider initialOrder={initialOrder}>
        {children}
      </CartContextProvider>
    );

    const { result } = renderHook(() => useCartContext(), { wrapper });

    const updatedOrder = { id: 2, title: "Updated Product 2", price: 25 };

    act(() => {
      result.current.addToBuynowFromCart(updatedOrder);
    });
    act(() => {
      result.current.updateOrder(updatedOrder);
    });

    act(() => {
      result.current.removeFromBuyNow(updatedOrder);
    });

    act(() => {
      result.current.clearCheckOut(updatedOrder);
    });

    expect(result.current.order).toEqual([]);
  });

  test("clearSearch should handle undefined searchProduct in userData", () => {
    const initialDataList = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" },
      { id: 3, title: "Product 3" },
    ];

    const wrapper = ({ children }) => (
      <CartContextProvider initialDataList={initialDataList}>
        {children}
      </CartContextProvider>
    );

    const { result } = renderHook(() => useCartContext(), { wrapper });

    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [{ email: loginUserEmail }];
    localStorage.setItem("userData", JSON.stringify(userData));

    const searchText = "product";

    act(() => {
      result.current.clearSearch(searchText);
    });

    expect(result.current.selectedProduct).toEqual([]);
    expect(result.current.filterItem).toEqual(null);
    expect(result.current.dataList).toEqual([]);

    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");
    const updatedUserData = savedUserData.find(
      (user) => user.email === loginUserEmail
    );

    expect(updatedUserData.searchProduct).toEqual([]);

    localStorage.removeItem("userData");
    localStorage.removeItem("userEmail");
  });

  test("searchDatalist should update the dataList to an empty array when dataListItem is empty", () => {
    const initialDataList = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" },
      { id: 3, title: "Product 3" },
    ];

    const products = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" },
      { id: 3, title: "Product 3" },
    ];

    const wrapper = ({ children }) => (
      <CartContextProvider
        initialDataList={initialDataList}
        products={products}
      >
        {children}
      </CartContextProvider>
    );

    const { result } = renderHook(() => useCartContext(), { wrapper });

    const dataListItems = "product";

    act(() => {
      result.current.searchDatalist(dataListItems);
    });

    const dataListItem = "";

    act(() => {
      result.current.searchDatalist(dataListItem);
    });

    expect(result.current.dataList).toEqual([]);
  });

  test("wishlistSearch should update the dataList with filtered wishlist products", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    const searchWishlistText = "Product_1";
    act(() => {
      result.current.addToWishlist({ id: 1, name: "Product_1", price: 10 });
    });
    act(() => {
      result.current.wishlistSearch(searchWishlistText);
    });

    const searchCartTexts = "";

    act(() => {
      result.current.wishlistSearch(searchCartTexts);
    });

    expect(result.current.dataList).toEqual([]);
  });

  test("cartSearch should update the dataList with filtered cart products", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    const searchCartText = "Product_1";
    act(() => {
      result.current.addToCart({ id: 1, title: "Product_1" });
    });
    act(() => {
      result.current.cartSearch(searchCartText);
    });

    expect(result.current.dataList).toEqual([{ id: 1, title: "Product_1" }]);

    const searchCartTexts = "";

    act(() => {
      result.current.cartSearch(searchCartTexts);
    });

    expect(result.current.dataList).toEqual([]);
  });

  test("categorySearch should update the dataList with filtered wishlist products", () => {
    const products = [
      { id: 1, title: "Product_1", category: "electronics" },
      { id: 2, title: "Product 2", category: "electronics" },
      { id: 3, title: "Product 3", category: "electronics" },
    ];

    useProductsData.mockReturnValue({
      data: products,
    });

    const { result } = renderHook(() => useCartContext(), { wrapper });

    const searchCategoryText = "Product_1";
    const categories = "electronics";

    act(() => {
      result.current.searchCategory(searchCategoryText, categories);
    });

    expect(result.current.dataList).toEqual([
      { id: 1, title: "Product_1", category: "electronics" },
    ]);

    const searchCategoryTexts = "";

    act(() => {
      result.current.searchCategory(searchCategoryTexts);
    });

    expect(result.current.dataList).toEqual([]);
  });

  test("addtobuynow should handle add the product to localstorage according to user in userData", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [{ email: loginUserEmail }];
    localStorage.setItem("userData", JSON.stringify(userData));
    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");
    const updatedUserData =
      savedUserData &&
      savedUserData.find((user) => user.email === loginUserEmail);
    userData.orderList = [];
    localStorage.setItem("userData", JSON.stringify(savedUserData));

    act(() => {
      result.current.addToBuynow({ id: 1, title: "Product 1" });
    });

    const userDatas = [{ orderList: [{ id: 1, title: "Product 1" }] }];
    localStorage.setItem("userData", JSON.stringify(userDatas));

    act(() => {
      result.current.removeFromBuyNow({ id: 1, title: "Product 1" });
    });
    const removeData = [{ orderList: [] }];
    localStorage.setItem("userData", JSON.stringify(removeData));

    expect(result.current.order).toEqual([]);

    localStorage.removeItem("userData");
    localStorage.removeItem("userEmail");
  });
  test("addtobuynowfromcart should add the product to localstorage according to the user in userData", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [{ email: loginUserEmail }];
    localStorage.setItem("userData", JSON.stringify(userData));
    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");
    const updatedUserData =
      savedUserData &&
      savedUserData.find((user) => user.email === loginUserEmail);

    act(() => {
      result.current.addToCart([{ id: 1, title: "Product 1" }]);
    });

    act(() => {
      result.current.addToWishlist([{ id: 1, title: "Product 1" }]);
    });

    act(() => {
      result.current.addToBuynowFromCartOnSearch([
        { id: 1, title: "Product 1" },
      ]);
    });

    act(() => {
      result.current.addToBuynowFromCart([{ id: 1, title: "Product 1" }]);
    });
    act(() => {
      result.current.addToConfirmOrder([{ id: 1, title: "Product 1" }]);
    });

    act(() => {
      result.current.addToBuynow([{ id: 1, title: "Product 1" }]);
    });

    const userDatas = [{ orderList: [{ id: 1, title: "Product 1" }] }];
    localStorage.setItem("userData", JSON.stringify(userDatas));

    act(() => {
      result.current.removeFromBuyNow({ id: 1, title: "Product 1" });
    });

    act(() => {
      result.current.removeFromCart({ id: 1, title: "Product 1" });
    });

    act(() => {
      result.current.removeFromWishlist({ id: 1, title: "Product 1" });
    });

    act(() => {
      result.current.clearCartAndLocalStorage();
    });

    act(() => {
      result.current.clearCheckOut();
    });
    const removeData = [
      { orderList: [] },
      { cartList: [] },
      { wishlistList: [] },
    ];
    localStorage.setItem("userData", JSON.stringify(removeData));

    expect(result.current.order).toEqual([]);
    expect(result.current.cart).toEqual([]);

    localStorage.removeItem("userData");
    localStorage.removeItem("userEmail");
  });
  test("removeFromCart should remove a product from the cart when user is logged in", () => {
    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [
      { email: loginUserEmail, cartList: [{ id: 1, title: "Product 1" }] },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));

    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.removeFromCart({ id: 1, title: "Product 1" });
    });

    expect(result.current.cart).toEqual([]);
  });

  test("removeFromCart should remove a product from the cart when user is not logged in", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addToCart({ id: 1, title: "Product 1" });
    });

    act(() => {
      result.current.removeFromCart({ id: 1, title: "Product 1" });
    });

    expect(result.current.cart).toEqual([]);
  });

  test("removeFromCart should not do anything if the product is not in the cart", () => {
    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [
      { email: loginUserEmail, cartList: [{ id: 1, title: "Product 1" }] },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));

    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.removeFromCart({ id: 2, title: "Product 2" });
    });

    expect(result.current.cart).toEqual([{ id: 1, title: "Product 1" }]);
  });

  test("removeFromCart should update state when user is logged in and product is removed from the cart", () => {
    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [
      { email: loginUserEmail, cartList: [{ id: 1, title: "Product 1" }] },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));

    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.removeFromCart({ id: 1, title: "Product 1" });
    });

    expect(result.current.cart).toEqual([]);
    expect(result.current.selectedProduct).toEqual([]);
  });

  test("removeFromBuyNow should remove a product from the BuyNow list when user is logged in", () => {
    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [
      { email: loginUserEmail, orderList: [{ id: 1, title: "Product 1" }] },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));

    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.removeFromBuyNow({ id: 1, title: "Product 1" });
    });

    expect(result.current.order).toEqual([]);
  });

  test("removeFromBuyNow should not do anything if the product is not in the BuyNow list", () => {
    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [
      { email: loginUserEmail, orderList: [{ id: 1, title: "Product 1" }] },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));

    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.removeFromBuyNow({ id: 2, title: "Product 2" });
    });

    expect(result.current.order).toEqual([{ id: 1, title: "Product 1" }]);
  });

  test("removeFromBuyNow should update state when user is logged in and product is removed from the BuyNow list", () => {
    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [
      { email: loginUserEmail, orderList: [{ id: 1, title: "Product 1" }] },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));

    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.removeFromBuyNow({ id: 1, title: "Product 1" });
    });

    expect(result.current.order).toEqual([]);
  });

  test("removeFromBuyNow should not do anything if the user is not logged in", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addToBuynow({ id: 1, title: "Product 1" });
    });

    act(() => {
      result.current.removeFromBuyNow({ id: 1, title: "Product 1" });
    });

    expect(result.current.order).toEqual([]);
  });

  test("removeFromBuyNow should not update state if user is not logged in and product is removed from BuyNow list", () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.addToBuynow({ id: 1, title: "Product 1" });
      result.current.addToBuynow({ id: 2, title: "Product 2" });
    });

    act(() => {
      result.current.removeFromBuyNow({ id: 1, title: "Product 1" });
    });

    expect(result.current.order).toEqual([{ id: 2, title: "Product 2" }]);
  });
  test("clearCartAndLocalStorage should clear the cart and order lists when user is logged in", () => {
    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [
      {
        email: loginUserEmail,
        cartList: [{ id: 1, title: "Product 1" }],
        orderList: [{ id: 2, title: "Product 2" }],
      },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));

    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.clearCartAndLocalStorage();
    });

    expect(result.current.cart).toEqual([]);
    expect(result.current.order).toEqual([]);
  });

  test("clearCheckOut should clear the order list when user is logged in", () => {
    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [
      { email: loginUserEmail, orderList: [{ id: 1, title: "Product 1" }] },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));

    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.clearCheckOut();
    });

    expect(result.current.order).toEqual([]);
  });
  test("removeFromWishlist should remove product from wishlist when user is logged in and product exists in wishlist", () => {
    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [
      {
        email: loginUserEmail,
        wishlistList: [
          { id: 1, title: "Product 1" },
          { id: 2, title: "Product 2" },
        ],
      },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));

    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.removeFromWishlist({ id: 1, title: "Product 1" });
    });

    expect(result.current.wishlist).toEqual([{ id: 2, title: "Product 2" }]);
  });

  test("removeFromWishlist should not do anything if the product does not exist in the user's wishlist", () => {
    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [
      { email: loginUserEmail, wishlistList: [{ id: 1, title: "Product 1" }] },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));

    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.removeFromWishlist({ id: 2, title: "Product 2" });
    });

    expect(result.current.wishlist).toEqual([{ id: 1, title: "Product 1" }]);
  });

  test("removeFromWishlist should set selectedProduct and filterItem to null if there's only one product left in the wishlist after removal", () => {
    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [
      { email: loginUserEmail, wishlistList: [{ id: 1, title: "Product 1" }] },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));

    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.removeFromWishlist({ id: 1, title: "Product 1" });
    });

    expect(result.current.wishlist).toEqual([]);
    expect(result.current.filterItem).toEqual([]);
  });
});
