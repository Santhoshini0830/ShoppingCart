import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { BreadcrumbsTemplate } from "../Components/BreadcrumbsTemplate";
import { CartContextProvider } from "../Components/CartContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const renderBreadcrumbsComponent = (initialPathname) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialPathname]}>
        <CartContextProvider>
          <BreadcrumbsTemplate />
        </CartContextProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("BreadcrumbsTemplate", () => {
  test("clicking on a breadcrumb link navigates to the corresponding page", () => {
    const initialPathname = "/products/electronics/product1";
    const { getByText } = renderBreadcrumbsComponent(initialPathname);
    const productCrumb = getByText("Electronics");
    fireEvent.click(productCrumb);
    expect(window.location.pathname).toEqual("/");
  });

  test("removes last numeric element from pathname in breadcrumbs", () => {
    const initialPathname = "/home/products/123";

    renderBreadcrumbsComponent(initialPathname);

    const breadcrumbText = screen.getByText("Products");
    expect(breadcrumbText).toBeInTheDocument();

    const numericBreadcrumb = screen.queryByText("123");
    expect(numericBreadcrumb).not.toBeInTheDocument();
  });
});
