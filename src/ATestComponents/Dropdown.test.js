import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartContextProvider } from "../Components/CartContext";
import { Dropdowns } from "../Components/Dropdowns";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

describe("Dropdowns component", () => {
  test("should open the menu and navigate to the selected category", () => {
    const { getByText, getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <Router>
            <Dropdowns />
          </Router>
        </CartContextProvider>
      </QueryClientProvider>
    );

    const button = getByRole("button");
    fireEvent.click(button);

    const electronicsMenuItem = getByText("ELECTRONICS");
    fireEvent.click(electronicsMenuItem);

    expect(window.location.pathname).toBe("/categories/eletronics");
  });
});
