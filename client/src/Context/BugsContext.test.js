import React from "react";
import { prettyDOM, render } from "@testing-library/react";
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

describe("deleteBug", () => {
  test("updates state on success", async () => {
    fetchSuccess();
    const Comp = () => {
      const dispatch = useBugsDispatch();
      React.useEffect(() => {
        deleteBug(dispatch, "id", 1);
      });
      return <div></div>;
    };
    const { findByText } = setup(Comp);
    expect(await findByText("bugs: 0 2")).toBeInTheDocument();
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
