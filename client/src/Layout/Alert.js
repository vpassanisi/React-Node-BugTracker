import React from "react";

import {
  useBugsState,
  useBugsDispatch,
  clearBugsErrors,
} from "../Context/bugs/BugsContext";
import {
  useProjectsState,
  useProjectsDispatch,
  clearProjectsErrors,
} from "../Context/projects/ProjectsContext";
import {
  useAuthState,
  useAuthDispatch,
  clearAuthErrors,
} from "../Context/auth/AuthContext";

const Alert = () => {
  const { error: bugsError } = useBugsState();
  const { error: projectsError } = useProjectsState();
  const { error: authError } = useAuthState();

  const bugsDispatch = useBugsDispatch();
  const projectsDispatch = useProjectsDispatch();
  const authDispatch = useAuthDispatch();

  React.useEffect(() => {
    if (bugsError) setTimeout(() => clearBugsErrors(bugsDispatch), 5000);

    // eslint-disable-next-line
  }, [bugsError]);

  React.useEffect(() => {
    if (projectsError)
      setTimeout(() => clearProjectsErrors(projectsDispatch), 5000);

    // eslint-disable-next-line
  }, [projectsError]);

  React.useEffect(() => {
    if (authError === "You are not logged in") clearAuthErrors(authDispatch);
    if (authError) setTimeout(() => clearAuthErrors(authDispatch), 5000);

    // eslint-disable-next-line
  }, [authError]);

  return (
    <React.Fragment>
      <div>{bugsError}</div>

      <div>{projectsError}</div>

      <div>{authError}</div>
    </React.Fragment>
  );
};

export default Alert;
