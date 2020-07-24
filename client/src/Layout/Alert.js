import React, { useEffect, useContext, Fragment } from "react";
import Slide from "@material-ui/core/Slide";

import {
  useBugsState,
  useBugsDispatch,
  clearBugsErrors,
} from "../Context/bugs/BugsContext";
import ProjectsContext from "../Context/projects/projectsContext";
import {
  useAuthState,
  useAuthDispatch,
  clearAuthErrors,
} from "../Context/auth/AuthContext";

const Alert = () => {
  const projectsContext = useContext(ProjectsContext);

  const { error: bugsError } = useBugsState();
  const { error: projectsError, clearProjectsErrors } = projectsContext;
  const { error: authError } = useAuthState();

  const bugsDispatch = useBugsDispatch();
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    if (bugsError) setTimeout(() => clearBugsErrors(bugsDispatch), 5000);

    // eslint-disable-next-line
  }, [bugsError]);

  useEffect(() => {
    if (projectsError) setTimeout(() => clearProjectsErrors(), 5000);

    // eslint-disable-next-line
  }, [projectsError]);

  useEffect(() => {
    if (authError === "You are not logged in") clearAuthErrors(authDispatch);
    if (authError) setTimeout(() => clearAuthErrors(authDispatch), 5000);

    // eslint-disable-next-line
  }, [authError]);

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Alert;
