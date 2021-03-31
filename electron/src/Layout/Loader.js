import React from "react";
import { useAuthState } from "../Context/auth/authContext";
import { useProjectsState } from "../Context/projects/projectsContext";
import { useBugsState } from "../Context/bugs/bugsContext";

const Loader = () => {
  const { isLoading: isAuthLoading } = useAuthState();
  const { isLoading: isProjectsLoading } = useProjectsState();
  const { isLoading: isBugsLoading } = useBugsState();

  return (
    <div>
      {isAuthLoading || isProjectsLoading || isBugsLoading ? (
        <div data-testid="not_loading" className="fixed top-16 progress-line" />
      ) : null}
    </div>
  );
};

export default Loader;
