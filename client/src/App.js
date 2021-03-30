import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import Loader from "./Layout/Loader";
import Bugs from "./Pages/Bugs";
import Login from "./Pages/Login";
import Info from "./Pages/Info";
import CreateUser from "./Pages/CreateUser";
import Alert from "./Layout/Alert";

import { AuthProvider } from "./Context/auth/authContext";
import { BugsProvider } from "./Context/bugs/bugsContext";
import { ProjectsProvider } from "./Context/projects/projectsContext";

import "./index.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProjectsProvider>
          <BugsProvider>
            <Navbar />
            <Loader />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/bugs" component={Bugs} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/create" component={CreateUser} />
              <Route exact path="/info" component={Info} />
              <Route path="*" component={NotFound} />
            </Switch>
            <Alert />
          </BugsProvider>
        </ProjectsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
