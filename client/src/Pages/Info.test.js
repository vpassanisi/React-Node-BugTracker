import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Info from "../Pages/Info";
import AuthContext from "../Context/auth/authContext";

const setup = () => {
  const mockDemoLogin = jest.fn();

  const utils = render(
    <AuthContext.Provider
      value={{
        login: mockDemoLogin,
      }}
    >
      <Info />
    </AuthContext.Provider>
  );

  const buttonDemoLogin = utils.getByTestId("button_demo_login");

  return {
    ...utils,
    mockDemoLogin,
    buttonDemoLogin,
  };
};

test("Demo login button logs in using demo account", () => {
  const { mockDemoLogin, buttonDemoLogin } = setup();

  fireEvent.click(buttonDemoLogin, { button: 0 });

  expect(mockDemoLogin).toHaveBeenCalled();
  expect(mockDemoLogin.mock.calls[0][0].email).toBe("Demo@gmail.com");
  expect(mockDemoLogin.mock.calls[0][0].password).toBe("123456");
});
