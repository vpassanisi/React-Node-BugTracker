import React from "react";
import { useHistory } from "react-router-dom";

import { useAuthDispatch, login } from "../Context/auth/authContext";

const Info = () => {
  const history = useHistory();
  const authDispatch = useAuthDispatch();

  return (
    <section className="w-screen max-w-full">
      <div className="mx-auto p-8 mt-10vh w-11/12 max-w-screen-md bg-oxford-blue-700 rounded">
        <h1 className="text-center mb-4 font-head text-2xl">About This App</h1>
        <p className="mb-4">
          This is an app I made to help track bugs accross your projects. Each
          bug you log has a variety of information to help you keep track of
          what needs to be fixed in each project. This app was built with Node
          and Koa for the API, and React, TailwindCSS for the front-end. You can
          find the documentation for the API here:
        </p>

        <div className="flex items-center justify-center mb-16">
          <a
            href="./docs/index.html"
            className="bg-purple-munsell rounded font-head text-xl py-2 px-8 font-medium"
          >
            API Documentation
          </a>
        </div>

        <p className="mb-4">
          The front-end looks great on desktop as well as any mobile device. An
          interesting feature that I added is that if you put another users
          email as the "fixer" for a bug, that user will see that project and
          that bug when they login. This way people can work together on
          projects and track the bugs that need to be fixed between a team of
          people.
        </p>
        <p className="mb-4">
          You can make a new account and start making new projects and they will
          be saved indefinitely, or try out all the features in a demo account
          by clicking the button bellow:
          <br />
          <small>
            In order to make a new bug you would normaly add your own email or
            the email of another user as the "fixer". The email for the demo
            account is Demo@gmail.com
          </small>
        </p>
        <div className="flex items-center justify-center">
          <button
            data-testid="button_demo_login"
            onClick={async () => {
              await login(authDispatch, {
                email: "Demo@gmail.com",
                password: "123456",
              });
              history.push("/");
            }}
            className="bg-maximum-blue font-head py-2 px-8 text-xl rounded focus:outline-none"
          >
            Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Info;
