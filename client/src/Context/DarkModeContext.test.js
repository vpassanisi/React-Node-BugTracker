import React from "react";
import { render } from "@testing-library/react";
import {
  DarkModeProvider,
  DarkModeStateContext,
  useDarkModeState,
  useDarkModeDispatch,
  darkModeOn,
  darkModeOff,
} from "./darkMode/DarkModeContext";

global.matchMedia = jest.fn(() => ({
  matches: true,
}));

global.document.documentElement.classList.add = jest.fn();
global.document.documentElement.classList.remove = jest.fn();

const setup = ({
  TestComp = () => null,
  TestError = () => null,
  isDarkMode = true,
  error = null,
}) => {
  const utils = render(
    <div>
      <TestError />
      <DarkModeProvider isDarkMode={isDarkMode} error={error}>
        <TestComp />
        <DarkModeStateContext.Consumer>
          {(value) => {
            return (
              <div>
                <div>isDarkMode: {`${value.isDarkMode}`}</div>
                <div>error: {`${value.error}`}</div>
              </div>
            );
          }}
        </DarkModeStateContext.Consumer>
      </DarkModeProvider>
    </div>
  );
  return {
    ...utils,
  };
};

describe("darkModeOff", () => {
  test("removes mode-dark from html element", () => {
    const TestComp = () => {
      const dispatch = useDarkModeDispatch();
      React.useEffect(() => {
        darkModeOff(dispatch);
      }, []);
      return null;
    };
    setup({ TestComp });
    expect(
      global.document.documentElement.classList.remove
    ).toHaveBeenCalledWith("mode-dark");
  });
});

describe("darkModeOn", () => {
  test("adds mode-dark to html element", () => {
    const TestComp = () => {
      const dispatch = useDarkModeDispatch();
      React.useEffect(() => {
        darkModeOn(dispatch);
      }, []);
      return null;
    };
    setup({ TestComp });
    expect(global.document.documentElement.classList.add).toHaveBeenCalledWith(
      "mode-dark"
    );
  });
});

describe("useDarkModeState", () => {
  test("throws error when called outside of a Provider", () => {
    const TestError = () => {
      expect(useDarkModeState).toThrow(
        Error("useDarkModeState must be used within a DarkModeProvider")
      );
      return null;
    };
    setup({ TestError: TestError });
  });
});

describe("useDarkModeDispatch", () => {
  test("throws error when called outside of a Provider", () => {
    const TestError = () => {
      expect(useDarkModeDispatch).toThrow(
        Error("useDarkModeDispatch must be used within a DarkModeProvider")
      );
      return null;
    };
    setup({ TestError: TestError });
  });
});

describe("Reducer", () => {
  test("updates state on default action", async () => {
    const TestComp = () => {
      const dispatch = useDarkModeDispatch();
      React.useEffect(() => {
        dispatch({ type: "default" });
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(
      await findByText("error: Unhandled action type: default")
    ).toBeInTheDocument();
  });
});
