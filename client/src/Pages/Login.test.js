import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Login from "./Login";
import AuthContext from "../Context/auth/authContext";

const setup = () => {
  const mockLogin = jest.fn();

  const utils = render(
    <AuthContext.Provider
      value={{
        login: mockLogin,
      }}
    >
      <Login />
    </AuthContext.Provider>
  );

  const loginButton = utils.getByTestId("button_login");
  const emailInput = utils.getByTestId("input_email");
  const passwordInput = utils.getByTestId("input_password");

  return {
    ...utils,
    mockLogin,
    loginButton,
    emailInput,
    passwordInput,
  };
};

test("Email input should exist and change on input", () => {
  const { emailInput } = setup();

  expect(emailInput).toBeInTheDocument();

  fireEvent.change(emailInput, {
    target: { value: "vinny@gmail.com" },
  });

  expect(emailInput.value).toBe("vinny@gmail.com");
});

test("Password input should exist and change on input", () => {
  const { passwordInput } = setup();

  expect(passwordInput).toBeInTheDocument();

  fireEvent.change(passwordInput, {
    target: { value: "123456" },
  });

  expect(passwordInput.value).toBe("123456");
});

test("It should render a button and login when clicked", () => {
  const { loginButton, emailInput, passwordInput, mockLogin } = setup();

  fireEvent.change(emailInput, {
    target: { value: "vinny@gmail.com" },
  });

  fireEvent.change(passwordInput, {
    target: { value: "123456" },
  });

  fireEvent.click(loginButton, { button: 0 });

  expect(mockLogin).toHaveBeenCalled();
  expect(mockLogin.mock.calls[0][0].email).toBe("vinny@gmail.com");
  expect(mockLogin.mock.calls[0][0].password).toBe("123456");
});
