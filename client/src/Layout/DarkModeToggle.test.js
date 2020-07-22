import React from "react";
import { fireEvent, render } from "@testing-library/react";
import DarkModeToggle from "../Layout/DarkModeToggle";
import DarkModeContext from "../Context/darkMode/darkModeContext";

const setup = (darkMode = true) => {
  const mockTurnOn = jest.fn();
  const mockTurnOff = jest.fn();

  const utils = render(
    <DarkModeContext.Provider
      value={{
        isDarkMode: darkMode,
        darkModeOn: mockTurnOn,
        darkModeOff: mockTurnOff,
      }}
    >
      <DarkModeToggle />
    </DarkModeContext.Provider>
  );

  const buttonDarkMode = utils.getByTestId("button_dark_mode");

  return {
    ...utils,
    mockTurnOff,
    mockTurnOn,
    buttonDarkMode,
  };
};

test("turns off dark mode", () => {
  const { buttonDarkMode, mockTurnOff } = setup(true);

  fireEvent.click(buttonDarkMode, { button: 0 });

  expect(mockTurnOff).toHaveBeenCalled();
});

test("turns on dark mode", () => {
  const { buttonDarkMode, mockTurnOn } = setup(false);

  fireEvent.click(buttonDarkMode, { button: 0 });

  expect(mockTurnOn).toHaveBeenCalled();
});
