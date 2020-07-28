import React from "react";
import { fireEvent, render } from "@testing-library/react";
import NewBugModal from "../components/NewBugModal";
import {
  BugsProvider,
  useBugsDispatch,
  newBug,
} from "../Context/bugs/BugsContext";

jest.mock("../Context/bugs/BugsContext.js", () => ({
  ...jest.requireActual("../Context/bugs/BugsContext.js"),
  useBugsDispatch: jest.fn(),
  newBug: jest.fn(),
}));

const setup = () => {
  const mockSetIsNewBugOpen = jest.fn();
  const utils = render(
    <BugsProvider>
      <NewBugModal isNewBugOpen={true} setIsNewBugOpen={mockSetIsNewBugOpen} />
    </BugsProvider>
  );

  const bugsDispatch = useBugsDispatch();
  const modal = utils.getByTestId("modal");
  const inputName = utils.getByTestId("input_name");
  const inputFixer = utils.getByTestId("input_fixer");
  const inputDescription = utils.getByTestId("input_description");
  const selectStatus = utils.getByTestId("select_status");
  const selectSeverity = utils.getByTestId("select_severity");
  const selectRedproduceability = utils.getByTestId("select_reproduceability");
  const buttonNewBug = utils.getByTestId("button_new_bug");

  return {
    ...utils,
    bugsDispatch,
    mockSetIsNewBugOpen,
    modal,
    inputName,
    inputFixer,
    inputDescription,
    selectStatus,
    selectSeverity,
    selectRedproduceability,
    buttonNewBug,
  };
};

test("input name changes on input", () => {
  const { inputName } = setup();

  fireEvent.change(inputName, { target: { value: "test new bug name" } });

  expect(inputName.value).toBe("test new bug name");
});

test("input fixer changes on input", () => {
  const { inputFixer } = setup();

  fireEvent.change(inputFixer, { target: { value: "test new bug fixer" } });

  expect(inputFixer.value).toBe("test new bug fixer");
});

test("input description changes on input", () => {
  const { inputDescription } = setup();

  fireEvent.change(inputDescription, {
    target: { value: "test new bug description" },
  });

  expect(inputDescription.value).toBe("test new bug description");
});

test("select status changes on input", () => {
  const { selectStatus } = setup();

  fireEvent.change(selectStatus, { target: { value: "Closed" } });

  expect(selectStatus.value).toBe("Closed");
});

test("select severity changes on input", () => {
  const { selectSeverity } = setup();

  fireEvent.change(selectSeverity, { target: { value: "Minor" } });

  expect(selectSeverity.value).toBe("Minor");
});

test("select reproduceability changes on input", () => {
  const { selectRedproduceability } = setup();

  fireEvent.change(selectRedproduceability, {
    target: { value: "Intermitent" },
  });

  expect(selectRedproduceability.value).toBe("Intermitent");
});

test("calls newBug with the correct arguments", () => {
  const {
    bugsDispatch,
    inputName,
    inputFixer,
    inputDescription,
    selectStatus,
    selectSeverity,
    selectRedproduceability,
    buttonNewBug,
  } = setup();

  const bug = {
    name: "test new bug name",
    fixer: "test new bug fixer",
    description: "test new bug description",
    status: "Closed",
    severity: "Minor",
    reproduceability: "Intermitent",
  };

  fireEvent.change(inputName, { target: { value: bug.name } });
  fireEvent.change(inputFixer, { target: { value: bug.fixer } });
  fireEvent.change(inputDescription, {
    target: { value: bug.description },
  });
  fireEvent.change(selectStatus, { target: { value: bug.status } });
  fireEvent.change(selectSeverity, { target: { value: bug.severity } });
  fireEvent.change(selectRedproduceability, {
    target: { value: bug.reproduceability },
  });

  fireEvent.click(buttonNewBug, { button: 0 });

  expect(newBug).toHaveBeenCalledWith(bugsDispatch, bug);
});

test("closes the modal on button click", () => {
  const { buttonNewBug, mockSetIsNewBugOpen } = setup();

  fireEvent.click(buttonNewBug, { button: 0 });

  expect(mockSetIsNewBugOpen).toHaveBeenCalledWith(false);
});

test("closes modal on click", () => {
  const { modal, mockSetIsNewBugOpen } = setup();

  fireEvent.click(modal, { button: 0 });

  expect(mockSetIsNewBugOpen).toHaveBeenCalledWith(false);
});
