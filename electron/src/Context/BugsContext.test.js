import React from "react";
import { fireEvent, render } from "@testing-library/react";
import {
  BugsProvider,
  BugsStateContext,
  useBugsState,
  useBugsDispatch,
  getBugs,
  newBug,
  updateBug,
  deleteBug,
  sortBugs,
  clearBugsErrors,
} from "../Context/bugs/BugsContext";

global.fetch = jest.fn();

const fetchSuccess = () => {
  global.fetch.mockImplementation((endpoint, http) =>
    Promise.resolve({
      json: () => {
        if (endpoint === `/api/v1/bugs/project` && http.method === "GET") {
          return {
            success: true,
            data: [{ id: "fetch 0" }, { id: "fetch 1" }, { id: "fetch 2" }],
          };
        } else {
          return {
            success: true,
            data: http.body ? JSON.parse(http.body) : null,
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

const fetchReject = () => {
  global.fetch.mockImplementation(() => Promise.reject("test rejection"));
};

const setup = (
  Comp = () => null,
  error = null,
  bugs = [{ id: "0" }, { id: "1" }, { id: "2" }],
  Error = () => null
) => {
  const utils = render(
    <div>
      <Error />
      <BugsProvider bugs={bugs} error={error}>
        <Comp />
        <BugsStateContext.Consumer>
          {(value) => {
            let str = "";
            value.bugs.forEach((bug) => (str = str.concat(` ${bug.id}`)));
            return (
              <div>
                <div>bugs: {str}</div>
                <div>error: {`${value.error}`}</div>
              </div>
            );
          }}
        </BugsStateContext.Consumer>
      </BugsProvider>
    </div>
  );
  return {
    ...utils,
  };
};

describe("getBugs", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        getBugs(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(
      await findByText("bugs: fetch 0 fetch 1 fetch 2")
    ).toBeInTheDocument();
  });

  test("updates state on fail", async () => {
    fetchFail();
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        getBugs(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(await findByText("error: test error")).toBeInTheDocument();
  });

  test("updates state on rejection", async () => {
    fetchReject();
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        getBugs(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(await findByText("error: test rejection")).toBeInTheDocument();
  });
});

describe("newBug", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        newBug(dispatch, { id: "3" });
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(await findByText("bugs: 0 1 2 3"));
  });

  test("updates state on fail", async () => {
    fetchFail();
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        newBug(dispatch, {});
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(await findByText("error: test error")).toBeInTheDocument();
  });

  test("updates state on rejection", async () => {
    fetchReject();
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        newBug(dispatch, {});
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(await findByText("error: test rejection")).toBeInTheDocument();
  });
});

describe("updateBug", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        updateBug(dispatch, { id: "updated" }, 1, 1);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(await findByText("bugs: 0 updated 2")).toBeInTheDocument();
  });

  test("updates state on fail", async () => {
    fetchFail();
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        updateBug(dispatch, {}, 1, 1);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(await findByText("error: test error")).toBeInTheDocument();
  });

  test("updates state on rejection", async () => {
    fetchReject();
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        updateBug(dispatch, {}, 1, 1);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(await findByText("error: test rejection")).toBeInTheDocument();
  });
});

describe("deleteBug", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        deleteBug(dispatch, "id", 1);
      }, []);
      return <div></div>;
    };
    const { findByText } = setup(Comp);
    expect(await findByText("bugs: 0 2")).toBeInTheDocument();
  });

  test("updates state on fail", async () => {
    fetchFail();
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        deleteBug(dispatch, "id", 1);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(await findByText("error: test error")).toBeInTheDocument();
  });

  test("updates state on rejection", async () => {
    fetchReject();
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        deleteBug(dispatch, "id", 1);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(await findByText("error: test rejection")).toBeInTheDocument();
  });
});

describe("sortBugs", () => {
  test("updates state", async () => {
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        sortBugs(dispatch, "id");
      });
      return null;
    };
    const { findByText } = setup(Comp, null, [
      { id: "0" },
      { id: "1" },
      { id: "2" },
    ]);
    expect(await findByText("bugs: 2 1 0")).toBeInTheDocument();
  });

  test("updates state twice", async () => {
    const Comp = () => {
      const dispatch = useBugsDispatch();
      return <button onClick={() => sortBugs(dispatch, "id")}>sort</button>;
    };
    const { findByText } = setup(Comp, null, [
      { id: "0" },
      { id: "2" },
      { id: "1" },
    ]);
    fireEvent.click(await findByText("sort"), { button: 0 });
    fireEvent.click(await findByText("sort"), { button: 0 });
    expect(await findByText("bugs: 2 1 0")).toBeInTheDocument();
  });

  test("updates state with equal values", async () => {
    const Comp = () => {
      const dispatch = useBugsDispatch();
      return <button onClick={() => sortBugs(dispatch, "id")}>sort</button>;
    };
    const { findByText } = setup(Comp, null, [
      { id: "0" },
      { id: "2" },
      { id: "2" },
      { id: "1" },
    ]);
    fireEvent.click(await findByText("sort"), { button: 0 });
    expect(await findByText("bugs: 0 1 2 2")).toBeInTheDocument();
  });

  test("updates state by fixer", async () => {
    const Comp = () => {
      const dispatch = useBugsDispatch();
      return <button onClick={() => sortBugs(dispatch, "fixer")}>sort</button>;
    };
    const { findByText } = setup(Comp, null, [
      { id: "0", fixer: { name: "a" } },
      { id: "2", fixer: { name: "c" } },
      { id: "1", fixer: { name: "b" } },
    ]);
    fireEvent.click(await findByText("sort"), { button: 0 });
    expect(await findByText("bugs: 0 1 2")).toBeInTheDocument();
  });

  test("updates state by reporter", async () => {
    const Comp = () => {
      const dispatch = useBugsDispatch();
      return (
        <button onClick={() => sortBugs(dispatch, "reporter")}>sort</button>
      );
    };
    const { findByText } = setup(Comp, null, [
      { id: "0", reporter: { name: "a" } },
      { id: "2", reporter: { name: "c" } },
      { id: "1", reporter: { name: "b" } },
    ]);
    fireEvent.click(await findByText("sort"), { button: 0 });
    expect(await findByText("bugs: 0 1 2")).toBeInTheDocument();
  });
});

describe("clearBugsErrors", () => {
  test("clears errors", async () => {
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        clearBugsErrors(dispatch);
      }, []);
      return null;
    };
    const { getByText } = setup(Comp, "test");

    expect(getByText("error: null")).toBeInTheDocument();
  });
});

describe("useBugsDispatch", () => {
  test("throws error when called outside of a Provider", () => {
    const TestError = () => {
      expect(useBugsDispatch).toThrow(
        Error("useBugsDispatch must be used within a BugsProvider")
      );
      return null;
    };
    setup(() => null, null, [{ id: "0" }, { id: "1" }, { id: "2" }], TestError);
  });
});

describe("useBugsState", () => {
  test("throws error when called outside of a Provider", () => {
    const TestError = () => {
      expect(useBugsState).toThrow(
        Error("useBugsState must be used within a BugsProvider")
      );
      return null;
    };
    setup(() => null, null, [{ id: "0" }, { id: "1" }, { id: "2" }], TestError);
  });
});

describe("Reducer", () => {
  test("Reducer default throws error", async () => {
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        dispatch({ type: "default" });
      });
      return null;
    };
    const { findByText } = setup(Comp);
    expect(
      await findByText("error: Unhandled action type: default")
    ).toBeInTheDocument();
  });
});
