import React from "react";
import { useAuthState } from "../Context/auth/AuthContext";
import { useProjectsState } from "../Context/projects/ProjectsContext";
import { useBugsState } from "../Context/bugs/BugsContext";

const Loader = () => {
  const { isLoading: isAuthLoading } = useAuthState();
  const { isLoading: isProjectsLoading } = useProjectsState();
  const { isLoading: isBugsLoading } = useBugsState();

  return (
    <div>
      {isAuthLoading || isProjectsLoading || isBugsLoading ? (
        ""
      ) : (
        <div data-testid="not_loading" className="h-1" />
      )}
    </div>
  );
};

export default Loader;
