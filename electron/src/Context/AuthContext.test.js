import React from "react";
import { render } from "@testing-library/react";
import {
  AuthProvider,
  AuthStateContext,
  useAuthDispatch,
  useAuthState,
  getMe,
  login,
  logout,
  createUser,
  clearAuthErrors,
} from "../Context/auth/AuthContext";

global.fetch = jest.fn();

const fetchSuccess = () => {
  global.fetch.mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          success: true,
        }),
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
  isAuth = false,
  error = null,
  Error = () => null
) => {
  const utils = render(
    <div>
      <Error />
      <AuthProvider isAuthenticated={isAuth} error={error}>
        <Comp />
        <AuthStateContext.Consumer>
          {(value) => {
            return (
              <div>
                <div>isAuthenticated: {`${value.isAuthenticated}`}</div>
                <div>isLoading: {`${value.isLoading}`}</div>
                <div>error: {`${value.error}`}</div>
              </div>
            );
          }}
        </AuthStateContext.Consumer>
      </AuthProvider>
    </div>
  );

  return {
    ...utils,
  };
};

describe("login", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        login(dispatch, {});
      }, []);
      return null;
    };

    const { findByText } = setup(Comp);
    expect(global.fetch).toHaveBeenCalledWith("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({}),
    });
    expect(await findByText("isAuthenticated: true")).toBeInTheDocument();
  });

  test("updates state on fail", async () => {
    fetchFail();
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        login(dispatch, {});
      }, []);
      return null;
    };

    const { findByText } = setup(Comp);
    expect(global.fetch).toHaveBeenCalledWith("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({}),
    });
    expect(await findByText("error: test error")).toBeInTheDocument();
  });

  test("updates state on rejection", async () => {
    fetchReject();
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        login(dispatch, {});
      }, []);
      return null;
    };

    const { findByText } = setup(Comp);
    expect(global.fetch).toHaveBeenCalledWith("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({}),
    });
    expect(await findByText("error: test rejection")).toBeInTheDocument();
  });
});

describe("getMe", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        getMe(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(global.fetch).toHaveBeenCalledWith(`/api/v1/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    expect(await findByText("isAuthenticated: true")).toBeInTheDocument();
  });

  test("updates state on fail", async () => {
    fetchFail();
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        getMe(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(global.fetch).toHaveBeenCalledWith(`/api/v1/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    expect(await findByText("error: test error")).toBeInTheDocument();
  });

  test("updates state on rejection", async () => {
    fetchReject();
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        getMe(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp);
    expect(global.fetch).toHaveBeenCalledWith(`/api/v1/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    expect(await findByText("error: test rejection")).toBeInTheDocument();
  });
});

describe("logout", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        logout(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp, true);

    expect(await findByText("isAuthenticated: false")).toBeInTheDocument();
  });

  test("updates state on fail", async () => {
    fetchFail();
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        logout(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp, true);

    expect(await findByText("error: test error")).toBeInTheDocument();
  });

  test("updates state on rejection", async () => {
    fetchReject();
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        logout(dispatch);
      }, []);
      return null;
    };
    const { findByText } = setup(Comp, true);

    expect(await findByText("error: test rejection")).toBeInTheDocument();
  });
});

describe("createUser", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        createUser(dispatch, {});
      }, []);
      return null;
    };

    const { findByText } = setup(Comp, false);

    expect(await findByText("isAuthenticated: true")).toBeInTheDocument();
  });

  test("updates state on fail", async () => {
    fetchFail();
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        createUser(dispatch, {});
      }, []);
      return null;
    };

    const { findByText } = setup(Comp, false);

    expect(await findByText("error: test error")).toBeInTheDocument();
  });

  test("updates state on rejection", async () => {
    fetchReject();
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        createUser(dispatch, {});
      }, []);
      return null;
    };

    const { findByText } = setup(Comp, false);

    expect(await findByText("error: test rejection")).toBeInTheDocument();
  });
});

describe("clearAuthErrors", () => {
  test("clears errors", () => {
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        clearAuthErrors(dispatch);
      }, []);
      return null;
    };
    const { getByText } = setup(Comp, false, "test");

    expect(getByText("error: null")).toBeInTheDocument();
  });
});

describe("useAuthState", () => {
  test("throws error when called outside of a Provider", () => {
    const TestError = () => {
      expect(useAuthState).toThrow(
        Error("useAuthState must be used within an AuthProvider")
      );
      return null;
    };
    setup(() => null, false, null, TestError);
  });
});

describe("useAuthDispatch", () => {
  test("throws error when called outside of a Provider", () => {
    const TestError = () => {
      expect(useAuthDispatch).toThrow(
        Error("useAuthDispatch must be used within an AuthProvider")
      );
      return null;
    };
    setup(() => null, false, null, TestError);
  });
});

describe("Reducer", () => {
  test("Reducer default throws error", async () => {
    const Comp = () => {
      const dispatch = useAuthDispatch();
      React.useEffect(() => {
        dispatch({ type: "default" });
      });
      return null;
    };
    const { findByText } = setup(Comp, false, null, () => null);
    expect(
      await findByText("error: Unhandled action type: default")
    ).toBeInTheDocument();
  });
});
