import React from "react";
import { fireEvent, render } from "@testing-library/react";
import DarkModeToggle from "../Layout/DarkModeToggle";
import {
  DarkModeProvider,
  darkModeOn,
  darkModeOff,
} from "../Context/darkMode/DarkModeContext";

jest.mock("../Context/darkMode/DarkModeContext.js", () => ({
  ...jest.requireActual("../Context/darkMode/DarkModeContext.js"),
  useDarkModeDispatch: jest.fn(),
  darkModeOff: jest.fn(),
  darkModeOn: jest.fn(),
}));

global.matchMedia = jest.fn(() => true);

const setup = (darkMode = true) => {
  const utils = render(
    <DarkModeProvider isDarkMode={darkMode}>
      <DarkModeToggle />
    </DarkModeProvider>
  );

  const buttonDarkMode = utils.getByTestId("button_dark_mode");

  return {
    ...utils,
    buttonDarkMode,
  };
};

test("turns off dark mode", () => {
  const { buttonDarkMode } = setup(true);

  fireEvent.click(buttonDarkMode, { button: 0 });

  expect(darkModeOff).toHaveBeenCalled();
});

test("turns on dark mode", () => {
  const { buttonDarkMode } = setup(false);

  fireEvent.click(buttonDarkMode, { button: 0 });

  expect(darkModeOn).toHaveBeenCalled();
});
