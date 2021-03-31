import React from "react";
import { prettyDOM, render } from "@testing-library/react";
import {
  ProjectsProvider,
  ProjectsStateContext,
  useProjectsState,
  useProjectsDispatch,
  getProjects,
  setProject,
  newProject,
  editProject,
  deleteProject,
  clearCurrentProject,
  clearProjectsErrors,
} from "../Context/projects/ProjectsContext";

global.fetch = jest.fn();

const fetchSuccess = () => {
  global.fetch.mockImplementation((endpoint, http) =>
    Promise.resolve({
      json: () => {
        if (
          endpoint === `/api/v1/projects/getProjects` &&
          http.method === "GET"
        ) {
          return {
            success: true,
            data: [{ id: "3" }, { id: "4" }, { id: "5" }],
          };
        } else {
          return {
            success: true,
            data: http.body ? JSON.parse(http.body) : { id: "test id" },
          };
        }
      },
    })
  );
};

const fetchFail = () => {
  global.fetch.mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          success: false,
          error: "test error",
        }),
    })
  );
};

const fetchDeleteFail = () => {
  global.fetch.mockImplementation((endpoint, http) =>
    Promise.resolve({
      json: () => {
        if (endpoint === `/api/v1/projects/id` && http.method === "GET") {
          return {
            success: true,
          };
        } else {
          return {
            success: false,
            error: "test delete error",
          };
        }
      },
    })
  );
};

const fetchReject = () => {
  global.fetch.mockImplementation(() => Promise.reject("test rejection"));
};

const setup = ({
  TestComp = () => null,
  projects = [],
  currentProject = null,
  error = null,
  TestError = () => null,
}) => {
  const utils = render(
    <div>
      <TestError />
      <ProjectsProvider
        projects={projects}
        currentProject={currentProject}
        error={error}
      >
        <TestComp />
        <ProjectsStateContext.Consumer>
          {(value) => {
            let str = "";
            value.projects.forEach((val) => (str = str.concat(` ${val.id}`)));
            return (
              <div>
                <div>projects:{str}</div>
                <div>
                  currentProject:{" "}
                  {`${
                    value.currentProject
                      ? value.currentProject.id
                      : value.currentProject
                  }`}
                </div>
                <div>error: {`${value.error}`}</div>
              </div>
            );
          }}
        </ProjectsStateContext.Consumer>
      </ProjectsProvider>
    </div>
  );

  return {
    ...utils,
  };
};

describe("getProjects", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        getProjects(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(await findByText("projects: 3 4 5")).toBeInTheDocument();
  });

  test("updates state on fail", async () => {
    fetchFail();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        getProjects(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(await findByText("error: test error")).toBeInTheDocument();
  });

  test("updates state on rejection", async () => {
    fetchReject();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        getProjects(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(await findByText("error: test rejection")).toBeInTheDocument();
  });
});

describe("setProject", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        setProject(dispatch, "id");
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(await findByText("currentProject: test id")).toBeInTheDocument();
  });

  test("updates state on fail", async () => {
    fetchFail();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        setProject(dispatch, "id");
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp });
    expect(await findByText("error: test error")).toBeInTheDocument();
  });

  test("updates state on rejection", async () => {
    fetchReject();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        setProject(dispatch, "id");
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(await findByText("error: test rejection")).toBeInTheDocument();
  });
});

describe("newProject", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        newProject(dispatch, { id: "3" });
      }, []);
      return null;
    };
    const { findByText } = setup({
      TestComp: TestComp,
      projects: [{ id: "0" }, { id: "1" }, { id: "2" }],
    });
    expect(await findByText("projects: 0 1 2 3")).toBeInTheDocument();
  });

  test("updates state on fail", async () => {
    fetchFail();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        newProject(dispatch, {});
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(await findByText("error: test error")).toBeInTheDocument();
  });

  test("updates state on rejection", async () => {
    fetchReject();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        newProject(dispatch, {});
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(await findByText("error: test rejection")).toBeInTheDocument();
  });
});

describe("editProject", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        editProject(dispatch, { id: "5" }, 1);
      }, []);
      return null;
    };
    const { findByText } = setup({
      TestComp: TestComp,
      projects: [{ id: "0" }, { id: "1" }, { id: "2" }],
    });
    expect(await findByText("projects: 0 5 2")).toBeInTheDocument();
  });

  test("updates state on fail", async () => {
    fetchFail();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        editProject(dispatch, {}, 1);
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(await findByText("error: test error")).toBeInTheDocument();
  });

  test("updates state on rejection", async () => {
    fetchReject();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        editProject(dispatch, {}, 1);
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(await findByText("error: test rejection")).toBeInTheDocument();
  });
});

describe("deleteProject", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        deleteProject(dispatch, "id", 1);
      }, []);
      return null;
    };
    const { findByText } = setup({
      TestComp: TestComp,
      projects: [{ id: "0" }, { id: "1" }, { id: "2" }],
    });
    expect(await findByText("projects: 0 2")).toBeInTheDocument();
  });

  test("updates state on get project fail", async () => {
    fetchFail();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        deleteProject(dispatch, "id", 1);
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(await findByText("error: test error")).toBeInTheDocument();
  });

  test("updates state on delete fail", async () => {
    fetchDeleteFail();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        deleteProject(dispatch, "id", 1);
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(await findByText("error: test delete error")).toBeInTheDocument();
  });

  test("updates state on rejection", async () => {
    fetchReject();
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        deleteProject(dispatch, "id", 1);
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(await findByText("error: test rejection")).toBeInTheDocument();
  });
});

describe("clearCurrentProject", () => {
  test("clears current project", async () => {
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        clearCurrentProject(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup({
      TestComp: TestComp,
      currentProject: "test current project",
    });
    expect(await findByText("currentProject: null")).toBeInTheDocument();
  });
});

describe("clearProjectsErrors", () => {
  test("clears errors", async () => {
    const Comp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        clearProjectsErrors(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup({ TestComp: Comp, error: "test error" });
    expect(await findByText("error: null")).toBeInTheDocument();
  });
});

describe("useProjectsState", () => {
  test("throws error when called outside of a Provider", () => {
    const TestError = () => {
      expect(useProjectsState).toThrow(
        Error("useProjectsState must be used within a ProjectsProvider")
      );
      return null;
    };
    setup({ TestError: TestError });
  });
});

describe("useProjectsDispatch", () => {
  test("throws error when called outside of a Provider", () => {
    const TestError = () => {
      expect(useProjectsDispatch).toThrow(
        Error("useProjectsDispatch must be used within a ProjectsProvider")
      );
      return null;
    };
    setup({ TestError: TestError });
  });
});

describe("Reducer", () => {
  test("updates state on defualt action type", async () => {
    const TestComp = () => {
      const dispatch = useProjectsDispatch();
      React.useEffect(() => {
        dispatch({ type: "default" });
      });
      return null;
    };
    const { findByText } = setup({ TestComp: TestComp });
    expect(
      await findByText("error: Unhandled action type: default")
    ).toBeInTheDocument();
  });
});
