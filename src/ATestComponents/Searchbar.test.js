import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { Searchbar } from "../Components/Searchbar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

const renderSearchBarComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <Searchbar />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("Searchbar component", () => {
  beforeEach(() => {
    useLocation.mockReturnValue({
      pathname: "/",
    });
  });

  test("updates the search text and calls search functions when the input value changes", () => {
    const mockSearchCategory = jest.fn();
    const mockClearSearch = jest.fn();
    const mockSearchDatalist = jest.fn();
    const mockWishlistSearch = jest.fn();
    const mockCartSearch = jest.fn();

    useCartContext.mockReturnValue({
      searchCategory: mockSearchCategory,
      clearSearch: mockClearSearch,
      searchDatalist: mockSearchDatalist,
      wishlistSearch: mockWishlistSearch,
      cartSearch: mockCartSearch,
      dataList: [],
    });

    renderSearchBarComponent();

    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(searchInput.value).toBe("test");
    expect(mockSearchCategory).not.toHaveBeenCalled();
    expect(mockClearSearch).not.toHaveBeenCalled();
    expect(mockSearchDatalist).toHaveBeenCalledTimes(1);
    expect(mockSearchDatalist).toHaveBeenCalledWith("test");
    expect(mockWishlistSearch).toHaveBeenCalledTimes(0);
    expect(mockCartSearch).toHaveBeenCalledTimes(0);
  });

  test("clears the search text and calls clearSearch function when the input value becomes empty", () => {
    const mockClearSearch = jest.fn();
    const mockSearchDatalist = jest.fn();

    useCartContext.mockReturnValue({
      searchCategory: jest.fn(),
      clearSearch: mockClearSearch,
      searchDatalist: mockSearchDatalist,
      wishlistSearch: jest.fn(),
      cartSearch: jest.fn(),
      dataList: [],
    });

    renderSearchBarComponent();

    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.change(searchInput, { target: { value: "" } });

    expect(searchInput.value).toBe("");
    expect(mockClearSearch).toHaveBeenCalledTimes(1);
    expect(mockClearSearch).toHaveBeenCalledWith("");
    expect(mockSearchDatalist).toHaveBeenCalledTimes(2);
    expect(mockSearchDatalist).toHaveBeenCalledWith("");
  });

  test("displays the search results dropdown when dataList is not empty", () => {
    const mockDataList = [
      { title: "Item 1" },
      { title: "Item 2" },
      { title: "Item 3" },
    ];

    useCartContext.mockReturnValue({
      searchCategory: jest.fn(),
      clearSearch: jest.fn(),
      searchDatalist: jest.fn(),
      wishlistSearch: jest.fn(),
      cartSearch: jest.fn(),
      dataList: mockDataList,
    });

    renderSearchBarComponent();

    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });

    const dropdownItems = screen.getAllByTestId("search-result-item");
    expect(dropdownItems).toHaveLength(mockDataList.length);
  });

  test("navigates to the home page and clears the search when an item in the dropdown is clicked", () => {
    const mockItemTitle = "Item 1";
    const mockClearSearch = jest.fn();
    const mockSearchDatalist = jest.fn();

    useCartContext.mockReturnValue({
      searchCategory: jest.fn(),
      clearSearch: mockClearSearch,
      searchDatalist: mockSearchDatalist,
      wishlistSearch: jest.fn(),
      cartSearch: jest.fn(),
      dataList: [{ title: mockItemTitle }],
    });

    const mockUseNavigate = jest.fn();
    const mockUseLocation = jest.fn(() => ({ pathname: "/" }));

    require("react-router-dom").useNavigate = mockUseNavigate;
    require("react-router-dom").useLocation = mockUseLocation;

    renderSearchBarComponent();

    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });

    const dropdownItem = screen.getByText("Item 1");
    fireEvent.click(dropdownItem);

    expect(mockClearSearch).toHaveBeenCalledTimes(1);
    expect(mockClearSearch).toHaveBeenCalledWith("Item 1");
    expect(mockSearchDatalist).toHaveBeenCalledTimes(2);
  });

  test("calls searchCategory with correct arguments when path includes 'categories'", () => {
    const mockSearchCategory = jest.fn();
    useCartContext.mockReturnValue({
      searchCategory: mockSearchCategory,
      clearSearch: jest.fn(),
      searchDatalist: jest.fn(),
      wishlistSearch: jest.fn(),
      cartSearch: jest.fn(),
      dataList: [],
    });

    useLocation.mockReturnValue({ pathname: "/categories/categoryValue" });

    renderSearchBarComponent();

    const value = "test";
    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value } });

    expect(mockSearchCategory).toHaveBeenCalledTimes(1);
    expect(mockSearchCategory).toHaveBeenCalledWith(value, "categoryValue");
  });

  test("calls wishlistSearch when path includes 'wishlist'", () => {
    const mockWishlistSearch = jest.fn();
    useCartContext.mockReturnValue({
      searchCategory: jest.fn(),
      clearSearch: jest.fn(),
      searchDatalist: jest.fn(),
      wishlistSearch: mockWishlistSearch,
      cartSearch: jest.fn(),
      dataList: [],
    });

    useLocation.mockReturnValue({ pathname: "/wishlist" });

    renderSearchBarComponent();

    const value = "test";
    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value } });

    expect(mockWishlistSearch).toHaveBeenCalledTimes(1);
    expect(mockWishlistSearch).toHaveBeenCalledWith(value);
  });

  test("calls cartSearch when path includes 'cart'", () => {
    const mockCartSearch = jest.fn();
    useCartContext.mockReturnValue({
      searchCategory: jest.fn(),
      clearSearch: jest.fn(),
      searchDatalist: jest.fn(),
      wishlistSearch: jest.fn(),
      cartSearch: mockCartSearch,
      dataList: [],
    });

    useLocation.mockReturnValue({ pathname: "/cart" });

    renderSearchBarComponent();

    const value = "test";
    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value } });

    expect(mockCartSearch).toHaveBeenCalledTimes(1);
    expect(mockCartSearch).toHaveBeenCalledWith(value);
  });
  test("calls searchDatalist when path does not match any condition", () => {
    const mockSearchDatalist = jest.fn();
    useCartContext.mockReturnValue({
      searchCategory: jest.fn(),
      clearSearch: jest.fn(),
      searchDatalist: mockSearchDatalist,
      wishlistSearch: jest.fn(),
      cartSearch: jest.fn(),
      dataList: [],
    });

    useLocation.mockReturnValue({ pathname: "/other" });

    renderSearchBarComponent();

    const value = "test";
    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value } });

    expect(mockSearchDatalist).toHaveBeenCalledTimes(1);
    expect(mockSearchDatalist).toHaveBeenCalledWith(value);
  });
});
