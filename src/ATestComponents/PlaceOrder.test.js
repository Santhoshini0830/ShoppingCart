import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { PlaceOrder } from "../Components/PlaceOrder";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const renderPlaceOrderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <PlaceOrder product={{ id: 1, title: "Product 1" }} />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("PlaceOrder component", () => {
  test("calls addToBuynow and navigates to checkOut when the BUY NOW button is clicked", () => {
    const mockAddToBuynow = jest.fn();
    const mockHandleSnackbar = jest.fn();
    const mockNavigate = jest.fn();

    localStorage.setItem("userEmail", "test@example.com");

    useCartContext.mockReturnValue({
      addToBuynow: mockAddToBuynow,
      handleSnackbar: mockHandleSnackbar,
      order: [],
    });

    useNavigate.mockReturnValue(mockNavigate);

    renderPlaceOrderComponent();

    const buyNowButton = screen.getByRole("button", { name: /BUY NOW/ });
    fireEvent.click(buyNowButton);

    expect(mockAddToBuynow).toHaveBeenCalledTimes(1);
    expect(mockHandleSnackbar).toHaveBeenCalledTimes(0);
    expect(mockNavigate).toHaveBeenCalledWith("/checkOut");
  });

  test("calls handleSnackbar when the BUY NOW button is clicked and the user is not logged in", () => {
    const mockAddToBuynow = jest.fn();
    const mockHandleSnackbar = jest.fn();
    const mockNavigate = jest.fn();

    useCartContext.mockReturnValue({
      addToBuynow: mockAddToBuynow,
      handleSnackbar: mockHandleSnackbar,
    });

    localStorage.setItem("userEmail", "");

    useNavigate.mockReturnValue(mockNavigate);

    renderPlaceOrderComponent();

    const buyNowButton = screen.getByRole("button", { name: /BUY NOW/ });
    fireEvent.click(buyNowButton);

    expect(mockAddToBuynow).toHaveBeenCalledTimes(0);
    expect(mockHandleSnackbar).toHaveBeenCalledTimes(1);
    expect(mockHandleSnackbar).toHaveBeenCalledWith(
      true,
      "User is not logged in",
      "error"
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
