import React from "react";
import ProjectCard from "../components/ProjectCard";
import { useHistory } from "react-router-dom";

import {
  useAuthState,
  useAuthDispatch,
  getMe,
} from "../Context/auth/authContext";
import { clearBugs, useBugsDispatch } from "../Context/bugs/bugsContext";
import {
  useProjectsState,
  useProjectsDispatch,
  getProjects,
  clearCurrentProject,
} from "../Context/projects/projectsContext";

const Home = () => {
  const history = useHistory();

  const { isAuthenticated, isLoading } = useAuthState();
  const authDispatch = useAuthDispatch();

  const { projects } = useProjectsState();
  const projectsDispatch = useProjectsDispatch();

  const bugsDispatch = useBugsDispatch();

  const cards = projects.map((project, index) => (
    <ProjectCard project={project} index={index} key={index} />
  ));

  React.useEffect(() => {
    if (!isAuthenticated) {
      getMe(authDispatch).then((data) => {
        if (!data) {
          history.push("/login");
        } else {
          getProjects(projectsDispatch);
        }
      });
    } else {
      getProjects(projectsDispatch);
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    clearCurrentProject(projectsDispatch);
    clearBugs(bugsDispatch);
  }, [projectsDispatch, bugsDispatch]);

  return isAuthenticated && !isLoading ? (
    <section>
      <div className="font-head text-3xl text-center my-8">Your Projects</div>
      <div className="max-w-screen-lg w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards}
      </div>
    </section>
  ) : null;
};

export default Home;
