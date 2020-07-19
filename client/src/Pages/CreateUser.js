import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";

import AuthContext from "../Context/auth/authContext";

const CreateUser = () => {
  const authContext = useContext(AuthContext);

  const { createUser } = authContext;

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event, item) => {
    const obj = { ...newUser, [item]: event.target.value };

    setNewUser(obj);
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-screen-sm p-8 w-90p mt-10vh border border-purple-a400 bg-gray-200 dark:bg-gray-900 rounded">
        <div className="text-center font-hairline text-4xl">Create User</div>
        <div className="mb-4">
          <TextField
            inputProps={{
              "data-testid": "input_name",
            }}
            variant="standard"
            label="Name"
            color="primary"
            type="text"
            name="name"
            autoComplete="on"
            fullWidth={true}
            onChange={(event) => handleChange(event, "name")}
          />
        </div>
        <div className="mb-4">
          <TextField
            inputProps={{
              "data-testid": "input_email",
            }}
            variant="standard"
            label="Email"
            color="primary"
            type="email"
            name="email"
            autoComplete="on"
            fullWidth={true}
            onChange={(event) => handleChange(event, "email")}
          />
        </div>
        <div className="mb-8">
          <TextField
            inputProps={{
              "data-testid": "input_password",
            }}
            variant="standard"
            label="Password"
            color="primary"
            type="text"
            name="password"
            autoComplete="on"
            fullWidth={true}
            onChange={(event) => handleChange(event, "password")}
          />
        </div>
        <button
          data-testid="button_create_user"
          className="w-full h-12 rounded bg-cyan-400 hover:bg-cyan-600 transition-colors duration-300 ease-in-out text-white focus:outline-none shadow"
          onClick={() => createUser(newUser)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
