import React, { useEffect, useContext, Fragment } from "react";
import Slide from "@material-ui/core/Slide";

import BugsContext from "../Context/bugs/bugsContext";
import ProjectsContext from "../Context/projects/projectsContext";
import AuthContext from "../Context/auth/authContext";

const Alert = () => {
  const bugsContext = useContext(BugsContext);
  const projectsContext = useContext(ProjectsContext);
  const authContext = useContext(AuthContext);

  const { error: bugsError, clearBugsErrors } = bugsContext;
  const { error: projectsError, clearProjectsErrors } = projectsContext;
  const { error: authError, clearAuthErrors } = authContext;

  useEffect(() => {
    if (bugsError) setTimeout(() => clearBugsErrors(), 5000);

    // eslint-disable-next-line
  }, [bugsError]);

  useEffect(() => {
    if (projectsError) setTimeout(() => clearProjectsErrors(), 5000);

    // eslint-disable-next-line
  }, [projectsError]);

  useEffect(() => {
    if (authError === "You are not logged in") clearAuthErrors();
    if (authError) setTimeout(() => clearAuthErrors(), 5000);

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
