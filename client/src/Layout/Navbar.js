import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import NewBugModal from "../components/NewBugModal";
import NewProjectModal from "../components/NewProjectModal";
import Sidebar from "../Layout/Sidebar";

import {
  useProjectsState,
  useProjectsDispatch,
  clearProjects,
} from "../Context/projects/ProjectsContext";
import {
  useAuthState,
  useAuthDispatch,
  logout,
} from "../Context/auth/AuthContext";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isNewBugOpen, setIsNewBugOpen] = React.useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = React.useState(false);

  const { currentProject } = useProjectsState();
  const projectsDispatch = useProjectsDispatch();

  const { isAuthenticated } = useAuthState();
  const authDispatch = useAuthDispatch();

  const history = useHistory();

  const guestLinks = (
    <React.Fragment>
      <NavLink
        className="flex items-center justify-center h-full px-4 focus:outline-none"
        to="/create"
        activeClassName="bg-oxford-blue-500"
      >
        Create User
      </NavLink>
      <NavLink
        className="flex items-center justify-center h-full px-4 focus:outline-none"
        to="/login"
        activeClassName="bg-oxford-blue-500"
      >
        Login
      </NavLink>
      <NavLink
        className="flex items-center justify-center h-full px-4 focus:outline-none"
        to="/info"
        activeClassName="bg-oxford-blue-500"
      >
        Info
      </NavLink>
    </React.Fragment>
  );

  const userLinks = (
    <React.Fragment>
      {currentProject ? (
        <button
          className="flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none"
          onClick={() => setIsNewBugOpen(true)}
        >
          New Bug
        </button>
      ) : (
        <button
          className="flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none"
          onClick={() => setIsNewProjectOpen(true)}
        >
          New Project
        </button>
      )}
      {currentProject && (
        <Link className="flex items-center justify-center h-full px-4" to="/">
          Your Projects
        </Link>
      )}
      <button
        className="flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none"
        onClick={() => {
          logout(authDispatch).then((data) => {
            if (data) {
              clearProjects(projectsDispatch);
              history.push("/info");
            }
          });
        }}
      >
        Logout
      </button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div className="fixed w-full bg-oxford-blue-700 h-16 z-10">
        <div className="flex flex-row items-center justify-between w-11/12 mx-auto h-full text-white">
          <a
            href="/"
            className="flex items-center justify-center h-full px-4 text-3xl font-head font-normal"
          >
            BugTracker
          </a>
          <div className="hidden lg:flex flex-row items-center justify-center h-full">
            {isAuthenticated ? userLinks : guestLinks}
          </div>
          <button
            data-testid="button_hamburger"
            className="flex lg:hidden flex-row items-center justify-center h-full w-16 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="material-icons">menu</i>
          </button>
        </div>
      </div>
      <div className="w-screen h-16 max-w-full" />

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsNewBugOpen={setIsNewBugOpen}
        setIsNewProjectOpen={setIsNewProjectOpen}
      />

      <NewBugModal
        isNewBugOpen={isNewBugOpen}
        setIsNewBugOpen={setIsNewBugOpen}
      />

      <NewProjectModal
        isNewProjectOpen={isNewProjectOpen}
        setIsNewProjectOpen={setIsNewProjectOpen}
      />
    </React.Fragment>
  );
};

export default Navbar;
