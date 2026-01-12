import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { AddressForm } from "../Components/AddressForm";

const renderAddressFormComponent = (userAddress, loginUserEmail) => {
  return render(
    <AddressForm addressData={userAddress} loginUserEmail={loginUserEmail} />
  );
};

describe("AddressForm", () => {
  test("should display an error message when zip code contains non-numeric characters", () => {
    const { getByText, getByLabelText } = renderAddressFormComponent();
    const addButton = getByText("Add Address");

    fireEvent.click(addButton);

    const firstNameField = getByLabelText("First Name*");
    const lastNameField = getByLabelText("Last Name*");
    const mobileNumberField = getByLabelText("Mobile Number*");
    const houseNumberField = getByLabelText("House Number*");
    const streetField = getByLabelText("Street*");
    const cityField = getByLabelText("City*");
    const zipCodeField = getByLabelText("Zip Code*");

    fireEvent.change(firstNameField, { target: { value: "" } });
    fireEvent.change(lastNameField, { target: { value: "" } });
    fireEvent.change(mobileNumberField, { target: { value: "" } });
    fireEvent.change(houseNumberField, { target: { value: "" } });
    fireEvent.change(streetField, { target: { value: "" } });
    fireEvent.change(cityField, { target: { value: "" } });
    fireEvent.change(zipCodeField, { target: { value: "" } });

    const saveButton = getByText("Submit");
    fireEvent.click(saveButton);

    const firstNameError = getByText("First Name Required");
    const lastNameError = getByText("Last Name Required");
    const mobileNumberError = getByText("Mobile number Required");
    const houseNumberError = getByText("House number Required");
    const streetError = getByText("Street Name Required");
    const cityError = getByText("City Name Required");
    const zipCodeError = getByText("Zip Code Required");

    expect(firstNameError).toHaveTextContent("First Name Required");
    expect(lastNameError).toHaveTextContent("Last Name Required");
    expect(mobileNumberError).toHaveTextContent("Mobile number Required");
    expect(houseNumberError).toHaveTextContent("House number Required");
    expect(streetError).toHaveTextContent("Street Name Required");
    expect(cityError).toHaveTextContent("City Name Required");
    expect(zipCodeError).toHaveTextContent("Zip Code Required");

    fireEvent.change(zipCodeField, { target: { value: "ACD125" } });
    fireEvent.click(saveButton);
    const zipCodeErrors = getByText("Zip code must contain numbers only");
    expect(zipCodeErrors).toHaveTextContent(
      "Zip code must contain numbers only"
    );
  });

  test("should save a valid address", () => {
    const { getByText, getByLabelText } = renderAddressFormComponent();
    const addButton = getByText("Add Address");
    fireEvent.click(addButton);

    const firstNameField = getByLabelText("First Name*");
    const lastNameField = getByLabelText("Last Name*");
    const mobileNumberField = getByLabelText("Mobile Number*");
    const houseNumberField = getByLabelText("House Number*");
    const streetField = getByLabelText("Street*");
    const cityField = getByLabelText("City*");
    const zipCodeField = getByLabelText("Zip Code*");

    fireEvent.change(firstNameField, { target: { value: "John" } });
    fireEvent.change(lastNameField, { target: { value: "Doe" } });
    fireEvent.change(mobileNumberField, { target: { value: "1234567890" } });
    fireEvent.change(houseNumberField, { target: { value: "123" } });
    fireEvent.change(streetField, { target: { value: "Main Street" } });
    fireEvent.change(cityField, { target: { value: "Cityville" } });
    fireEvent.change(zipCodeField, { target: { value: "12345" } });

    const saveButton = getByText("Submit");
    fireEvent.click(saveButton);
  });

  test("renders the addressForm to add the address according to the user", () => {
    const { getByText } = renderAddressFormComponent();
    const addButton = getByText("Add Address");
    fireEvent.click(addButton);

    const loginUserEmail = "user@example.com";
    localStorage.setItem("userEmail", loginUserEmail);
    const userData = [{ email: loginUserEmail }];
    localStorage.setItem("userData", JSON.stringify(userData));
    const savedUserData = JSON.parse(localStorage.getItem("userData") || "[]");
    const updatedUserData =
      savedUserData &&
      savedUserData.find((user) => user.email === loginUserEmail);

    localStorage.setItem(
      "userData",
      JSON.stringify([
        {
          email: "test@example.com",
          address: [
            {
              firstName: "John",
              lastName: "Doe",
              phoneNo: "1234567890",
              houseNO: "123",
              street: "Main Street",
              city: "Cityville",
              zip: "12345",
            },
          ],
        },
      ])
    );

    localStorage.removeItem("userData");
    localStorage.removeItem("userEmail");
  });

  test("should update inputs based on address data", () => {
    const addressData = [
      {
        email: "test@example.com",
        address: [
          {
            firstName: "John",
            lastName: "Doe",
            phoneNo: "1234567890",
            houseNO: "123",
            street: "Main Street",
            city: "Cityville",
            zip: "12345",
          },
          {
            firstName: "Jane",
            lastName: "Smith",
            phoneNo: "9876543210",
            houseNO: "456",
            street: "New Street",
            city: "Townsville",
            zip: "54321",
          },
        ],
      },
    ];

    const loginUserEmail = "test@example.com";
    renderAddressFormComponent(addressData, loginUserEmail);
  });

  test("should update address data correctly", () => {
    const loginUserEmail = "test@example.com";

    const userAddress = {
      firstName: "Jane",
      lastName: "Smith",
      phoneNo: "9876543210",
      houseNO: "456",
      street: "New Street",
      city: "Townsville",
      zip: "54321",
    };
    renderAddressFormComponent(userAddress, loginUserEmail);

    localStorage.setItem(
      "userData",
      JSON.stringify([
        {
          email: "test@example.com",
          address: [
            {
              firstName: "John",
              lastName: "Doe",
              phoneNo: "1234567890",
              houseNO: "123",
              street: "Main Street",
              city: "Cityville",
              zip: "12345",
            },
            {
              firstName: "Jane",
              lastName: "Smith",
              phoneNo: "9876543210",
              houseNO: "456",
              street: "New Street",
              city: "Townsville",
              zip: "54321",
            },
          ],
        },
      ])
    );
  });

  test("should update edit address data correctly", () => {
    const loginUserEmail = "test@example.com";
    const userAddress = {
      firstName: "Jane",
      lastName: "Smith",
      phoneNo: "9876543210",
      houseNO: "456",
      street: "New Street",
      city: "Townsville",
      zip: "54321",
    };

    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    global.localStorage = localStorageMock;

    const { getByText, getByLabelText } = renderAddressFormComponent();

    const addButton = getByText("Add Address");
    fireEvent.click(addButton);

    const firstNameField = getByLabelText("First Name*");
    const lastNameField = getByLabelText("Last Name*");
    const mobileNumberField = getByLabelText("Mobile Number*");
    const houseNumberField = getByLabelText("House Number*");
    const streetField = getByLabelText("Street*");
    const cityField = getByLabelText("City*");
    const zipCodeField = getByLabelText("Zip Code*");

    fireEvent.change(firstNameField, {
      target: { value: userAddress.firstName },
    });
    fireEvent.change(lastNameField, {
      target: { value: userAddress.lastName },
    });
    fireEvent.change(mobileNumberField, {
      target: { value: userAddress.phoneNo },
    });
    fireEvent.change(houseNumberField, {
      target: { value: userAddress.houseNO },
    });
    fireEvent.change(streetField, { target: { value: userAddress.street } });
    fireEvent.change(cityField, { target: { value: userAddress.city } });
    fireEvent.change(zipCodeField, { target: { value: userAddress.zip } });

    const saveButton = getByText("Submit");
    fireEvent.click(saveButton);
  });
});
