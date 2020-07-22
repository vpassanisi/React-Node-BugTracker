import React from "react";
import { render } from "@testing-library/react";
import Loader from "../Layout/Loader";
import { LinearProgress } from "@material-ui/core";

jest.mock("@material-ui/core/LinearProgress", () => jest.fn(() => null));

const setup = () => {
  const utils = render(<Loader />);

  return {
    ...utils,
  };
};

test("render a loader", () => {
  setup();

  expect(LinearProgress).toHaveBeenCalled();
});
