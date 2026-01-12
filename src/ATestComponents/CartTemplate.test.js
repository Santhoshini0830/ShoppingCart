import { render, fireEvent, screen } from "@testing-library/react";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartTemplate } from "../Components/CartTemplate";

const queryClient = new QueryClient();

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

describe("Cart Template component", () => {
  let mockSetCartData;
  let mockIncreaseQuantity;
  let mockDecreaseQuantity;

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

    useCartContext.mockReturnValue({
      removeFromCart: jest.fn(),
    });
  });

  test("Increases and decreases quantity of cart items", () => {
    const mockCartItem = {
      id: 1,
      title: "Redmi 9",
      image: "https://images.example.com/redmi9.jpg",
      price: 9644,
      category: "electronics",
      quantity: 2,
    };

    const { getByLabelText } = render(
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <Router>
            <CartTemplate
              cart={[mockCartItem]}
              increaseQuantity={mockIncreaseQuantity}
              decreaseQuantity={mockDecreaseQuantity}
              setCartData={mockSetCartData}
            />
          </Router>
        </CartContextProvider>
      </QueryClientProvider>
    );

    const increaseButton = getByLabelText("Increase quantity");
    const decreaseButton = getByLabelText("Decrease quantity");

    fireEvent.click(increaseButton);
    expect(mockIncreaseQuantity).toHaveBeenCalledWith(mockCartItem);
    expect(mockCartItem.quantity).toBe(3);

    fireEvent.click(decreaseButton);
    expect(mockDecreaseQuantity).toHaveBeenCalledWith(mockCartItem);
    expect(mockCartItem.quantity).toBe(2);

    expect(mockSetCartData).toHaveBeenCalledTimes(2);
    expect(mockSetCartData).toHaveBeenCalledWith(expect.any(Function));
  });
});
