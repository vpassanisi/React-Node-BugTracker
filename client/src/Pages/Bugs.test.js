import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Bugs from "../Pages/Bugs";
import Bug from "../components/Bug";
import { ProjectsProvider } from "../Context/projects/ProjectsContext";
import { AuthProvider } from "../Context/auth/AuthContext";
import {
  BugsProvider,
  useBugsDispatch,
  getBugs,
  sortBugs,
} from "../Context/bugs/BugsContext";

jest.mock("../Context/bugs/BugsContext.js", () => ({
  ...jest.requireActual("../Context/bugs/BugsContext.js"),
  useBugsDispatch: jest.fn(),
  getBugs: jest.fn(),
  sortBugs: jest.fn(),
}));

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
  const utils = render(
    <AuthProvider isAuthenticated={isAuth} isLoading={false}>
      <ProjectsProvider currentProject={currentProject}>
        <BugsProvider bugs={[{}, {}, {}]}>
          <Bugs />
        </BugsProvider>
      </ProjectsProvider>
    </AuthProvider>
  );

  const bugsDispatch = useBugsDispatch();

  const buttonName = utils.getByTestId("button_name");
  const buttonFixer = utils.getByTestId("button_fixer");
  const buttonReporter = utils.getByTestId("button_reporter");
  const buttonStatus = utils.getByTestId("button_status");
  const buttonSeverity = utils.getByTestId("button_severity");
  const buttonReproduceable = utils.getByTestId("button_reproduceability");

  return {
    ...utils,
    bugsDispatch,
    buttonName,
    buttonFixer,
    buttonReporter,
    buttonStatus,
    buttonSeverity,
    buttonReproduceable,
  };
};

test("calls getBugs if authenticated and has a project", () => {
  setup();

  expect(getBugs).toHaveBeenCalled();
});

test("pushes to /info in not authenticated", () => {
  setup(false);

  expect(mockHistoryPush).toHaveBeenCalledWith("/info");
});

test("pushes to / if no project is set", () => {
  setup(true, null);

  expect(mockHistoryPush).toHaveBeenCalledWith("/");
});

test("sorts bugs by name", () => {
  const { buttonName, bugsDispatch } = setup(true);

  fireEvent.click(buttonName, { button: 0 });

  expect(sortBugs).toHaveBeenCalledWith(bugsDispatch, "name");
});

test("sorts bugs by fixer", () => {
  const { buttonFixer, bugsDispatch } = setup(true);

  fireEvent.click(buttonFixer, { button: 0 });

  expect(sortBugs).toHaveBeenCalledWith(bugsDispatch, "fixer");
});

test("sorts bugs by reporter", () => {
  const { buttonReporter, bugsDispatch } = setup(true);

  fireEvent.click(buttonReporter, { button: 0 });

  expect(sortBugs).toHaveBeenCalledWith(bugsDispatch, "reporter");
});

test("sorts bugs by status", () => {
  const { buttonStatus, bugsDispatch } = setup(true);

  fireEvent.click(buttonStatus, { button: 0 });

  expect(sortBugs).toHaveBeenCalledWith(bugsDispatch, "status");
});

test("sorts bugs by severity", () => {
  const { buttonSeverity, bugsDispatch } = setup(true);

  fireEvent.click(buttonSeverity, { button: 0 });

  expect(sortBugs).toHaveBeenCalledWith(bugsDispatch, "severity");
});

test("sorts bugs by reproduceability", () => {
  const { buttonReproduceable, bugsDispatch } = setup(true);

  fireEvent.click(buttonReproduceable, { button: 0 });

  expect(sortBugs).toHaveBeenCalledWith(bugsDispatch, "reproduceability");
});

test("renders bug components", () => {
  setup(true);

  expect(Bug).toHaveBeenCalled();
});
