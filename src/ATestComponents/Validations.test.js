import {
  isValidUserName,
  isValidPassword,
  isValidEmail,
  isValidPhoneNumber,
  isValidZipCode,
} from "../Components/Validations";

describe("isValidUserName", () => {
  it("should return true for valid usernames", () => {
    expect(isValidUserName("john_doe")).toBe(true);
    expect(isValidUserName("john.doe")).toBe(true);
    expect(isValidUserName("john_doe_123")).toBe(true);
  });

  it("should return false for invalid usernames", () => {
    expect(isValidUserName("")).toBe(false);
    expect(isValidUserName("john__doe")).toBe(false);
    expect(isValidUserName("john.doe.")).toBe(false);
  });
});

describe("isValidPassword", () => {
  it("should return true for valid passwords", () => {
    expect(isValidPassword("Abc123")).toBe(true);
    expect(isValidPassword("passw0rd")).toBe(true);
    expect(isValidPassword("Secret123")).toBe(true);
  });

  it("should return false for invalid passwords", () => {
    expect(isValidPassword("")).toBe(false);
    expect(isValidPassword("password")).toBe(false);
    expect(isValidPassword("ABC")).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("should return true for valid email addresses", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("john.doe@gmail.com")).toBe(true);
  });

  it("should return false for invalid email addresses", () => {
    expect(isValidEmail("testexample.com")).toBe(false);
    expect(isValidEmail("john.doe@gmail")).toBe(false);
  });
});

describe("isValidPhoneNumber", () => {
  it("should return true for valid phone numbers", () => {
    expect(isValidPhoneNumber("1234567890")).toBe(true);
    expect(isValidPhoneNumber("9876543210")).toBe(true);
  });

  it("should return false for invalid phone numbers", () => {
    expect(isValidPhoneNumber("123")).toBe(false);
    expect(isValidPhoneNumber("987654321")).toBe(false);
    expect(isValidPhoneNumber("abcdefghij")).toBe(false);
  });
});

describe("isValidZipCode", () => {
  it("should return true for valid zip codes", () => {
    expect(isValidZipCode("12345")).toBe(true);
    expect(isValidZipCode("98765")).toBe(true);
  });
});
