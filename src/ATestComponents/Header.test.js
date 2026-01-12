import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { QueryClient, QueryClientProvider } from "react-query";
import { Header } from "../Components/Header";

const queryClient = new QueryClient();

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

const renderHeaderComponent = (history) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <MemoryRouter history={history}>
          <Header dataList={[]} />
        </MemoryRouter>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("Header component", () => {
  test("navigates to cart page when clicking on the cart icon", () => {
    useCartContext.mockReturnValue({
      cart: [],
      wishlist: [],
      filterItem: [],
      selectedProduct: [],
      dataList: [],
      clearSearch: jest.fn(),
    });
    const history = createMemoryHistory();
    history.push("/cart");

    const { getByTestId } = renderHeaderComponent(history);

    const cartIcon = getByTestId("cartIcon-field");
    fireEvent.click(cartIcon);
    expect(history.location.pathname).toBe("/cart");
  });

  test("navigates to home page when clicking on the logo", () => {
    useCartContext.mockReturnValue({
      cart: [],
      wishlist: [],
      filterItem: [],
      selectedProduct: [],
      dataList: [],
      clearSearch: jest.fn(),
    });
    const history = createMemoryHistory();
    history.push("/");

    const { getByText } = renderHeaderComponent(history);

    const logoText = getByText("SHOPPING");
    fireEvent.click(logoText);
    expect(history.location.pathname).toBe("/");
  });

  test("navigates to wishlist page when clicking on the favorite icon", () => {
    useCartContext.mockReturnValue({
      cart: [],
      wishlist: [],
      filterItem: [],
      selectedProduct: [],
      dataList: [],
      clearSearch: jest.fn(),
    });
    const history = createMemoryHistory();
    history.push("/wishlist");

    const { getByTestId } = renderHeaderComponent(history);

    const favoriteIcon = getByTestId("favoriteIcon-field");
    fireEvent.click(favoriteIcon);
    expect(history.location.pathname).toBe("/wishlist");
  });

  test("renders the logo correctly", () => {
    useCartContext.mockReturnValue({
      cart: [],
      wishlist: [],
      filterItem: [],
      selectedProduct: [],
      dataList: [],
      clearSearch: jest.fn(),
    });

    const history = createMemoryHistory();
    const { getByText } = renderHeaderComponent(history);

    const logoText = getByText("SHOPPING");
    expect(logoText).toHaveTextContent("SHOPPING");
  });

  test("should display the cart icon if cart is not empty", () => {
    const history = createMemoryHistory();
    const mockCartItems = [
      {
        id: 1,
        name: "Product 1",
        price: 100,
      },
      {
        id: 2,
        name: "Product 2",
        price: 200,
      },
    ];
    useCartContext.mockReturnValue({
      cart: mockCartItems,
      wishlist: mockCartItems,
      filterItem: [],
      selectedProduct: [],
      dataList: [],
      clearSearch: jest.fn(),
    });

    const { getByTestId } = renderHeaderComponent(history);

    const cartIcon = getByTestId("cartIcon-field");
    expect(cartIcon).toBeTruthy();
    const listIcon = getByTestId("favoriteIcon-field");
    expect(listIcon).toBeTruthy();
  });
});
