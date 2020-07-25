import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Info from "../Pages/Info";
import {
  AuthProvider,
  useAuthDispatch,
  login,
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

const setup = (isAuth = true) => {
  const utils = render(
    <AuthProvider isAuthenticated={isAuth}>
      <Info />
    </AuthProvider>
  );

  const buttonDemoLogin = utils.getByTestId("button_demo_login");

  return {
    ...utils,
    buttonDemoLogin,
  };
};

test("does not push if not logged in", () => {
  setup(false);

  expect(mockPush).not.toHaveBeenCalled();
});

test("pushes to / if logged in", () => {
  setup();

  expect(mockPush).toHaveBeenCalledWith("/");
});

test("Demo login button logs in using demo account", () => {
  const { buttonDemoLogin } = setup();

  const authDispatch = useAuthDispatch();
  const demo = {
    email: "Demo@gmail.com",
    password: "123456",
  };

  fireEvent.click(buttonDemoLogin, { button: 0 });

  expect(login).toHaveBeenCalledWith(authDispatch, demo);
});
