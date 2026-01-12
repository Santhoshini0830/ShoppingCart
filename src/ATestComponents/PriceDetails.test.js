import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { PriceDetails } from "../Components/PriceDetails";

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

const renderPriceDetailsComponent = (pathname) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <PriceDetails
            lastLocation={{
              pathname,
            }}
          />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("PriceDetails Component", () => {
  let addToConfirmOrderMock;
  let navigateMock;

  beforeEach(() => {
    addToConfirmOrderMock = jest.fn();
    navigateMock = jest.fn();

    useCartContext.mockReturnValue({
      addToConfirmOrder: addToConfirmOrderMock,
    });

    localStorage.clear();
  });

  test("navigates to confirm order when checkout button is clicked", () => {
    const userData = [
      {
        email: "test@example.com",
        address: [{ id: 1, street: "123 Main St" }],
      },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userEmail", "test@example.com");

    addToConfirmOrderMock = jest.fn();
    navigateMock = jest.fn();

    useCartContext.mockReturnValue({
      addToConfirmOrder: addToConfirmOrderMock,
    });

    const mockUseNavigate = jest.fn();
    useNavigate.mockReturnValue(mockUseNavigate);
    mockUseNavigate.mockImplementation(() => {});

    renderPriceDetailsComponent("/cart");

    fireEvent.click(screen.getByText("Checkout"));

    expect(addToConfirmOrderMock).toHaveBeenCalled();
    expect(mockUseNavigate).toHaveBeenCalledWith("/confirmOrder");
  });

  test("navigates to confirm order when checkout button is clicked and user has an address, but comes from a different path", () => {
    const userData = [
      {
        email: "test@example.com",
        address: [{ id: 1, street: "123 Main St" }],
      },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userEmail", "test@example.com");

    useCartContext.mockReturnValue({
      addToConfirmOrder: addToConfirmOrderMock,
    });

    const mockUseNavigate = jest.fn();
    useNavigate.mockReturnValue(mockUseNavigate);

    renderPriceDetailsComponent("/");

    fireEvent.click(screen.getByText("Checkout"));

    expect(addToConfirmOrderMock).toHaveBeenCalled();

    expect(mockUseNavigate).toHaveBeenCalledWith("/confirmOrder");
  });

  test("displays AddressForm when user has no address", () => {
    const userData = [
      {
        email: "test@example.com",
        address: [],
      },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userEmail", "test@example.com");
    useCartContext.mockReturnValue({
      addToConfirmOrder: addToConfirmOrderMock,
    });

    const mockUseNavigate = jest.fn();
    useNavigate.mockReturnValue(mockUseNavigate);

    renderPriceDetailsComponent("/cart");

    expect(screen.getByText("Checkout")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Checkout"));

    expect(mockUseNavigate).not.toHaveBeenCalled();
    expect(addToConfirmOrderMock).not.toHaveBeenCalled();
  });

  test("navigates to confirm order when checkout button is clicked and user has an address", () => {
    const userData = [
      {
        email: "test@example.com",
        address: [{ id: 1, street: "123 Main St" }],
      },
    ];
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userEmail", "test@example.com");
    useCartContext.mockReturnValue({
      addToConfirmOrder: addToConfirmOrderMock,
    });

    const mockUseNavigate = jest.fn();
    useNavigate.mockReturnValue(mockUseNavigate);

    renderPriceDetailsComponent("/cart");

    fireEvent.click(screen.getByText("Checkout"));

    expect(addToConfirmOrderMock).toHaveBeenCalled();
    expect(mockUseNavigate).toHaveBeenCalledWith("/confirmOrder");
  });
});
