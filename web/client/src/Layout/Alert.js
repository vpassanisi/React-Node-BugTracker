import React from "react";

import {
  useBugsState,
  useBugsDispatch,
  clearBugsErrors,
} from "../Context/bugs/bugsContext";
import {
  useProjectsState,
  useProjectsDispatch,
  clearProjectsErrors,
} from "../Context/projects/projectsContext";
import {
  useAuthState,
  useAuthDispatch,
  clearAuthErrors,
} from "../Context/auth/authContext";

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
      <div
        className={`fixed bottom-0 w-full py-6 transition-transform duration-150 ease-in-out transform ${
          bugsError ? "translate-y-0" : "translate-y-full"
        } bg-red-600 text-center text-2xl`}
      >
        {bugsError}
      </div>

      <div
        className={`fixed bottom-0 w-full py-6 transition-transform duration-150 ease-in-out transform ${
          projectsError ? "translate-y-0" : "translate-y-full"
        } bg-red-600 text-center text-2xl`}
      >
        {projectsError}
      </div>

      <div
        className={`fixed bottom-0 w-full py-6 transition-transform duration-150 ease-in-out transform ${
          authError ? "translate-y-0" : "translate-y-full"
        } bg-red-600 text-center text-2xl`}
      >
        {authError}
      </div>
    </React.Fragment>
  );
};

export default Alert;
