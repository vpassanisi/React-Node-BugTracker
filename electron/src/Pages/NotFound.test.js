import React from "react";
import { render } from "@testing-library/react";
import NotFound from "../Pages/NotFound";

const setup = () => {
  const utils = render(<NotFound />);

  return {
    ...utils,
  };
};

test("Renders something", () => {
  const { getByText } = setup();

  expect(getByText("Not Found")).toBeInTheDocument();
});
