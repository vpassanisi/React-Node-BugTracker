import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import Login from "./Login";
import AuthState from "../Context/auth/authState";
import Loader from "../Layout/Loader";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const setup = () => {
  const utils = render(
    <AuthState>
      <Loader />
      <Login />
    </AuthState>
  );
  const emailInput = utils.getByTestId("input_email");
  const passwordInput = utils.getByTestId("input_password");
  const loginButton = utils.getByTestId("login_button");
  return {
    emailInput,
    passwordInput,
    loginButton,
    ...utils,
  };
};

test("It should change on email input", () => {
  const { emailInput } = setup();
  fireEvent.change(emailInput, {
    target: { value: "vinny@gmail.com" },
  });
  expect(emailInput.value).toBe("vinny@gmail.com");
});

test("It should change on password input", () => {
  const { passwordInput } = setup();
  fireEvent.change(passwordInput, {
    target: { value: "123456" },
  });
  expect(passwordInput.value).toBe("123456");
});

// test("It should render a button and login when clicked", () => {
//   act(() => {
//     const { loginButton } = setup();
//     expect(loginButton).toBeInTheDocument();

//     fireEvent.click(loginButton, { button: 0 });
//   });
// });
