import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { OrderSummary } from "../Components/OrderSummary";

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

const renderOrderSummaryComponent = (mockSelectedProduct) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <OrderSummary selectedProduct={mockSelectedProduct} />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("Order Summary component", () => {
  const mockOrder = [
    {
      id: 1,
      title: "Product 1",
      image: "product1.jpg",
      price: 10,
      quantity: 2,
    },
    {
      id: 2,
      title: "Product 2",
      image: "product2.jpg",
      price: 20,
      quantity: 1,
    },
  ];

  test("renders the empty checkout message and 'GO TO HOME' button", () => {
    const mockSelectedProduct = [];
    useCartContext.mockReturnValue({
      order: [],
      cart: [],
      selectedProduct: [],
    });

    useNavigate.mockReturnValue(jest.fn());

    renderOrderSummaryComponent(mockSelectedProduct);

    const emptyCheckoutMessage = screen.getByText("checkout has no products");
    expect(emptyCheckoutMessage).toHaveTextContent("checkout has no products");

    const goToHomeButton = screen.getByRole("button", { name: "GO TO HOME" });
    expect(goToHomeButton).toHaveTextContent("GO TO HOME");
  });

  test("clears the selectedProduct array and navigates to the home page when 'GO TO HOME' button is clicked", () => {
    const mockSelectedProduct = [];
    const mockUseNavigate = jest.fn();
    useCartContext.mockReturnValue({
      order: [],
      cart: [],
      selectedProduct: [],
    });

    useNavigate.mockReturnValue(mockUseNavigate);
    mockUseNavigate.mockImplementation(() => {});

    renderOrderSummaryComponent(mockSelectedProduct);

    const goToHomeButton = screen.getByRole("button", { name: "GO TO HOME" });
    fireEvent.click(goToHomeButton);

    expect(mockSelectedProduct.length).toBe(0);
    expect(mockUseNavigate).toHaveBeenCalledWith("/");
  });

  test("displays the ordersummary products", () => {
    useCartContext.mockReturnValue({
      order: mockOrder,
      cart: mockOrder,
      selectedProduct: [],
    });

    const { getByText } = renderOrderSummaryComponent();

    expect(getByText("Product 1")).toHaveTextContent("Product 1");
    expect(getByText("Product 2")).toHaveTextContent("Product 2");
  });

  test("deletes a product from checkout", () => {
    const mockRemoveFromBuyNow = jest.fn();

    useCartContext.mockReturnValue({
      order: mockOrder,
      removeFromBuyNow: mockRemoveFromBuyNow,
      handleSnackbar: jest.fn(),
    });

    renderOrderSummaryComponent();

    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);

    expect(mockRemoveFromBuyNow).toHaveBeenCalledTimes(1);
    expect(mockRemoveFromBuyNow).toHaveBeenCalledWith(mockOrder[0]);
  });

  test("increases quantity of a product", () => {
    const mockUpdateOrder = jest.fn();

    useCartContext.mockReturnValue({
      order: mockOrder,
      updateOrder: mockUpdateOrder,
    });

    renderOrderSummaryComponent();

    const increaseButton = screen.getAllByTestId("increase-button")[0];
    fireEvent.click(increaseButton);

    expect(mockUpdateOrder).toHaveBeenCalledTimes(1);
    expect(mockUpdateOrder).toHaveBeenCalledWith({
      ...mockOrder[0],
      quantity: 3,
    });
  });

  test("decreases quantity of a product", () => {
    const mockUpdateOrder = jest.fn();

    useCartContext.mockReturnValue({
      order: mockOrder,
      updateOrder: mockUpdateOrder,
    });

    renderOrderSummaryComponent();

    const decreaseButton = screen.getAllByTestId("decrease-button")[0];
    fireEvent.click(decreaseButton);

    expect(mockUpdateOrder).toHaveBeenCalledTimes(1);
    expect(mockUpdateOrder).toHaveBeenCalledWith({
      ...mockOrder[0],
      quantity: 1,
    });
  });

  test("applies and removes promo code", () => {
    const mockUpdateOrder = jest.fn();
    useCartContext.mockReturnValue({
      order: mockOrder,
      cart: mockOrder,
      updateOrder: mockUpdateOrder,
      selectedProduct: [],
    });

    const { getByTestId, getByLabelText } = renderOrderSummaryComponent();

    const enterCouponCodeInput = getByLabelText("Enter Coupon Code");
    fireEvent.change(enterCouponCodeInput, { target: { value: "SUMMER" } });
    const applyButton = getByTestId("apply-button");
    fireEvent.click(applyButton);
    const promoCodeAppliedLabel = getByTestId("promo-code-applied-label");

    expect(promoCodeAppliedLabel).toHaveTextContent("SUMMER");
  });
});
