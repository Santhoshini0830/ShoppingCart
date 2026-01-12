import React from "react";
import { render } from "@testing-library/react";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RelatedProducts } from "../Components/RelatedProducts";

const queryClient = new QueryClient();

describe("RelatedProducts Component", () => {
  const product = {
    id: 1,
    image: "example-image.jpg",
    title: "Example Product",
    price: "₹9,644.00",
  };

  it("navigates to product details page on click", () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <Router>
            <RelatedProducts {...product} />
          </Router>
        </CartContextProvider>
      </QueryClientProvider>
    );

    const link = getByTestId("product-link");
    expect(link.getAttribute("href")).toBe(`/productDetails/${product.id}`);
  });
});
