import React from "react";
import { render } from "@testing-library/react";
import Alert from "../Layout/Alert";
import {
  BugsProvider,
  useBugsState,
  useBugsDispatch,
  clearBugsErrors,
} from "../Context/bugs/BugsContext";
import {
  ProjectsProvider,
  useProjectsState,
  useProjectsDispatch,
  clearProjectsErrors,
} from "../Context/projects/ProjectsContext";
import {
  AuthProvider,
  useAuthState,
  useAuthDispatch,
  clearAuthErrors,
} from "../Context/auth/AuthContext";

const setup = ({
  authError = null,
  projectsError = null,
  bugsError = null,
}) => {
  const utils = render(
    <AuthProvider error={authError}>
      <ProjectsProvider error={projectsError}>
        <BugsProvider error={bugsError}>
          <Alert />
        </BugsProvider>
      </ProjectsProvider>
    </AuthProvider>
  );

  return {
    ...utils,
  };
};

describe("Alert", () => {
  test("renders auth error", async () => {
    const { findByText } = setup({ authError: "test auth error" });
    expect(await findByText("test auth error")).toBeInTheDocument();
  });

  test("renders projects error", async () => {
    const { findByText } = setup({ projectsError: "test projects error" });
    expect(await findByText("test projects error")).toBeInTheDocument();
  });

  test("renders bugs error", async () => {
    const { findByText } = setup({ bugsError: "test bugs error" });
    expect(await findByText("test bugs error")).toBeInTheDocument();
  });

  test("does not render getMe response", () => {
    const { queryByText } = setup({ authError: "You are not logged in" });
    expect(queryByText("You are not logged in")).toBeNull();
  });
});
