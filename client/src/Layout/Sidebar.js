import React, { useContext, Fragment } from "react";
import { Drawer } from "@material-ui/core";
import DarkModeToggle from "../Layout/DarkModeToggle";
import { Link } from "react-router-dom";

import ProjectsContext from "../Context/projects/projectsContext";
import {
  useAuthState,
  useAuthDispatch,
  logout,
} from "../Context/auth/AuthContext";
import { useDarkModeState } from "../Context/darkMode/darkModeContext";

const Sidebar = (props) => {
  const projectsContext = useContext(ProjectsContext);

  const { currentProject } = projectsContext;

  const { isAuthenticated } = useAuthState();
  const authDispatch = useAuthDispatch();
  const { isDarkMode } = useDarkModeState();

  const { isOpen, setIsOpen, setIsNewBugOpen, setIsNewProjectOpen } = props;

  const guestLinks = (
    <Fragment>
      <Link
        className={`flex items-center justify-center w-full h-12 transition duration-300 ease-in-out ${
          isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-300"
        }  text-black dark:text-white`}
        to="/create"
        onClick={() => setIsOpen(false)}
      >
        Create User
      </Link>
      <Link
        className={`flex items-center justify-center w-full h-12 transition duration-300 ease-in-out ${
          isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-300"
        } text-black dark:text-white`}
        to="/login"
        onClick={() => setIsOpen(false)}
      >
        Login
      </Link>
      <Link
        className={`flex items-center justify-center w-full h-12 transition duration-300 ease-in-out ${
          isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-300"
        } text-black dark:text-white`}
        to="/info"
        onClick={() => setIsOpen(false)}
      >
        Info
      </Link>
    </Fragment>
  );

  const userLinks = (
    <Fragment>
      {currentProject ? (
        <button
          className={`flex items-center justify-center w-full h-12 transition duration-300 ease-in-out ${
            isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-300"
          } text-black dark:text-white focus:outline-none`}
          onClick={() => {
            setIsOpen(false);
            setIsNewBugOpen(true);
          }}
        >
          New Bug
        </button>
      ) : (
        <button
          className={`flex items-center justify-center w-full h-12 transition duration-300 ease-in-out ${
            isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-300"
          } text-black dark:text-white  focus:outline-none`}
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
          className={`flex items-center justify-center w-full h-12 transition duration-300 ease-in-out ${
            isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-300"
          } text-black dark:text-white`}
          to="/"
          onClick={() => setIsOpen(false)}
        >
          Your Projects
        </Link>
      )}
      <button
        className={`flex items-center justify-center w-full h-12 transition duration-300 ease-in-out ${
          isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-300"
        } text-black dark:text-white cursor-pointer`}
        onClick={() => {
          logout(authDispatch);
          setIsOpen(false);
        }}
      >
        Logout
      </button>
      <Link
        className={`flex items-center justify-center w-full h-12 transition duration-300 ease-in-out ${
          isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-300"
        } text-black dark:text-white`}
        to="/info"
        onClick={() => setIsOpen(false)}
      >
        Info
      </Link>
    </Fragment>
  );

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(!isOpen)}>
      <div className="w-full h-full bg-white dark:bg-black">
        <div className="w-full h-full bg-white dark:bg-black-alpha-80 border-r">
          <div className="flex flex-col items-center w-64 pt-8">
            <DarkModeToggle />
            <hr className="w-full mt-8" />
            {isAuthenticated ? userLinks : guestLinks}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
