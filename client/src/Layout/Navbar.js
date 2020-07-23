import React, { Fragment, useState, useEffect, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import NewBugModal from "../components/NewBugModal";
import NewProjectModal from "../components/NewProjectModal";
import Sidebar from "../Layout/Sidebar";

import ProjectsContext from "../Context/projects/projectsContext";
import AuthContext from "../Context/auth/authContext";
import {
  useDarkModeState,
  useDarkModeDispatch,
  darkModeOn,
  darkModeOff,
} from "../Context/darkMode/darkModeContext";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewBugOpen, setIsNewBugOpen] = useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  const projectsContext = useContext(ProjectsContext);
  const authContext = useContext(AuthContext);

  const { currentProject } = projectsContext;
  const { logout, isAuthenticated } = authContext;
  const { isDarkMode } = useDarkModeState();
  const dispatch = useDarkModeDispatch();

  const { setIsDark } = props;

  const guestLinks = (
    <Fragment>
      <Link
        className="flex items-center justify-center h-full px-4 transition duration-300 ease-in-out hover:bg-white-alpha-20 text-black dark:text-white"
        to="/create"
      >
        Create User
      </Link>
      <Link
        className="flex items-center justify-center h-full px-4 transition duration-300 ease-in-out hover:bg-white-alpha-20 text-black dark:text-white"
        to="/login"
      >
        Login
      </Link>
      <Link
        className="flex items-center justify-center h-full px-4 transition duration-300 ease-in-out hover:bg-white-alpha-20 text-black dark:text-white"
        to="/info"
      >
        Info
      </Link>
    </Fragment>
  );

  const userLinks = (
    <Fragment>
      {currentProject ? (
        <button
          className="flex items-center justify-center h-full px-4 transition duration-300 ease-in-out hover:bg-white-alpha-20 text-black dark:text-white cursor-pointer focus:outline-none"
          onClick={() => setIsNewBugOpen(true)}
        >
          New Bug
        </button>
      ) : (
        <button
          className="flex items-center justify-center h-full px-4 transition duration-300 ease-in-out hover:bg-white-alpha-20 text-black dark:text-white cursor-pointer focus:outline-none"
          onClick={() => setIsNewProjectOpen(true)}
        >
          New Project
        </button>
      )}
      {currentProject && (
        <Link
          className="flex items-center justify-center h-full px-4 transition duration-300 ease-in-out hover:bg-white-alpha-20 text-black dark:text-white"
          to="/"
        >
          Your Projects
        </Link>
      )}
      <button
        className="flex items-center justify-center h-full px-4 transition duration-300 ease-in-out hover:bg-white-alpha-20 text-black dark:text-white cursor-pointer focus:outline-none"
        onClick={() => logout()}
      >
        Logout
      </button>
      <Link
        className="flex items-center justify-center h-full px-4 transition duration-300 ease-in-out hover:bg-white-alpha-20 text-black dark:text-white"
        to="/info"
      >
        Info
      </Link>
    </Fragment>
  );

  const desktopNav = (
    <div className="flex flex-row items-center justify-center h-full">
      {isAuthenticated ? userLinks : guestLinks}

      <DarkModeToggle />
    </div>
  );

  const mobileNav = (
    <button
      className="flex flex-row items-center justify-center h-full w-16 focus:outline-none"
      onClick={() => setIsOpen(!isOpen)}
    >
      <i className="material-icons text-black dark:text-white">menu</i>
    </button>
  );

  useEffect(() => {
    if (isDarkMode) {
      setIsDark(true);
      darkModeOn(dispatch);
    } else {
      setIsDark(false);
      darkModeOff(dispatch);
    }

    // eslint-disable-next-line
  }, [isDarkMode]);

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <Fragment>
      <div className="fixed flex flex-row items-baseline justify-center w-screen max-w-full h-16 shadow-lg bg-cyan-a400 dark:bg-cyan-a700 shadow z-10">
        <div className="flex flex-row items-center justify-between max-w-screen-xl px-4 w-full h-full text-white">
          <a
            href="/"
            className="flex items-center justify-center h-full px-4 font-hairline text-3xl text-black dark:text-white"
          >
            BugTracker
          </a>
          {isDesktop ? desktopNav : mobileNav}
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
    </Fragment>
  );
};

export default Navbar;
