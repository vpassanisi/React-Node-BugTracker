import React from "react";
import { render } from "@testing-library/react";
import {
  DarkModeProvider,
  DarkModeStateContext,
} from "../Context/darkMode/DarkModeContext";

global.matchMedia = jest.fn(() => ({
  matches: true,
}));

const setup = () => {
  const utils = render(
    <DarkModeProvider>
      <DarkModeStateContext.Consumer>
        {(value) => console.log(value)}
      </DarkModeStateContext.Consumer>
    </DarkModeProvider>
  );
};

test("test", () => {
  setup();
});
