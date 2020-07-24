import React from "react";
import Slide from "@material-ui/core/Slide";

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
      <Slide
        in={bugsError !== null}
        direction="up"
        className="fixed bottom-0 w-screen max-w-full bg-red-800 text-white text-2xl z-10 flex items-center justify-center px-4 py-2"
      >
        <div>{bugsError}</div>
      </Slide>

      <Slide
        in={projectsError !== null}
        direction="up"
        className="fixed bottom-0 w-screen max-w-full bg-red-800 text-white text-2xl z-10 flex items-center justify-center px-4 py-2"
      >
        <div>{projectsError}</div>
      </Slide>

      <Slide
        in={authError !== null}
        direction="up"
        className="fixed bottom-0 w-screen max-w-full bg-red-800 text-white text-2xl z-10 flex items-center justify-center px-4 py-2"
      >
        <div>{authError}</div>
      </Slide>
    </React.Fragment>
  );
};

export default Alert;
