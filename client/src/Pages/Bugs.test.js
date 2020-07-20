import React from "react";
import { render } from "@testing-library/react";
import ProjectsContext from "../Context/projects/projectsContext";
import AuthContext from "../Context/auth/authContext";
import BugsContext from "../Context/bugs/bugsContext";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
