import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import NewBugModal from "../components/NewBugModal";
import NewProjectModal from "../components/NewProjectModal";
import Sidebar from "../Layout/Sidebar";

import { useProjectsState } from "../Context/projects/ProjectsContext";
import {
  useAuthState,
  useAuthDispatch,
  logout,
  getMe,
} from "../Context/auth/AuthContext";
import {
  useDarkModeState,
  useDarkModeDispatch,
  darkModeOn,
  darkModeOff,
} from "../Context/darkMode/DarkModeContext";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isNewBugOpen, setIsNewBugOpen] = React.useState(false);
  const [isNewProjectOpen, setIsNewProjectOpen] = React.useState(false);

  const { currentProject } = useProjectsState();

  const { isAuthenticated } = useAuthState();
  const authDispatch = useAuthDispatch();

  const { isDarkMode } = useDarkModeState();
  const darkModeDispatch = useDarkModeDispatch();

  const { setIsDark } = props;

  const guestLinks = (
    <React.Fragment>
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
    </React.Fragment>
  );

  const userLinks = (
    <React.Fragment>
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
        onClick={() => logout(authDispatch)}
      >
        Logout
      </button>
      {!isAuthenticated && (
        <Link
          className="flex items-center justify-center h-full px-4 transition duration-300 ease-in-out hover:bg-white-alpha-20 text-black dark:text-white"
          to="/info"
        >
          Info
        </Link>
      )}
    </React.Fragment>
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

  React.useEffect(() => {
    if (isDarkMode) {
      setIsDark(true);
      darkModeOn(darkModeDispatch);
    } else {
      setIsDark(false);
      darkModeOff(darkModeDispatch);
    }
    // eslint-disable-next-line
  }, [isDarkMode]);

  // checks if the login cookie is set.  This only needs to be done when the app loads, since the navabar should only mount once I put it here.
  React.useEffect(() => {
    getMe(authDispatch);
    // eslint-disable-next-line
  }, []);

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Navbar;
