import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Navbar from "./Layout/Navbar";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import Loader from "./Layout/Loader";
import Bugs from "./Pages/Bugs";
import Login from "./Pages/Login";
import Info from "./Pages/Info";
import CreateUser from "./Pages/CreateUser";
import Alert from "./Layout/Alert";

import { AuthProvider } from "./Context/auth/AuthContext";
import { BugsProvider } from "./Context/bugs/BugsContext";
import { ProjectsProvider } from "./Context/projects/ProjectsContext";
import { DarkModeProvider } from "./Context/darkMode/darkModeContext";

import "./css/tailwind.css";

const darkTheme = createMuiTheme({
  palette: {
    action: {
      active: "rgba(0, 0, 0, 1)",
    },
    type: "dark",
    primary: {
      main: "#26c6da",
    },
    secondary: {
      main: "#d500f9",
    },
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#26c6da",
    },
    secondary: {
      main: "#d500f9",
    },
  },
});

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <ProjectsProvider>
          <BugsProvider>
            <DarkModeProvider>
              <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <Navbar setIsDark={setIsDark} />
                <Loader />
                <Alert />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/bugs" component={Bugs} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/create" component={CreateUser} />
                  <Route exact path="/info" component={Info} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </ThemeProvider>
            </DarkModeProvider>
          </BugsProvider>
        </ProjectsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
