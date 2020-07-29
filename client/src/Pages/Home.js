import React from "react";
import ProjectCard from "../components/ProjectCard";
import { useHistory } from "react-router-dom";

import { useAuthState } from "../Context/auth/AuthContext";
import {
  useProjectsState,
  useProjectsDispatch,
  getProjects,
  clearCurrentProject,
} from "../Context/projects/ProjectsContext";

const Home = () => {
  const history = useHistory();

  const { isAuthenticated } = useAuthState();

  const { projects } = useProjectsState();
  const projectsDispatch = useProjectsDispatch();

  const cards = projects.map((project, index) => (
    <ProjectCard project={project} index={index} key={index} />
  ));

  React.useEffect(() => {
    if (isAuthenticated) {
      getProjects(projectsDispatch);
    } else {
      history.push("/info");
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  React.useEffect(() => {
    clearCurrentProject(projectsDispatch);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {
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
      }
    </React.Fragment>
  );
};

export default Home;
