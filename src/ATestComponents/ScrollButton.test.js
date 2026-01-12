import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ScrollButton } from "../Components/ScrollButton";

describe("ScrollButton", () => {
  it("should scroll back to top when clicked if scroll position is above the threshold", () => {
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    Object.defineProperty(window, "scrollY", { value: 200, writable: true });

    const { getByLabelText } = render(<ScrollButton />);

    fireEvent.scroll(window, { target: { scrollY: 500 } });

    const scrollButton = getByLabelText("scroll back to top");

    fireEvent.click(scrollButton);
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("should show the scroll button if the scroll position becomes above the threshold", () => {
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });

    const { queryByLabelText } = render(<ScrollButton />);

    expect(queryByLabelText("scroll back to top")).toBeNull();

    fireEvent.scroll(window, { target: { scrollY: 300 } });

    expect(queryByLabelText("scroll back to top")).toBeNull();
  });
});
