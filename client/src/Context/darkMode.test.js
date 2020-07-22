import React from "react";
import { render } from "@testing-library/react";
import DarkModeState from "../Context/darkMode/darkModeState";
import DarkModeContext from "../Context/darkMode/darkModeContext";

global.matchMedia = jest.fn(() => true);

const setup = () => {
  const utils = render(
    <DarkModeState>
      <DarkModeContext.Consumer>
        {(value) => console.log(value)}
      </DarkModeContext.Consumer>
    </DarkModeState>
  );
};

test("test", () => {
  setup();
});
