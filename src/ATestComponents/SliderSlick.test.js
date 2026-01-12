import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SampleNextArrow } from "../Components/SliderSlick";

const renderSliderSlickComponent = (onClickMock) => {
  return render(<SampleNextArrow onClick={onClickMock} />);
};

describe("SampleNextArrow", () => {
  test("should call onClick when clicked", () => {
    const onClickMock = jest.fn();
    const { container } = renderSliderSlickComponent(onClickMock);
    const arrow = container.firstChild;

    fireEvent.click(arrow);

    expect(onClickMock).toHaveBeenCalled();
  });

  test("should call onClick when clicked", () => {
    const onClickMock = jest.fn();
    const { container } = renderSliderSlickComponent(onClickMock);
    const arrow = container.firstChild;

    fireEvent.click(arrow);

    expect(onClickMock).toHaveBeenCalled();
  });
});
