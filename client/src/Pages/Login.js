import React from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import {
  useAuthState,
  useAuthDispatch,
  login,
} from "../Context/auth/AuthContext";

const Login = () => {
  const authDispatch = useAuthDispatch();
  const { isAuthenticated } = useAuthState();
  const history = useHistory();

  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (event, item) => {
    const newCredentials = { ...credentials, [item]: event.target.value };

    setCredentials(newCredentials);
  };

  React.useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [isAuthenticated, history]);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-screen-sm p-8 w-90p mt-10vh border border-purple-a400 bg-gray-200 dark:bg-gray-900 rounded">
        <div className="text-center font-hairline text-4xl">Login</div>
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
          className="w-full h-12 rounded bg-cyan-400 hover:bg-cyan-600 transition-colors duration-300 ease-in-out text-white focus:outline-none shadow"
          data-testid="button_login"
          onClick={() => login(authDispatch, credentials)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
