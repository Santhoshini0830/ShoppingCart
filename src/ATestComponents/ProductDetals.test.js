import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CartContextProvider } from "../Components/CartContext";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { useProductsData } from "../Components/useProductsData";
import { ProductDetails } from "../Components/ProductDetails";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("../Components/useProductsData", () => ({
  ...jest.requireActual("../Components/useProductsData"),
  useProductsData: jest.fn(),
}));

const renderProductDetailsComponent = () => {
  return render(
    <CartContextProvider>
      <Router>
        <ProductDetails />
      </Router>
    </CartContextProvider>
  );
};

describe("ProductDetails component", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  const product = {
    id: 1,
    title: "Redmi 9",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71A9Vo1BatL._SL1500_.jpg",
    price: 9644,
    category: "eletronics",
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/71A9Vo1BatL.SL1500.jpg",
      "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-9-india.jpg",
      "https://rukminim1.flixcart.com/image/128/128/kex5ci80/mobile/x/w/r/mi-redmi-9-m2006c3mii-original-imafvhqqcdydh57x.jpeg?q=70",
      "https://rukminim1.flixcart.com/image/128/128/kex5ci80/mobile/x/w/r/mi-redmi-9-m2006c3mii-original-imafvhqquwerqpz8.jpeg?q=70",
      "https://rukminim1.flixcart.com/image/128/128/kex5ci80/mobile/x/w/r/mi-redmi-9-m2006c3mii-original-imafvhqqmkpgzssf.jpeg?q=70",
    ],
    payment: [
      "EMI starting from ₹432/month",
      "Cash on Delivery",
      "Net banking and Credit/ Debit/ ATM card",
    ],
    services: [
      "2 Year Warranty",
      "7 day seller replacement policy/brand assistance for device issues",
    ],
    highlights: [
      "4 GB RAM",
      "64 GB ROM",
      "Expandable Upto 512 GB",
      "16.59 cm (6.53 inch)",
      "Full HD+ Display 48MP + 8MP + 2MP + 2MP",
      "13MP Front Camera 5020 mAh Battery MediaTek Helio G85 Processor",
    ],
    description:
      "Redmi 9 Activ – More RAM Activ Fun supports your efficiency to multitask with its 6GB and 4GB RAM variants that delivers fast and smooth processing while gaming, online streaming.",
    specification:
      "128 GB ROM: 15.49 cm (6.1 inch) Super Retina XDR Display: 12MP + 12MP | 12MP Front Camera: A14 Bionic Chip with Next Generation Neural Engine Processor",
    total_reviews: 0,
    stars: 4.1,
    quantity: 1,
  };

  test("renders product details correctly", () => {
    const useParamsMock = jest.fn().mockReturnValue({ id: "1" });
    useParams.mockImplementation(useParamsMock);

    const useProductsDataMock = jest.fn().mockReturnValue({ data: [product] });
    useProductsData.mockImplementation(useProductsDataMock);

    const { getByText } = renderProductDetailsComponent();

    expect(getByText("Redmi 9")).toHaveTextContent("Redmi 9");
    expect(
      getByText(
        "128 GB ROM: 15.49 cm (6.1 inch) Super Retina XDR Display: 12MP + 12MP | 12MP Front Camera: A14 Bionic Chip with Next Generation Neural Engine Processor"
      )
    ).toHaveTextContent(
      "128 GB ROM: 15.49 cm (6.1 inch) Super Retina XDR Display: 12MP + 12MP | 12MP Front Camera: A14 Bionic Chip with Next Generation Neural Engine Processor"
    );
    expect(getByText("4 GB RAM")).toHaveTextContent("4 GB RAM");
    expect(getByText("64 GB ROM")).toHaveTextContent("64 GB ROM");
    expect(getByText("Expandable Upto 512 GB")).toHaveTextContent(
      "Expandable Upto 512 GB"
    );
    expect(getByText("16.59 cm (6.53 inch)")).toHaveTextContent(
      "16.59 cm (6.53 inch)"
    );
    expect(
      getByText("Full HD+ Display 48MP + 8MP + 2MP + 2MP")
    ).toHaveTextContent("Full HD+ Display 48MP + 8MP + 2MP + 2MP");
    expect(
      getByText(
        "13MP Front Camera 5020 mAh Battery MediaTek Helio G85 Processor"
      )
    ).toHaveTextContent(
      "13MP Front Camera 5020 mAh Battery MediaTek Helio G85 Processor"
    );
  });

  test("renders product details correctly", () => {
    localStorage.setItem("userEmail", "test@gmail.com");
    localStorage.setItem(
      "userData",
      JSON.stringify([
        {
          ide: ["1"],
        },
      ])
    );

    const useParamsMock = jest.fn().mockReturnValue({ id: "1" }, { id: "2" });
    useParams.mockImplementation(useParamsMock);

    const useProductsDataMock = jest.fn().mockReturnValue({ data: [product] });
    useProductsData.mockImplementation(useProductsDataMock);

    const { getByText } = renderProductDetailsComponent();

    const recentProducts = JSON.parse(localStorage.getItem("userData"));

    expect(recentProducts.length).toBe(1);
    expect(recentProducts[0].ide).toContain("1");
    expect(getByText("Redmi 9")).toHaveTextContent("Redmi 9");

    localStorage.clear();
  });

  test("updates the ide array when the loginUserEmail matches an existing item", () => {
    const loginUserEmail = "test@gmail.com";
    localStorage.setItem("userEmail", loginUserEmail);
    localStorage.setItem(
      "userData",
      JSON.stringify([
        {
          email: "test@gmail.com",
          ide: ["existingProductId"],
        },
      ])
    );

    const useParamsMock = jest.fn().mockReturnValue({ id: "newProductId" });
    useParams.mockImplementation(useParamsMock);

    const useProductsDataMock = jest.fn().mockReturnValue({ data: [product] });
    useProductsData.mockImplementation(useProductsDataMock);

    renderProductDetailsComponent();

    const recentProducts = JSON.parse(localStorage.getItem("userData"));

    expect(recentProducts.length).toBe(1);
    expect(recentProducts[0].email).toBe("test@gmail.com");

    expect(recentProducts[0].ide).toContain("newProductId");

    localStorage.clear();
  });

  test("creates a new item when the loginUserEmail does not match any item", () => {
    const loginUserEmail = "test@gmail.com";
    localStorage.setItem("userEmail", loginUserEmail);
    localStorage.setItem(
      "userData",
      JSON.stringify([
        {
          email: "anotheruser@gmail.com",
          ide: ["existingProductId"],
        },
      ])
    );

    const useParamsMock = jest.fn().mockReturnValue({ id: "newProductId" });
    useParams.mockImplementation(useParamsMock);

    const useProductsDataMock = jest.fn().mockReturnValue({ data: [product] });
    useProductsData.mockImplementation(useProductsDataMock);

    renderProductDetailsComponent();

    const recentProducts = JSON.parse(localStorage.getItem("userData"));

    expect(recentProducts.length).toBe(1);

    localStorage.clear();
  });

  test("renders the loading component when products are not available", () => {
    const useParamsMock = jest.fn().mockReturnValue({ id: "1" });
    useParams.mockImplementation(useParamsMock);

    const useProductsDataMock = jest.fn().mockReturnValue({ data: null });
    useProductsData.mockImplementation(useProductsDataMock);

    const { getByAltText } = renderProductDetailsComponent();

    const loaderImage = getByAltText("loading...");
    expect(loaderImage).toHaveAttribute("alt", "loading...");
  });

  test("should call setPreviewImg on image click", () => {
    const useParamsMock = jest.fn().mockReturnValue({ id: "1" });
    useParams.mockImplementation(useParamsMock);

    const useProductsDataMock = jest.fn().mockReturnValue({ data: [product] });
    useProductsData.mockImplementation(useProductsDataMock);

    const { getByTestId } = renderProductDetailsComponent();

    const imageElements = getByTestId("slider").querySelectorAll(".items");

    fireEvent.click(imageElements[0]);
  });
});
