import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CartContextProvider } from "../Components/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { PopupForm } from "../Components/PopupForm";

const queryClient = new QueryClient();

const renderPopupComponent = (handleClose, content) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <PopupForm handleClose={handleClose} content={content} />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("PopupForm Component", () => {
  const handleClose = jest.fn();
  const content = "Example content";

  it("calls handleClose function when close button is clicked", () => {
    const { getByTestId } = renderPopupComponent(handleClose, content);

    const closeButton = getByTestId("close-button");

    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
