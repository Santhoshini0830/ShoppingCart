import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { CustomSnackBar } from "../Components/CustomSnackBar";

const queryClient = new QueryClient();

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

const renderCustomSnackBarComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <CustomSnackBar />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("CustomSnackBar component", () => {
  test("renders the snackbar with the provided message and type", () => {
    const mockMessage = "Test message";
    const mockType = "success";

    useCartContext.mockReturnValue({
      snackbar: {
        open: true,
        message: mockMessage,
        type: mockType,
      },
      handleSnackbar: jest.fn(),
    });

    renderCustomSnackBarComponent();

    const snackbarElement = screen.getByRole("alert");
    expect(snackbarElement).toHaveTextContent(mockMessage);
  });

  test("closes the snackbar when the close button is clicked", () => {
    const mockHandleSnackbar = jest.fn();

    useCartContext.mockReturnValue({
      snackbar: {
        open: true,
        message: "Test message",
        type: "success",
      },
      handleSnackbar: mockHandleSnackbar,
    });

    renderCustomSnackBarComponent();

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockHandleSnackbar).toHaveBeenCalledWith(
      false,
      "Test message",
      "success"
    );
  });
});
