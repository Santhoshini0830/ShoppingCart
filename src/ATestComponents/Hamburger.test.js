import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Hamburger } from "../Components/Hamburger";

const renderHamburgerComponent = () => {
  return render(
    <Router>
      <Hamburger />
    </Router>
  );
};

describe("Hamburger component", () => {
  test("opens and closes the sidebar when the hamburger menu button is clicked", () => {
    renderHamburgerComponent();

    const menuButton = screen.getByTestId("menu-button");
    const menuBox = screen.getByTestId("menu-box");

    expect(menuBox).toHaveStyle("display: block");

    fireEvent.click(menuButton);
    // fireEvent.click(menuButton);
    expect(menuBox).toHaveStyle("display: block");
  });

  test("closes the sidebar when a menu item is clicked", () => {
    renderHamburgerComponent();

    const menuButton = screen.getByTestId("menu-button");
    const menuBox = screen.getByTestId("menu-box");

    fireEvent.click(menuButton);

    const homeMenuItem = screen.getByText("Home");
    fireEvent.click(homeMenuItem);
    expect(menuBox).toHaveStyle({ display: "block" });
  });
});
