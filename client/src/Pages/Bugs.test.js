import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Bugs from "../Pages/Bugs";
import Bug from "../components/Bug";
import ProjectsContext from "../Context/projects/projectsContext";
import AuthContext from "../Context/auth/authContext";
import BugsContext from "../Context/bugs/bugsContext";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock("react-responsive", () => ({
  useMediaQuery: () => true,
}));

jest.mock("../components/Bug", () => jest.fn(() => null));

const setup = (isAuth = true, currentProject = {}) => {
  const mockGetBugs = jest.fn();
  const mockSortBugs = jest.fn();

  const utils = render(
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuth,
        isLoading: false,
      }}
    >
      <ProjectsContext.Provider
        value={{
          currentProject: currentProject,
        }}
      >
        <BugsContext.Provider
          value={{
            getBugs: mockGetBugs,
            sortBugs: mockSortBugs,
            bugs: [{}, {}, {}],
          }}
        >
          <Bugs />
        </BugsContext.Provider>
      </ProjectsContext.Provider>
    </AuthContext.Provider>
  );

  const buttonName = utils.getByTestId("button_name");
  const buttonFixer = utils.getByTestId("button_fixer");
  const buttonReporter = utils.getByTestId("button_reporter");
  const buttonStatus = utils.getByTestId("button_status");
  const buttonSeverity = utils.getByTestId("button_severity");
  const buttonReproduceable = utils.getByTestId("button_reproduceability");

  return {
    ...utils,
    mockGetBugs,
    mockSortBugs,
    buttonName,
    buttonFixer,
    buttonReporter,
    buttonStatus,
    buttonSeverity,
    buttonReproduceable,
  };
};

test("pushes to /info in not authenticated", () => {
  setup(false);

  expect(mockHistoryPush).toHaveBeenCalledWith("/info");
});

test("pushes to / if no project is set", () => {
  setup(true, null);

  expect(mockHistoryPush).toHaveBeenCalledWith("/");
});

test("calls getBugs if authenticated and has a project", () => {
  const { mockGetBugs } = setup(true);

  expect(mockGetBugs).toHaveBeenCalled();
});

test("sorts bugs by name", () => {
  const { mockSortBugs, buttonName } = setup(true);

  fireEvent.click(buttonName, { button: 0 });

  expect(mockSortBugs).toHaveBeenCalledWith("name");
});

test("sorts bugs by fixer", () => {
  const { mockSortBugs, buttonFixer } = setup(true);

  fireEvent.click(buttonFixer, { button: 0 });

  expect(mockSortBugs).toHaveBeenCalledWith("fixer");
});

test("sorts bugs by reporter", () => {
  const { mockSortBugs, buttonReporter } = setup(true);

  fireEvent.click(buttonReporter, { button: 0 });

  expect(mockSortBugs).toHaveBeenCalledWith("reporter");
});

test("sorts bugs by status", () => {
  const { mockSortBugs, buttonStatus } = setup(true);

  fireEvent.click(buttonStatus, { button: 0 });

  expect(mockSortBugs).toHaveBeenCalledWith("status");
});

test("sorts bugs by severity", () => {
  const { mockSortBugs, buttonSeverity } = setup(true);

  fireEvent.click(buttonSeverity, { button: 0 });

  expect(mockSortBugs).toHaveBeenCalledWith("severity");
});

test("sorts bugs by reproduceability", () => {
  const { mockSortBugs, buttonReproduceable } = setup(true);

  fireEvent.click(buttonReproduceable, { button: 0 });

  expect(mockSortBugs).toHaveBeenCalledWith("reproduceability");
});

test("renders bug components", () => {
  setup(true);

  expect(Bug).toHaveBeenCalled();
});
