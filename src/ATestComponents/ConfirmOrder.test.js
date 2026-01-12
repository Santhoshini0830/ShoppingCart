import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfirmOrderPopup } from "../Components/ConfirmOrderPopup";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

const renderConfirmOrderPopupComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <ConfirmOrderPopup />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("ConfirmOrderPopup component", () => {
  test("renders the user's saved address and order details", () => {
    const mockUserEmail = "test@example.com";
    const mockUserData = [
      {
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        phoneNo: "1234567890",
        street: "123 Main St",
        city: "Example City",
        zip: "12345",
      },
    ];

    const mockConfrimOrder = [
      {
        id: 1,
        title: "Product 1",
      },
      {
        id: 2,
        title: "Product 2",
      },
    ];

    useCartContext.mockReturnValue({
      confrimOrder: mockConfrimOrder,
    });

    localStorage.setItem("userEmail", mockUserEmail);
    localStorage.setItem("userData", JSON.stringify(mockUserData));

    renderConfirmOrderPopupComponent();

    const savedAddressElement = screen.getByText("Saved Address:");
    expect(savedAddressElement).toHaveTextContent("Saved Address:");

    const firstNameElement = screen.getByText("John,");
    expect(firstNameElement).toHaveTextContent("John,");

    const lastNameElement = screen.getByText("Doe,");
    expect(lastNameElement).toHaveTextContent("Doe,");

    const phoneNoElement = screen.getByText("1234567890,");
    expect(phoneNoElement).toHaveTextContent("1234567890,");

    const streetElement = screen.getByText("123 Main St,");
    expect(streetElement).toHaveTextContent("123 Main St,");

    const cityElement = screen.getByText("Example City,");
    expect(cityElement).toHaveTextContent("Example City,");

    const zipElement = screen.getByText("12345");
    expect(zipElement).toHaveTextContent("12345");

    const orderDetailsElement = screen.getByText("The Order for");
    expect(orderDetailsElement).toHaveTextContent("The Order for");

    const product1Element = screen.getByText("Product 1");
    expect(product1Element).toHaveTextContent("Product 1");

    const product2Element = screen.getByText("Product 2");
    expect(product2Element).toHaveTextContent("Product 2");
  });

  test("navigates to the 'thankYou' page when the 'Confirm Order' button is clicked", () => {
    const mockUseNavigate = jest.fn();

    useCartContext.mockReturnValue({
      confrimOrder: [],
    });

    useNavigate.mockReturnValue(mockUseNavigate);
    mockUseNavigate.mockImplementation(() => {});

    renderConfirmOrderPopupComponent();

    const confirmOrderButton = screen.getByRole("button", {
      name: "Confirm Order",
    });
    fireEvent.click(confirmOrderButton);

    expect(mockUseNavigate).toHaveBeenCalledWith("/thankYou");
  });

  test("navigates to the 'checkOut' page when the 'go back' button is clicked", () => {
    const mockUseNavigate = jest.fn();

    useCartContext.mockReturnValue({
      confrimOrder: [],
    });

    useNavigate.mockReturnValue(mockUseNavigate);
    mockUseNavigate.mockImplementation(() => {});

    renderConfirmOrderPopupComponent();

    const goBackButton = screen.getByRole("button", { name: "go back" });
    fireEvent.click(goBackButton);

    expect(mockUseNavigate).toHaveBeenCalledWith("/checkOut");
  });
});
