import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { AddToList } from "../Components/AddToList";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

const renderAddToListComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <AddToList
            product={{ id: 1, title: "Product 1" }}
            title="Product 1"
            id={1}
          />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("AddToList", () => {
  const mockAddToWishlist = jest.fn();
  const mockRemoveFromWishlist = jest.fn();
  const mockHandleSnackbar = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("userEmail", "user@example.com");
    useCartContext.mockReturnValue({
      wishlist: [],
      addToWishlist: mockAddToWishlist,
      removeFromWishlist: mockRemoveFromWishlist,
      handleSnackbar: mockHandleSnackbar,
    });
  });

  test("renders with non-active icon", () => {
    const { getByTestId } = renderAddToListComponent();
    const favoriteIcon = getByTestId("FavoriteBorderIcon-field");
    expect(favoriteIcon).toHaveClass("icon-nonactive");
  });

  test("clicking on non-active icon adds product to the wishlist", () => {
    const { getByTestId } = renderAddToListComponent();
    const favoriteIcon = getByTestId("FavoriteBorderIcon-field");
    fireEvent.click(favoriteIcon);
    expect(mockAddToWishlist).toHaveBeenCalledTimes(1);
    expect(mockAddToWishlist).toHaveBeenCalledWith({
      id: 1,
      title: "Product 1",
    });
    expect(mockHandleSnackbar).toHaveBeenCalledWith(
      true,
      "Product 1 added to wishlist",
      "success"
    );
  });

  test("clicking on active icon removes product from the wishlist", () => {
    useCartContext.mockReturnValueOnce({
      wishlist: [{ id: 1, title: "Product 1" }],
      addToWishlist: mockAddToWishlist,
      removeFromWishlist: mockRemoveFromWishlist,
      handleSnackbar: mockHandleSnackbar,
    });

    const { getByTestId } = renderAddToListComponent();
    const favoriteIcon = getByTestId("FavoriteBorderIcon-field");
    fireEvent.click(favoriteIcon);
    expect(mockRemoveFromWishlist).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromWishlist).toHaveBeenCalledWith({
      id: 1,
      title: "Product 1",
    });
    expect(mockHandleSnackbar).toHaveBeenCalledWith(
      true,
      "Product 1 removed from Wishlist",
      "error"
    );
  });

  test("displays error message when user is not logged in", () => {
    localStorage.removeItem("userEmail");
    const { getByTestId } = renderAddToListComponent();
    const favoriteIcon = getByTestId("FavoriteBorderIcon-field");
    fireEvent.click(favoriteIcon);
    expect(mockHandleSnackbar).toHaveBeenCalledWith(
      true,
      "User is not logged in",
      "error"
    );
  });
});
