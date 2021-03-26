import React from "react";
import { useHistory } from "react-router-dom";

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
    <section>
      <div className="mx-auto max-w-screen-sm p-8 w-11/12 mt-10vh bg-oxford-blue-700 rounded">
        <div className="font-head text-center text-4xl">Login</div>
        <div className="relative my-8">
          <input
            className="w-full px-3 py-1 focus:outline-none bg-transparent"
            data-testid="input_email"
            type="text"
            name="email"
            placeholder="Email. . ."
            onChange={(event) => handleChange(event, "email")}
          />
          <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
          <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
        </div>
        <div className="relative mb-8">
          <input
            className="w-full px-3 py-1 focus:outline-none bg-transparent"
            data-testid="input_password"
            type="text"
            name="password"
            placeholder="Password. . . "
            onChange={(event) => handleChange(event, "password")}
          />
          <div className="absolute z-10 bottom-0 left-0 right-0 mx-auto w-0 underline transition-width duration-500 ease-in-out border-b-2 border-purple-munsell" />
          <div className="absolute bottom-0 left-0 right-0 w-full border-b-2 border-dark-gray-700" />
        </div>
        <button
          className="block w-1/2 py-1 mx-auto bg-maximum-blue rounded focus:outline-none"
          data-testid="button_login"
          onClick={() => login(authDispatch, credentials)}
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default Login;
