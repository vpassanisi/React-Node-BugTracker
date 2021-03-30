import React from "react";
import { NavLink, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import {
  useProjectsState,
  clearProjects,
  useProjectsDispatch,
} from "../Context/projects/projectsContext";
import {
  useAuthState,
  useAuthDispatch,
  logout,
} from "../Context/auth/authContext";

const Sidebar = (props) => {
  const { currentProject } = useProjectsState();
  const projectsDispatch = useProjectsDispatch();

  const { isAuthenticated } = useAuthState();
  const authDispatch = useAuthDispatch();

  const { isOpen, setIsOpen, setIsNewBugOpen, setIsNewProjectOpen } = props;

  const guestLinks = (
    <React.Fragment>
      <NavLink
        className="py-2 w-full text-center cursor-pointer focus:outline-none"
        onClick={() => setIsOpen(false)}
        to="/create"
        activeClassName="bg-oxford-blue-500"
      >
        Create User
      </NavLink>
      <NavLink
        className="py-2 w-full text-center cursor-pointer focus:outline-none"
        onClick={() => setIsOpen(false)}
        to="/login"
        activeClassName="bg-oxford-blue-500"
      >
        Login
      </NavLink>
      <NavLink
        className="py-2 w-full text-center cursor-pointer focus:outline-none"
        onClick={() => setIsOpen(false)}
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
          className="py-2 w-full text-center cursor-pointer focus:outline-none"
          onClick={() => {
            setIsOpen(false);
            setIsNewBugOpen(true);
          }}
        >
          New Bug
        </button>
      ) : (
        <button
          className="py-2 w-full text-center cursor-pointer focus:outline-none"
          onClick={() => {
            setIsOpen(false);
            setIsNewProjectOpen(true);
          }}
        >
          New Project
        </button>
      )}
      {currentProject && (
        <Link
          className="py-2 w-full text-center cursor-pointer focus:outline-none"
          onClick={() => setIsOpen(false)}
          to="/"
        >
          Your Projects
        </Link>
      )}
      <button
        className="py-2 w-full text-center cursor-pointer focus:outline-none"
        onClick={async () => {
          await logout(authDispatch);
          clearProjects(projectsDispatch);
          setIsOpen(false);
        }}
      >
        Logout
      </button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <CSSTransition in={isOpen} timeout={150} classNames="modal" unmountOnExit>
        <div
          className="fixed inset-0 h-full w-full bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      </CSSTransition>
      <CSSTransition
        in={isOpen}
        timeout={150}
        classNames="sidebar"
        unmountOnExit
      >
        <div className="fixed top-0 left-0 bg-oxford-blue-700 flex flex-col items-center w-64 h-full pt-8 z-30">
          <h1 className="font-head text-2xl text-center w-full my-4 border-b border-purple-munsell py-2">
            BugTracker
          </h1>
          {isAuthenticated ? userLinks : guestLinks}
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default Sidebar;
