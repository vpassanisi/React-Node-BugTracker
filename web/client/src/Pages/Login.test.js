import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Login from "./Login";
import {
  AuthProvider,
  login,
  useAuthDispatch,
} from "../Context/auth/AuthContext";

jest.mock("../Context/auth/AuthContext.js", () => ({
  ...jest.requireActual("../Context/auth/AuthContext.js"),
  useAuthDispatch: jest.fn(),
  login: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockPush,
  }),
}));

const setup = (isAuth = false) => {
  const utils = render(
    <AuthProvider isAuthenticated={isAuth}>
      <Login />
    </AuthProvider>
  );

  const authDispatch = useAuthDispatch();
  const loginButton = utils.getByTestId("button_login");
  const emailInput = utils.getByTestId("input_email");
  const passwordInput = utils.getByTestId("input_password");

  return {
    ...utils,
    authDispatch,
    loginButton,
    emailInput,
    passwordInput,
  };
};

test("does not push to / if not logged in", () => {
  setup(false);

  expect(mockPush).not.toHaveBeenCalled();
});

test("pushes to / if logged in", () => {
  setup(true);

  expect(mockPush).toHaveBeenCalledWith("/");
});

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
  const { loginButton, emailInput, passwordInput, authDispatch } = setup();

  const cred = {
    email: "vinny@gmail.com",
    password: "123456",
  };

  fireEvent.change(emailInput, {
    target: { value: cred.email },
  });

  fireEvent.change(passwordInput, {
    target: { value: cred.password },
  });

  fireEvent.click(loginButton, { button: 0 });

  expect(login).toHaveBeenCalledWith(authDispatch, cred);
});
