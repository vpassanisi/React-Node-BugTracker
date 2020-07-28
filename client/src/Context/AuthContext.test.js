import React from "react";
import { render } from "@testing-library/react";
import {
  AuthProvider,
  AuthStateContext,
  login,
  useAuthDispatch,
} from "../Context/auth/AuthContext";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        success: true,
        data: {
          user: "test user",
        },
      }),
  })
);

const Test = () => {
  const dispatch = useAuthDispatch();
  login(dispatch, { email: "vinny@gmail.com", password: "123456" });
  return <div />;
};

test("test", async () => {
  const utils = render(
    <AuthProvider>
      <Test />
      <AuthStateContext.Consumer>
        {(value) => {
          return <div>isAuthenticated: {`${value.isAuthenticated}`}</div>;
        }}
      </AuthStateContext.Consumer>
    </AuthProvider>
  );

  expect(await utils.findByText("isAuthenticated: true")).toBeInTheDocument();
});
