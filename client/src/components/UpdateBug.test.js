import React from "react";
import { fireEvent, render } from "@testing-library/react";
import UpdateBug from "../components/UpdateBug";
import {
  BugsProvider,
  useBugsDispatch,
  updateBug,
} from "../Context/bugs/BugsContext";

jest.mock("../Context/bugs/BugsContext.js", () => ({
  ...jest.requireActual("../Context/bugs/BugsContext.js"),
  useBugsDispatch: jest.fn(),
  updateBug: jest.fn(),
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

  const utils = render(
    <BugsProvider>
      <UpdateBug bug={props.bug} index={props.index} />
    </BugsProvider>
  );

  const bugsDispatch = useBugsDispatch();
  const inputName = utils.getByTestId("input_edit_name");
  const inputFixer = utils.getByTestId("input_edit_fixer");
  const inputDescription = utils.getByTestId("input_edit_description");
  const selectStatus = utils.getByTestId("select_status");
  const selectSeverity = utils.getByTestId("select_severity");
  const selectReproduceability = utils.getByTestId("select_reproduceability");
  const buttonEdit = utils.getByTestId("button_edit");

  return {
    ...utils,
    props,
    bugsDispatch,
    inputName,
    inputFixer,
    inputDescription,
    selectStatus,
    selectSeverity,
    selectReproduceability,
    buttonEdit,
  };
};

test("input name updates on change", () => {
  const { inputName } = setup();

  fireEvent.change(inputName, { target: { value: "test edit bug name" } });

  expect(inputName.value).toBe("test edit bug name");
});

test("input fixer updates on change", () => {
  const { inputFixer } = setup();

  fireEvent.change(inputFixer, { target: { value: "test edit bug fixer" } });

  expect(inputFixer.value).toBe("test edit bug fixer");
});

test("input description updates on change", () => {
  const { inputDescription } = setup();

  fireEvent.change(inputDescription, {
    target: { value: "test edit bug description" },
  });

  expect(inputDescription.value).toBe("test edit bug description");
});

test("select status changes on input", () => {
  const { selectStatus } = setup();

  fireEvent.change(selectStatus, { target: { value: "Closed" } });

  expect(selectStatus.value).toBe("Closed");
});

test("select severity changes on input", () => {
  const { selectSeverity } = setup();

  fireEvent.change(selectSeverity, { target: { value: "Major" } });

  expect(selectSeverity.value).toBe("Major");
});

test("select reproduceability changes on input", () => {
  const { selectReproduceability } = setup();

  fireEvent.change(selectReproduceability, { target: { value: "Always" } });

  expect(selectReproduceability.value).toBe("Always");
});

test("edit button calls updateBug with the correct arguments", () => {
  const {
    buttonEdit,
    inputName,
    inputFixer,
    inputDescription,
    selectReproduceability,
    selectSeverity,
    selectStatus,
    bugsDispatch,
    props,
  } = setup();

  const editedBug = {
    name: "test edit bug name",
    fixer: "test edit bug fixer",
    description: "test edit bug description",
    status: "Closed",
    severity: "Major",
    reproduceability: "Always",
  };

  fireEvent.change(inputName, { target: { value: editedBug.name } });
  fireEvent.change(inputFixer, { target: { value: editedBug.fixer } });
  fireEvent.change(inputDescription, {
    target: { value: editedBug.description },
  });
  fireEvent.change(selectStatus, { target: { value: editedBug.status } });
  fireEvent.change(selectSeverity, { target: { value: editedBug.severity } });
  fireEvent.change(selectReproduceability, {
    target: { value: editedBug.reproduceability },
  });

  fireEvent.click(buttonEdit, { button: 0 });

  expect(updateBug).toHaveBeenCalledWith(
    bugsDispatch,
    editedBug,
    props.bug._id,
    props.index
  );
});
