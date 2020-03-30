import React, { useEffect, useContext, Fragment } from "react";
import ProjectCard from "../components/ProjectCard";
import { useHistory } from "react-router-dom";

import AuthContext from "../Context/auth/authContext";
import ProjectsContext from "../Context/projects/projectsContext";

const Home = props => {
  const authContext = useContext(AuthContext);
  const projectsContext = useContext(ProjectsContext);

  const { isAuthenticated, isLoading } = authContext;
  const { getProjects, projects } = projectsContext;
  const history = useHistory();

  const cards = projects.map((project, index) => (
    <ProjectCard project={project} index={index} key={index} />
  ));

  useEffect(() => {
    getProjects();

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      history.push("/login");
    }

    // eslint-disable-next-line
  }, [isAuthenticated, isLoading]);

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
