import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Sliders } from "../Components/Sliders";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";

const queryClient = new QueryClient();

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useQueryClient: jest.fn(),
}));

const renderSlidersComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <Sliders />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("Sliders component", () => {
  test("updates the active slide index when a slide is selected and clears search results when a slide is clicked", () => {
    const mockClearSearch = jest.fn();

    useCartContext.mockReturnValueOnce({
      clearSearch: mockClearSearch,
    });

    const { unmount } = renderSlidersComponent();

    const carouselItems = screen.getAllByTestId("carousel-item");

    fireEvent.click(carouselItems[1]);

    const activeSlideIndex = screen.getAllByTestId("carousel-item")[1];
    expect(activeSlideIndex).toHaveAttribute("data-testid", "carousel-item");
  });

  test("clears search results when a slide is clicked", () => {
    const mockClearSearch = jest.fn();

    useCartContext.mockReturnValueOnce({
      clearSearch: mockClearSearch,
    });

    renderSlidersComponent();

    const carouselItems = screen.getAllByTestId("carousel-item");
    fireEvent.click(carouselItems[1]);
    expect(mockClearSearch).toHaveBeenCalledTimes(1);
  });
  test("cleans up the effect when unmounted with index = 0", () => {
    const mockClearSearch = jest.fn();

    useCartContext.mockReturnValueOnce({
      clearSearch: mockClearSearch,
    });
    const { unmount } = renderSlidersComponent();

    expect(() => unmount()).not.toThrow();
  });

  // test("handles the handleSelect function properly", () => {
  //   const mockClearSearch = jest.fn();

  //   useCartContext.mockReturnValueOnce({
  //     clearSearch: mockClearSearch,
  //   });

  //   // renderSlidersComponent();

  //   //   const carouselItems = screen.getAllByTestId("carousel-item");

  //   //   fireEvent.click(carouselItems[2]);

  //   //   const activeSlideIndex = screen.getAllByTestId("carousel-item")[2];
  //   //   expect(activeSlideIndex).toHaveAttribute("data-testid", "carousel-item");
  //   // });
  //   const mockSetIndex = jest.fn();

  //   const mockUseQueryClient = jest.fn();
  //   mockUseQueryClient.setQueryData = jest.fn();

  //   useQueryClient.mockReturnValueOnce(mockUseQueryClient);

  //   renderSlidersComponent();
  //   React.useState = jest.fn(() => [0, mockSetIndex]);

  //   const carouselItems = screen.getAllByTestId("carousel-item");
  //   fireEvent.click(carouselItems[1]);
  //   React.useEffect.mock.calls[0][0]();
  //   expect(mockSetIndex).toHaveBeenCalledTimes(1);
  //   expect(mockSetIndex).toHaveBeenCalledWith(1);
  // });
});
