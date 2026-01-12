import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "../Components/Login";
import { CartContextProvider } from "../Components/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const renderLoginComponent = (afterLoginMock) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Router>
          <Login afterLogin={afterLoginMock} />
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

describe("Login Component", () => {
  test("displays error messages for empty fields", () => {
    renderLoginComponent(() => {});
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.click(loginButton);

    const emailError = screen.getByText("Email is required");
    expect(emailError).toHaveTextContent("Email is required");

    const passwordError = screen.getByText("Password is required");
    expect(passwordError).toHaveTextContent("Password is required");
  });

  test("displays error message for invalid email format", () => {
    renderLoginComponent(() => {});
    const emailInput = screen.getByLabelText("Email Address*");
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.click(loginButton);

    const emailError = screen.getByText("Enter valid email");

    expect(emailError).toHaveTextContent("Enter valid email");
  });

  test("displays error message for invalid password format", () => {
    const afterLoginMock = jest.fn();

    renderLoginComponent(afterLoginMock);
    const passwordInput = screen.getByLabelText("Password*");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(loginButton);

    const passwordError = screen.getByText("Enter valid password");
    expect(passwordError).toHaveTextContent("Enter valid password");
  });

  test("displays error message for invalid credentials", () => {
    renderLoginComponent(() => {});

    const emailInput = screen.getByLabelText("Email Address*");
    const passwordInput = screen.getByLabelText("Password*");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });
    fireEvent.click(loginButton);

    const invalidCredentialsError = screen.getByText("Enter valid password");
    expect(invalidCredentialsError).toHaveTextContent("Enter valid password");
  });

  test("calls afterLogin and handleLogin functions on successful login", () => {
    const afterLoginMock = jest.fn();

    renderLoginComponent(afterLoginMock);
    const emailInput = screen.getByLabelText("Email Address*");
    const passwordInput = screen.getByLabelText("Password*");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(loginButton);
    expect(afterLoginMock).toHaveBeenCalledTimes(1);
  });

  test("displays error message for invalid credentials", () => {
    renderLoginComponent(() => {});

    const emailInput = screen.getByLabelText("Email Address*");
    const passwordInput = screen.getByLabelText("Password*");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });
    fireEvent.click(loginButton);

    const invalidCredentialsError = screen.getByText("Enter valid password");
    expect(invalidCredentialsError).toHaveTextContent("Enter valid password");
  });

  test("calls afterLogin and handleLogin functions on successful login", () => {
    const afterLoginMock = jest.fn();

    renderLoginComponent(afterLoginMock);
    const emailInput = screen.getByLabelText("Email Address*");
    const passwordInput = screen.getByLabelText("Password*");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(loginButton);
    expect(afterLoginMock).toHaveBeenCalledTimes(1);
  });

  test("displays 'Enter valid email' error message if email is not found in userdata", () => {
    // Simulate userdata with matching password but no matching email
    const userdata = [
      { email: "user1@example.com", password: "password1" },
      { email: "user2@example.com", password: "password2" },
    ];
    localStorage.setItem("userData", JSON.stringify(userdata));

    renderLoginComponent(() => {});

    const emailInput = screen.getByLabelText("Email Address*");
    const passwordInput = screen.getByLabelText("Password*");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, {
      target: { value: "invaliduser@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "password1" } });

    fireEvent.click(loginButton);

    const invalidEmailError = screen.getByText("Enter valid email");
    expect(invalidEmailError).toHaveTextContent("Enter valid email");
  });

  test("displays 'Enter valid password' error message if password is not found in userdata", () => {
    // Simulate userdata with matching email but no matching password
    const userdata = [
      { email: "user1@example.com", password: "password1" },
      { email: "user2@example.com", password: "password2" },
    ];
    localStorage.setItem("userData", JSON.stringify(userdata));

    renderLoginComponent(() => {});

    const emailInput = screen.getByLabelText("Email Address*");
    const passwordInput = screen.getByLabelText("Password*");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "user1@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "invalidpassword" } });

    fireEvent.click(loginButton);

    const invalidPasswordError = screen.getByText("Enter valid password");
    expect(invalidPasswordError).toHaveTextContent("Enter valid password");
  });

  test("performs successful login and calls the afterLogin and handleLogin functions", () => {
    const afterLoginMock = jest.fn();

    // Simulate userdata with matching email and password
    const userdata = [
      { email: "user1@example.com", password: "password1" },
      { email: "user2@example.com", password: "password2" },
    ];
    localStorage.setItem("userData", JSON.stringify(userdata));

    renderLoginComponent(afterLoginMock);

    const emailInput = screen.getByLabelText("Email Address*");
    const passwordInput = screen.getByLabelText("Password*");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "user1@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password1" } });

    fireEvent.click(loginButton);

    // Expect that the afterLoginMock function is called
    expect(afterLoginMock).toHaveBeenCalledTimes(1);

    // Check that localStorage has been updated with the user's email
    expect(localStorage.getItem("userEmail")).toBe("user1@example.com");

    // TODO: Add assertions for handleLogin and document.body.classList.remove("popup-open") if relevant
  });
  test("displays 'Enter valid password' error message if password is not found in userdata", () => {
    // Simulate userdata with matching email but no matching password
    const userdata = [
      { email: "user1@example.com", password: "password1" },
      { email: "user2@example.com", password: "password2" },
    ];
    localStorage.setItem("userData", JSON.stringify(userdata));

    renderLoginComponent(() => {});

    const emailInput = screen.getByLabelText("Email Address*");
    const passwordInput = screen.getByLabelText("Password*");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "user1@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "invalidpassword" } });

    fireEvent.click(loginButton);

    const invalidPasswordError = screen.getByText("Enter valid password");
    expect(invalidPasswordError).toHaveTextContent("Enter valid password");
  });
});
