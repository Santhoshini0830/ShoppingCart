import React from "react";
import { render } from "@testing-library/react";
import { Thankyou } from "../Components/Thankyou";

test("renders Thank you  text in Thank you component", () => {
  const { getByText: getByTextThankyou } = render(<Thankyou />);

  const orderConfirmedText = getByTextThankyou("Order Confirmed!!");
  const thankYouText = getByTextThankyou("Thank you");

  expect(orderConfirmedText).toHaveTextContent("Order Confirmed!!");
  expect(thankYouText).toHaveTextContent("Thank you");
});
