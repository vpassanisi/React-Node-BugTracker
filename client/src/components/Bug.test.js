import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Bug from "../components/Bug";
import {
  BugsProvider,
  useBugsDispatch,
  deleteBug,
} from "../Context/bugs/BugsContext";
import { DarkModeProvider } from "../Context/darkMode/DarkModeContext";

jest.mock("../components/UpdateBug.js", () => jest.fn(() => null));

global.matchMedia = jest.fn(() => true);

jest.mock("react-responsive", () => ({
  useMediaQuery: () => true,
}));

jest.mock("../Context/bugs/BugsContext.js", () => ({
  ...jest.requireActual("../Context/bugs/BugsContext.js"),
  useBugsDispatch: jest.fn(),
  deleteBug: jest.fn(),
}));

const setup = () => {
  const props = {
    bug: {
      _id: "5e3d263bd58ff400173b19f9",
      status: "Open",
      project: "5e3c806cb06fe929a086375f",
      name: "test bug name",
      reporter: "5e28fda6126f2238701df213",
      fixer: "5e28fda6126f2238701df213",
      severity: "Minor",
      reproduceability: "Intermitent",
      description: "test bug description",
      createdAt: "2020-02-07T08:56:27.208+00:00",
      updatedAt: "2020-02-07T08:56:27.208+00:00",
    },
    index: 2,
  };

  const mockSetOpen = jest.fn();

  const utils = render(
    <DarkModeProvider>
      <BugsProvider>
        <Bug
          open={2}
          setOpen={mockSetOpen}
          index={props.index}
          bug={props.bug}
        />
      </BugsProvider>
    </DarkModeProvider>
  );

  const buttonOpen = utils.getByTestId("button_open");
  const buttonDelete = utils.getByTestId("button_delete");

  return {
    ...utils,
    props,
    mockSetOpen,
    buttonOpen,
    buttonDelete,
  };
};

test("renders the bugs name", () => {
  const { getByText, props } = setup();

  const { bug } = props;

  expect(getByText(bug.name)).toBeInTheDocument();
});

test("renders the bugs description", async () => {
  const { props, getByText } = setup();

  const { bug } = props;

  expect(getByText(bug.description)).toBeInTheDocument();
});

test("renders the bugs name", async () => {
  const { props, getByText } = setup();

  const { bug } = props;

  expect(getByText(bug.name)).toBeInTheDocument();
});

test("calls deleteBug with the correct arguments", () => {
  const { buttonDelete, props } = setup();

  const { bug, index } = props;
  global.confirm = () => true;
  const bugsDispatch = useBugsDispatch();

  fireEvent.click(buttonDelete, { button: 0 });

  expect(deleteBug).toHaveBeenCalledWith(bugsDispatch, bug._id, index);
});

test("calls setOpen correctly", () => {
  const { mockSetOpen, buttonOpen } = setup();

  fireEvent.click(buttonOpen, { button: 0 });

  expect(mockSetOpen).toHaveBeenCalledWith(null);
});
