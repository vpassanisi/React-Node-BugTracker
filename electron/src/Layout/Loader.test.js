import React from "react";
import { render } from "@testing-library/react";
import Loader from "../Layout/Loader";
import { LinearProgress } from "@material-ui/core";
import { AuthProvider } from "../Context/auth/AuthContext";
import { ProjectsProvider } from "../Context/projects/ProjectsContext";
import { BugsProvider } from "../Context/bugs/BugsContext";

jest.mock("@material-ui/core/LinearProgress", () => jest.fn(() => null));

const setup = (
  isAuthLoading = false,
  isProjectsLoading = false,
  isBugsLoading = false
) => {
  const utils = render(
    <AuthProvider isLoading={isAuthLoading}>
      <ProjectsProvider isLoading={isProjectsLoading}>
        <BugsProvider isLoading={isBugsLoading}>
          <Loader />
        </BugsProvider>
      </ProjectsProvider>
    </AuthProvider>
  );

  return {
    ...utils,
  };
};

describe("Loader", () => {
  test("auth isLoading renders loader", () => {
    setup(true, false, false);
    expect(LinearProgress).toHaveBeenCalled();
  });

  test("projects isLoading renders loader", () => {
    setup(false, true, false);
    expect(LinearProgress).toHaveBeenCalled();
  });

  test("bugs isLoading renders loader", () => {
    setup(false, false, true);
    expect(LinearProgress).toHaveBeenCalled();
  });

  test("does not render loader", () => {
    const { getByTestId } = setup(false, false, false);
    expect(getByTestId("not_loading")).toBeInTheDocument();
  });
});
