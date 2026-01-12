import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AddToCart } from "../Components/AddToCart";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

const renderAddToCartComponent = (mockProduct) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <AddToCart
            product={mockProduct}
            title={mockProduct.title}
            id={mockProduct.id}
          />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("AddToCart component", () => {
  let mockProduct;
  let mockAddToCart;
  let mockHandleSnackbar;
  let mockUseNavigate;

  beforeEach(() => {
    mockProduct = {
      id: 1,
      title: "Product 1",
    };

    mockAddToCart = jest.fn();
    mockHandleSnackbar = jest.fn();
    mockUseNavigate = jest.fn();

    useCartContext.mockReturnValue({
      addToCart: mockAddToCart,
      cart: [],
      handleSnackbar: mockHandleSnackbar,
    });

    useNavigate.mockReturnValue(mockUseNavigate);
  });

  test("calls addToCart function and shows a success snackbar when 'ADD TO CART' button is clicked", () => {
    renderAddToCartComponent(mockProduct);

    const addToCartButton = screen.getByRole("button", {
      name: "ADD TO CART",
    });
    fireEvent.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    expect(mockHandleSnackbar).toHaveBeenCalledTimes(1);
    expect(mockHandleSnackbar).toHaveBeenCalledWith(
      true,
      "Product 1 added to cart",
      "success"
    );
  });

  test("navigates to the 'cart' page when 'GO TO CART' button is clicked", () => {
    useCartContext.mockReturnValue({
      addToCart: mockAddToCart,
      cart: [mockProduct],
      handleSnackbar: mockHandleSnackbar,
    });

    renderAddToCartComponent(mockProduct);

    const goToCartButton = screen.getByRole("button", {
      name: "GO TO CART",
    });
    fireEvent.click(goToCartButton);

    expect(mockUseNavigate).toHaveBeenCalledWith("/cart");
  });
});
