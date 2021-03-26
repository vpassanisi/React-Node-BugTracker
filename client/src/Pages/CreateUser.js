import React from "react";
import { useHistory } from "react-router-dom";

import {
  useAuthState,
  useAuthDispatch,
  createUser,
} from "../Context/auth/AuthContext";

const CreateUser = () => {
  const history = useHistory();

  const authDispatch = useAuthDispatch();
  const { isAuthenticated } = useAuthState();

  const [newUser, setNewUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event, item) => {
    const obj = { ...newUser, [item]: event.target.value };
    setNewUser(obj);
  };
  React.useEffect(() => {
    if (isAuthenticated) history.push("/");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-screen-sm p-8 w-11/12 mt-10vh bg-oxford-blue-700 rounded">
        <div className="font-head text-center text-4xl">Create User</div>
        <div className="relative my-8">
          <input
            data-testid="input_name"
            className="w-full px-3 py-1 focus:outline-none bg-transparent"
            placeholder="Name. . ."
            type="text"
            name="name"
            onChange={(event) => handleChange(event, "name")}
          />
          <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
          <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
        </div>
        <div className="relative my-8">
          <input
            data-testid="input_email"
            className="w-full px-3 py-1 focus:outline-none bg-transparent"
            placeholder="Email. . ."
            type="text"
            name="email"
            onChange={(event) => handleChange(event, "email")}
          />
          <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
          <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
        </div>
        <div className="relative my-8">
          <input
            data-testid="input_password"
            className="w-full px-3 py-1 focus:outline-none bg-transparent"
            placeholder="Password. . ."
            type="text"
            name="password"
            onChange={(event) => handleChange(event, "password")}
          />
          <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
          <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
        </div>
        <button
          data-testid="button_create_user"
          className="block w-1/2 py-1 mx-auto bg-maximum-blue rounded focus:outline-none"
          onClick={() => createUser(authDispatch, newUser)}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
