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
        <section>
          <div className="font-head text-3xl text-center my-8">
            Your Projects
          </div>
          <div className="max-w-screen-lg w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards}
          </div>
        </section>
      }
    </React.Fragment>
  );
};

export default Home;
