import React, { useContext } from "react";

import AuthContext from "../Context/auth/authContext";

const Info = () => {
  const authContext = useContext(AuthContext);

  const { login } = authContext;

  return (
    <div className="w-screen max-w-full">
      <div className="mx-auto p-8 mt-10vh w-90p max-w-screen-md bg-gray-200 dark:bg-gray-900 rounded border border-purple-a400">
        <div className="text-center mb-4 font-hairline text-2xl">
          About This App
        </div>
        <div className="text-indent mb-4">
          This is an app I made to help track bugs accross your projects. Each
          bug you log has a variety of information to help you keep track of
          what needs to be fixed in each project. This app was built with Node
          and Koa for the API, and React, TailwindCSS, and Material-UI for the
          front-end. You can find the documentation for the API here:
        </div>
        <a
          href="./docs/index.html"
          className="flex items-center justify-center text-xl mx-auto w-2/3 h-10 bg-cyan-400 text-white rounded hover:bg-cyan-600 transition-colors duration-300 ease-in-out shadow mb-4"
        >
          API Documentation
        </a>
        <div className="text-indent mb-4">
          The front-end looks great on desktop as well as any mobile device. An
          interesting feature that I added is that if you put another users
          email as the "fixer" for a bug, that user will see that project and
          that bug when they login. This way people can work together on
          projects and track the bugs that need to be fixed between a team of
          people.
        </div>
        <div className="text-indent mb-4">
          You can make a new account and start making new projects and they will
          be saved indefinitely, or try out all the features in a demo account
          by clicking the button bellow:
          <br />
          <small>
            In order to make a new bug you would normaly add your own email or
            the email of another user as the "fixer". The email for the demo
            account is Demo@gmail.com
          </small>
        </div>
        <button
          data-testid="button_demo_login"
          onClick={() => {
            login({
              email: "Demo@gmail.com",
              password: "123456",
            });
          }}
          className="flex items-center justify-center text-xl mx-auto w-2/3 h-10 bg-purple-400 text-white rounded hover:bg-purple-600 transition-colors duration-300 ease-in-out shadow focus:outline-none"
        >
          Demo
        </button>
      </div>
    </div>
  );
};

export default Info;
