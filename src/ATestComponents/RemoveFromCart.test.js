import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RemoveFromCart } from "../Components/RemoveFromCart";
import { CartContextProvider, useCartContext } from "../Components/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

jest.mock("../Components/CartContext", () => ({
  ...jest.requireActual("../Components/CartContext"),
  useCartContext: jest.fn(),
}));

describe("RemoveFromCart", () => {
  test("renders REMOVE TO CART button", () => {
    const products = [
      {
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
      },
    ];

    const mockRemoveFromCart = jest.fn();
    const mockHandleSnackbar = jest.fn();

    useCartContext.mockReturnValue({
      removeFromCart: mockRemoveFromCart,
      handleSnackbar: mockHandleSnackbar,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <CartContextProvider products={products || []}>
          <Router>
            <RemoveFromCart product="product" title="Product1" id="1" />
          </Router>
        </CartContextProvider>
      </QueryClientProvider>
    );

    const deleteIcon = screen.getByTestId("DeleteIcon-field");
    fireEvent.click(deleteIcon);

    expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
    expect(mockHandleSnackbar).toHaveBeenCalledTimes(1);
    expect(mockHandleSnackbar).toHaveBeenCalledWith(
      true,
      "Product1 removed from cart",
      "error"
    );
  });
});
