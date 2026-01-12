import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LogoutUser } from "../Components/LogoutUser";
import { CartContextProvider } from "../Components/CartContext";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const renderLogoutUserComponent = () => {
  let navigatePath = null;

  const MockNavigate = () => {
    const navigate = useNavigate();
    return (path) => {
      navigatePath = path;
      navigate(path);
    };
  };

  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <MockNavigate />
          <LogoutUser />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("LogoutUser component", () => {
  test("renders logout button when the user is logged in", () => {
    localStorage.setItem("userEmail", "example@example.com");

    renderLogoutUserComponent();

    const logoutButton = screen.getByRole("button", {
      name: "example@example.com",
    });
    expect(logoutButton).toHaveTextContent("example@example.com");
  });

  test("clicking logout button removes login from localStorage and navigates to '/'", () => {
    localStorage.setItem("userEmail", "example@example.com");

    renderLogoutUserComponent();

    const logoutButton = screen.getByRole("button", {
      name: "example@example.com",
    });
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("userEmail")).toBeNull();
    localStorage.removeItem("userEmail");
  });

  test("clicking login button opens login/signup popup", () => {
    renderLogoutUserComponent();

    const loginButton = screen.getByTestId("login");
    fireEvent.click(loginButton);

    expect(loginButton).toHaveTextContent("Login/Signup");
  });

  test("afterLogout should remove form data from localStorage if state.isOpen is false", () => {
    renderLogoutUserComponent();
    expect(screen.queryByTestId("dialog")).toBeNull();

    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    expect(document.body.classList.contains("popup-open")).toBe(true);

    const logoutButton = screen.getByRole("button", {
      name: "Login/Signup",
    });

    fireEvent.click(logoutButton);

    expect(localStorage.getItem("formData")).toBeNull();
    expect(localStorage.getItem("formValues")).toBeNull();
    localStorage.removeItem("userEmail");
  });

  test("afterSignup should update state correctly", () => {
    renderLogoutUserComponent();

    const logoutButton = screen.getByRole("button", {
      name: "Login/Signup",
    });

    fireEvent.click(logoutButton);
    const loginButton = screen.getByTestId("login");
    fireEvent.click(loginButton);

    expect(screen.queryByTestId("signPage")).toBeNull();
  });
});
