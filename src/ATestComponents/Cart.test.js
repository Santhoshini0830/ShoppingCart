import { render, fireEvent, screen } from "@testing-library/react";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Cart } from "../Components/Cart";

const queryClient = new QueryClient();

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

const mockCartItems = [
  {
    id: 1,
    title: "Redmi 9",
    image: "https://images.example.com/redmi9.jpg",
    price: 9644,
  },
  { id: 2, title: "ProductTitle", image: "ProductImage.jpg", price: 4513 },
];

const renderAddToCartComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <Cart />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("Cart component", () => {
  let mockSetCartData;
  let mockIncreaseQuantity;
  let mockDecreaseQuantity;
  let mockHandleSnackbar;

  beforeEach(() => {
    mockSetCartData = jest.fn();
    mockIncreaseQuantity = jest.fn((item) => {
      item.quantity += 1;
      mockSetCartData((prevData) => ({
        ...prevData,
        cartTotal: prevData.cartTotal + item.price,
        searchCartTotal: prevData.searchCartTotal + item.price,
      }));
    });
    mockDecreaseQuantity = jest.fn((item) => {
      if (item.quantity > 1) {
        item.quantity -= 1;
        mockSetCartData((prevData) => ({
          ...prevData,
          cartTotal: prevData.cartTotal - item.price,
          searchCartTotal: prevData.searchCartTotal - item.price,
        }));
      }
    });
    mockHandleSnackbar = jest.fn();

    useCartContext.mockReturnValue({
      removeFromCart: jest.fn(),
      handleSnackbar: mockHandleSnackbar,
      addToBuynowFromCart: jest.fn(),
      addToBuynowFromCartOnSearch: jest.fn(),
    });
  });

  test("Displays error message when placing an order without logging in", () => {
    useCartContext.mockReturnValue({
      cart: [{ id: 1, title: "product1" }],
      selectedProduct: [],
      handleSnackbar: mockHandleSnackbar,
      addToBuynowFromCart: jest.fn(),
      addToBuynowFromCartOnSearch: jest.fn(),
    });

    // Set the user email in localStorage as null (not logged in)
    // localStorage.setItem("userEmail", null);

    renderAddToCartComponent();

    const placeOrderButton = screen.getByTestId("placeOrder");

    fireEvent.click(placeOrderButton);

    // Check that handleSnackbar is called with the correct parameters
    expect(mockHandleSnackbar).toHaveBeenCalledTimes(1);
    expect(mockHandleSnackbar).toHaveBeenCalledWith(
      true,
      "User is not logged in",
      "error"
    );
  });
  test("displays empty message when cart is empty", () => {
    useCartContext.mockReturnValue({
      cart: [],
      filterItem: [],
      selectedProduct: [],
    });
    renderAddToCartComponent();

    const text = screen.getByText("Cart is empty");
    expect(text).toHaveTextContent("Cart is empty");
  });

  test("displays 'Product not found' message when filterItem is null", () => {
    useCartContext.mockReturnValue({
      cart: mockCartItems,
      selectedProduct: [],
      filterItem: null,
    });

    const { getByText } = renderAddToCartComponent();
    const notFoundMessage = getByText("Product not found");
    expect(notFoundMessage).toHaveTextContent("Product not found");
  });

  test("Displays cart products when cart is not empty", () => {
    useCartContext.mockReturnValue({
      cart: mockCartItems,
      filterItem: [],
      selectedProduct: [],
    });

    renderAddToCartComponent();

    expect(screen.getByText("Redmi 9")).toHaveTextContent("Redmi 9");
    expect(screen.getByText("ProductTitle")).toHaveTextContent("ProductTitle");
  });

  test("Displays Search products when cart and search are not empty", () => {
    useCartContext.mockReturnValue({
      cart: mockCartItems,
      selectedProduct: mockCartItems,
      filterItem: mockCartItems,
    });

    renderAddToCartComponent();

    expect(screen.getByText("Redmi 9")).toHaveTextContent("Redmi 9");
    expect(screen.getByText("ProductTitle")).toHaveTextContent("ProductTitle");
  });

  test("Returns logged-in user email when placing an order", () => {
    useCartContext.mockReturnValue({
      cart: [{ id: 1, title: "product1" }],
      selectedProduct: [{ id: 1, title: "product1" }],
      addToBuynowFromCartOnSearch: jest.fn(),
    });
    localStorage.setItem("userEmail", "test@example.com");

    renderAddToCartComponent();

    const placeOrderButton = screen.getByTestId("placeOrder");

    fireEvent.click(placeOrderButton);

    const loggedInUserEmail = localStorage.getItem("userEmail");

    expect(loggedInUserEmail).toBe("test@example.com");
  });
});
