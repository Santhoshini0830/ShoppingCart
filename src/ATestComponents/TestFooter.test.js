import React from "react";
import { render } from "@testing-library/react";
import { Footer } from "../Components/Footer";

test("renders ShoppingMart.com text in Footer component", () => {
  const { getByText: getByTextFooter } = render(<Footer />);

  const shoppingMartText = getByTextFooter("ShoppingMart.com");

  expect(shoppingMartText).toHaveTextContent("ShoppingMart.com");
});
