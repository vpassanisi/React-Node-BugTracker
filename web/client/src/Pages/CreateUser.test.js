import React from "react";
import { fireEvent, render } from "@testing-library/react";
import {
  AuthProvider,
  useAuthDispatch,
  createUser,
} from "../Context/auth/AuthContext";
import CreateUser from "../Pages/CreateUser";

jest.mock("../Context/auth/AuthContext.js", () => ({
  ...jest.requireActual("../Context/auth/AuthContext.js"),
  useAuthDispatch: jest.fn(),
  createUser: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockPush,
  }),
}));

const setup = (isAuth = null) => {
  const utils = render(
    <AuthProvider isAuthenticated={isAuth}>
      <CreateUser />
    </AuthProvider>
  );

  const buttonCreateUser = utils.getByTestId("button_create_user");
  const inputName = utils.getByTestId("input_name");
  const inputEmail = utils.getByTestId("input_email");
  const inputPassword = utils.getByTestId("input_password");

  return {
    ...utils,
    buttonCreateUser,
    inputName,
    inputEmail,
    inputPassword,
  };
};

test("Name input exists and changes on input", () => {
  const { inputName } = setup();

  expect(inputName).toBeInTheDocument();

  fireEvent.change(inputName, { target: { value: "Jimmy Jam" } });

  expect(inputName.value).toBe("Jimmy Jam");
});

test("Email input exists and changes on input", () => {
  const { inputEmail } = setup();

  expect(inputEmail).toBeInTheDocument();

  fireEvent.change(inputEmail, { target: { value: "Jimmy@gmail.com" } });

  expect(inputEmail.value).toBe("Jimmy@gmail.com");
});

test("Password input exists and changes on input", () => {
  const { inputPassword } = setup();

  expect(inputPassword).toBeInTheDocument();

  fireEvent.change(inputPassword, { target: { value: "123456" } });

  expect(inputPassword.value).toBe("123456");
});

test("Login button exists and logs in with the provided credencials", () => {
  const { buttonCreateUser, inputName, inputEmail, inputPassword } = setup();

  const authDispatch = useAuthDispatch();
  const newUser = {
    name: "Jimmy Jam",
    email: "Jimmy@gmail.com",
    password: "123456",
  };

  expect(buttonCreateUser).toBeInTheDocument();

  fireEvent.change(inputName, { target: { value: newUser.name } });
  fireEvent.change(inputEmail, { target: { value: newUser.email } });
  fireEvent.change(inputPassword, { target: { value: newUser.password } });

  fireEvent.click(buttonCreateUser, { button: 0 });

  expect(createUser).toHaveBeenCalledWith(authDispatch, newUser);
});

test("does not push when not logged it", () => {
  setup();

  expect(mockPush).not.toHaveBeenCalled();
});

test("pushes to / when logged in", () => {
  setup(true);

  expect(mockPush).toHaveBeenCalledWith("/");
});
