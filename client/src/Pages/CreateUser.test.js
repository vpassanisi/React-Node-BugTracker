import React from "react";
import { fireEvent, render } from "@testing-library/react";
import AuthContext from "../Context/auth/authContext";
import CreateUser from "../Pages/CreateUser";

const setup = () => {
  const mockCreateUser = jest.fn();

  const utils = render(
    <AuthContext.Provider
      value={{
        createUser: mockCreateUser,
      }}
    >
      <CreateUser />
    </AuthContext.Provider>
  );

  const buttonCreateUser = utils.getByTestId("button_create_user");
  const inputName = utils.getByTestId("input_name");
  const inputEmail = utils.getByTestId("input_email");
  const inputPassword = utils.getByTestId("input_password");

  return {
    ...utils,
    mockCreateUser,
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
  const {
    buttonCreateUser,
    inputName,
    inputEmail,
    inputPassword,
    mockCreateUser,
  } = setup();

  expect(buttonCreateUser).toBeInTheDocument();

  fireEvent.change(inputName, { target: { value: "Jimmy Jam" } });
  fireEvent.change(inputEmail, { target: { value: "Jimmy@gmail.com" } });
  fireEvent.change(inputPassword, { target: { value: "123456" } });

  fireEvent.click(buttonCreateUser, { button: 0 });

  expect(mockCreateUser).toHaveBeenCalled();
  expect(mockCreateUser.mock.calls[0][0].name).toBe("Jimmy Jam");
  expect(mockCreateUser.mock.calls[0][0].email).toBe("Jimmy@gmail.com");
  expect(mockCreateUser.mock.calls[0][0].password).toBe("123456");
});
