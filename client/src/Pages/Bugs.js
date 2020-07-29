import React from "react";
import Bug from "../components/Bug";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";

import { useAuthState } from "../Context/auth/AuthContext";
import {
  useBugsState,
  useBugsDispatch,
  sortBugs,
  getBugs,
} from "../Context/bugs/BugsContext";
import { useProjectsState } from "../Context/projects/ProjectsContext";

const Bugs = () => {
  const history = useHistory();
  const [open, setOpen] = React.useState(null);

  const { isAuthenticated } = useAuthState();

  const { currentProject } = useProjectsState();

  const { bugs } = useBugsState();
  const bugsDispatch = useBugsDispatch();

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const bugsAccordion = bugs.map((bug, index) => (
    <Bug key={index} bug={bug} index={index} open={open} setOpen={setOpen} />
  ));

  React.useEffect(() => {
    if (currentProject) {
      getBugs(bugsDispatch);
    } else {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [currentProject]);

  React.useEffect(() => {
    if (!isAuthenticated) {
      history.push("/info");
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="w-full h-20 flex items-center justify-center text-3xl font-hairline">
        {currentProject && currentProject.name}
      </div>
      <div className="flex flex-row items-center justify-between w-full pl-4 pr-2 h-16 bg-gray-300 dark:bg-gray-800 border border-cyan-400 ">
        <div
          className={`${
            isDesktop ? "w-3/8" : "w-2/4"
          } h-10 flex items-center justify-center`}
        >
          <button
            data-testid="button_name"
            className="h-10 px-4 bg-gray-400 dark:bg-gray-700 rounded border shadow"
            onClick={() => sortBugs(bugsDispatch, "name")}
          >
            name
          </button>
        </div>
        {isDesktop && (
          <div className="w-1/8 flex items-center justify-center">
            <button
              data-testid="button_fixer"
              className="h-10 px-4 bg-gray-400 dark:bg-gray-700 rounded border shadow"
              onClick={() => sortBugs(bugsDispatch, "fixer")}
            >
              fixer
            </button>
          </div>
        )}
        {isDesktop && (
          <div className="w-1/8 flex items-center justify-center">
            <button
              data-testid="button_reporter"
              className="h-10 px-4 bg-gray-400 dark:bg-gray-700 rounded border shadow"
              onClick={() => sortBugs(bugsDispatch, "reporter")}
            >
              reporter
            </button>
          </div>
        )}
        <div
          className={`flex items-center justify-center ${
            isDesktop ? "w-1/8" : "w-1/4"
          } mx-2`}
        >
          <button
            data-testid="button_status"
            className="h-10 px-4 bg-gray-400 dark:bg-gray-700 rounded border shadow"
            onClick={() => sortBugs(bugsDispatch, "status")}
          >
            status
          </button>
        </div>
        <div
          className={`flex items-center justify-center ${
            isDesktop ? "w-1/8" : "w-1/4"
          } mx-2`}
        >
          <button
            data-testid="button_severity"
            className="h-10 px-4 bg-gray-400 dark:bg-gray-700 rounded border shadow"
            onClick={() => sortBugs(bugsDispatch, "severity")}
          >
            severity
          </button>
        </div>
        {isDesktop && (
          <div className="flex items-center justify-center w-1/8 mx-2">
            <button
              data-testid="button_reproduceability"
              className="h-10 px-4 bg-gray-400 dark:bg-gray-700 rounded border shadow"
              onClick={() => sortBugs(bugsDispatch, "reproduceability")}
            >
              reprodeable
            </button>
          </div>
        )}

        <i
          className={`material-icons transition-transform duration-500 ease-in-out w-8`}
        >
          keyboard_arrow_down
        </i>
      </div>
      {bugsAccordion}
    </div>
  );
};

export default Bugs;
