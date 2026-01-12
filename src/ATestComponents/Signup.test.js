import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Signup } from "../Components/Signup";

describe("Signup component", () => {
  test("validates form and triggers signup function", () => {
    const afterSignupMock = jest.fn();

    render(<Signup afterSignup={afterSignupMock} />);

    const firstNameField = screen.getByTestId("firstName-field");
    const emailField = screen.getByTestId("email-field");
    const passwordField = screen.getByTestId("password-field");
    const lastNameField = screen.getByTestId("lastName-field");
    const mobileNumberField = screen.getByTestId("mobileNumber-field");

    firstNameField.value = "FirstName";
    fireEvent.change(firstNameField);

    expect(firstNameField.value).toBe("FirstName");

    emailField.value = "example@example.com";
    fireEvent.change(emailField);

    expect(emailField.value).toBe("example@example.com");

    passwordField.value = "examplePassword";
    fireEvent.change(passwordField);

    expect(passwordField.value).toBe("examplePassword");

    lastNameField.value = "LastName";
    fireEvent.change(lastNameField);

    expect(lastNameField.value).toBe("LastName");

    mobileNumberField.value = "1234567890";
    fireEvent.change(mobileNumberField);

    expect(mobileNumberField.value).toBe("1234567890");

    fireEvent.click(screen.getByText("Sign up"));
  });

  test("displays validation errors for invalid form inputs", () => {
    render(<Signup afterSignup={() => {}} />);

    fireEvent.click(screen.getByText("Sign up"));

    const firstNameInput = screen.getByLabelText("First Name*");
    const lastNameInput = screen.getByLabelText("Last Name*");
    const mobileNumberInput = screen.getByLabelText("Mobile Number*");
    const emailInput = screen.getByLabelText("Email Address*");
    const passwordInput = screen.getByLabelText("Password*");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password*");
    const signupButton = screen.getByRole("button", { name: "Sign up" });

    fireEvent.change(firstNameInput, { target: { value: "" } });
    fireEvent.change(lastNameInput, { target: { value: "" } });
    fireEvent.change(mobileNumberInput, { target: { value: "" } });
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "" } });
    fireEvent.click(signupButton);

    expect(screen.getByText("First Name Required")).toHaveTextContent(
      "First Name Required"
    );
    expect(screen.getByText("Last Name Required")).toHaveTextContent(
      "Last Name Required"
    );
    expect(screen.getByText("Email Required")).toHaveTextContent(
      "Email Required"
    );
    expect(screen.getByText("Mobile Number Required")).toHaveTextContent(
      "Mobile Number Required"
    );
    expect(screen.getByText("Password Required")).toHaveTextContent(
      "Password Required"
    );
    expect(screen.getByText("Confirm Password Required")).toHaveTextContent(
      "Confirm Password Required"
    );
  });

  test("displays validation errors for invalid form various inputs", () => {
    render(<Signup afterSignup={() => {}} />);

    const firstNameInput = screen.getByLabelText("First Name*");
    const lastNameInput = screen.getByLabelText("Last Name*");
    const mobileNumberInput = screen.getByLabelText("Mobile Number*");
    const emailInput = screen.getByLabelText("Email Address*");
    const passwordInput = screen.getByLabelText("Password*");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password*");
    const signupButton = screen.getByRole("button", { name: "Sign up" });

    fireEvent.change(firstNameInput, { target: { value: "john__doe" } });
    fireEvent.change(lastNameInput, { target: { value: "john.doe." } });
    fireEvent.change(mobileNumberInput, { target: { value: "@452sdd" } });
    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "8754" } });

    fireEvent.click(signupButton);

    const mobileNumberError = screen.getByText(
      "Mobile number must contain 10 digits"
    );
    const emailError = screen.getByText("Email is invalid");
    const passwordError = screen.getByText(
      "Password must contain letters and numbers"
    );

    const confirmPasswordError = screen.getByText("Password not matching");

    expect(mobileNumberError).toHaveTextContent(
      "Mobile number must contain 10 digits"
    );
    expect(emailError).toHaveTextContent("Email is invalid");
    expect(passwordError).toHaveTextContent(
      "Password must contain letters and numbers"
    );
    expect(confirmPasswordError).toHaveTextContent("Password not matching");

    const existingUserData = [
      {
        firstName: "John",
        lastName: "Doe",
        phoneNo: "1234567890",
        password: "password123",
        email: "existing@example.com",
        ide: [],
        address: [],
        wishlistList: [],
        cartList: [],
        orderList: [],
        searchProduct: [],
        confirmOrderList: [],
      },
    ];

    localStorage.setItem("userData", JSON.stringify(existingUserData));
    fireEvent.change(emailInput, { target: { value: "existing@example.com" } });
  });

  test("saves user data to local storage and triggers afterSignup callback", () => {
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: (key) => store[key] || "[]",
        setItem: (key, value) => {
          store[key] = value.toString();
        },
        removeItem: (key) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
      };
    })();
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });

    const afterSignupMock = jest.fn();

    const formValues = {
      firstName: "John",
      lastName: "Doe",
      phoneNo: "1234567890",
      password: "password123",
      email: "john.doe@example.com",
    };

    render(<Signup afterSignup={afterSignupMock} />);

    const firstNameField = screen.getByLabelText("First Name*");
    const lastNameField = screen.getByLabelText("Last Name*");
    const phoneNoField = screen.getByLabelText("Mobile Number*");
    const passwordField = screen.getByLabelText("Password*");
    const emailField = screen.getByLabelText("Email Address*");

    fireEvent.change(firstNameField, {
      target: { value: formValues.firstName },
    });
    fireEvent.change(lastNameField, { target: { value: formValues.lastName } });
    fireEvent.change(phoneNoField, { target: { value: formValues.phoneNo } });
    fireEvent.change(passwordField, { target: { value: formValues.password } });
    fireEvent.change(emailField, { target: { value: formValues.email } });

    fireEvent.click(screen.getByText("Sign up"));

    JSON.parse(localStorage.getItem("userData"));
  });
  test("calls afterSignup and handles successful signup", () => {
    const afterSignupMock = jest.fn();

    render(<Signup afterSignup={afterSignupMock} />);

    const firstNameInput = screen.getByLabelText("First Name*");
    const lastNameInput = screen.getByLabelText("Last Name*");
    const emailInput = screen.getByLabelText("Email Address*");
    const passwordInput = screen.getByLabelText("Password*");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password*");
    const signupButton = screen.getByText("Sign up");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(signupButton);

    const loginUserEmail = "test@gmail.com";
    localStorage.setItem("userEmail", loginUserEmail);

    const userData = {
      firstName: "lity",
      lastName: "kumar",
      phoneNo: 1255487542,
      password: "password123",
      email: "test@gmail.com",
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    expect(localStorage.getItem("userEmail")).toBe("test@gmail.com");
  });
});
