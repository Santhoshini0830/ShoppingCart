import axios from "axios";
import { renderHook } from "@testing-library/react-hooks";
import { useProductsData } from "../Components/useProductsData";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const renderUseProductsData = () => {
  return renderHook(() => useProductsData(), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
};

jest.mock("axios");

describe("useProductsData", () => {
  test("fetches products data successfully", async () => {
    const mockData = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result, waitFor } = renderUseProductsData();

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  test("handles products data fetching error", async () => {
    const mockError = new Error("Failed to fetch products");
    axios.get.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderUseProductsData();
    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
  });
});
