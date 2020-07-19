import React, { useEffect, useContext, Fragment } from "react";
import ProjectCard from "../components/ProjectCard";
import { useHistory } from "react-router-dom";

import AuthContext from "../Context/auth/authContext";
import ProjectsContext from "../Context/projects/projectsContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const projectsContext = useContext(ProjectsContext);

  const { isAuthenticated, isLoading } = authContext;
  const { getProjects, projects, clearCurrentProject } = projectsContext;
  const history = useHistory();

  const cards = projects.map((project, index) => (
    <ProjectCard project={project} index={index} key={index} />
  ));

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      history.push("/info");
    }

    if (isAuthenticated && !isLoading) {
      getProjects();
    }

    // eslint-disable-next-line
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    clearCurrentProject();

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {!isLoading && (
        <div className="w-screen max-w-full">
          <br />
          <div className="text-3xl text-center font-hairline">
            Your Projects
          </div>
          <div className="px-4 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cards}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
