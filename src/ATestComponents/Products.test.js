import { render } from "@testing-library/react";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Products } from "../Components/Products";
import { useProductsData } from "../Components/useProductsData";

const queryClient = new QueryClient();

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

jest.mock("../Components/useProductsData", () => ({
  ...jest.requireActual("../Components/useProductsData"),
  useProductsData: jest.fn(),
}));

const renderProductsComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <Products />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("Products component", () => {
  const mockProducts = [
    { id: 1, title: "Product 1", image: "product1.jpg", price: 10 },
    { id: 2, title: "Product 2", image: "product2.jpg", price: 20 },
  ];

  test("displays the Selecproducts on search", () => {
    useCartContext.mockReturnValue({
      wishlist: mockProducts,
      filterItem: null,
      selectedProduct: mockProducts,
      cart: mockProducts,
    });
    useProductsData.mockReturnValue({
      data: mockProducts,
    });
    const { getByText } = renderProductsComponent();

    expect(getByText("Product 1")).toHaveTextContent("Product 1");
    expect(getByText("Product 2")).toHaveTextContent("Product 2");
  });

  test("displays the No product found message on serach of products", () => {
    useCartContext.mockReturnValue({
      selectedProduct: [],
      filterItem: null,
      wishlist: mockProducts,
      cart: mockProducts,
    });
    useProductsData.mockReturnValue({
      data: mockProducts,
    });
    const { getByText } = renderProductsComponent();

    const notFoundMessage = getByText("Product not found");

    expect(notFoundMessage).toHaveTextContent("Product not found");
  });

  test("displays the products list", () => {
    useCartContext.mockReturnValue({
      selectedProduct: [],
      filterItem: "mocked-filter-item",
      wishlist: mockProducts,
      cart: mockProducts,
    });
    useProductsData.mockReturnValue({
      data: mockProducts,
    });
    const { getByText } = renderProductsComponent();
    expect(getByText("Product 1")).toHaveTextContent("Product 1");
    expect(getByText("Product 2")).toHaveTextContent("Product 2");
  });
});
