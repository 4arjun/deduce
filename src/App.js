// /* eslint-disable */
// Temperorily disabling eslint to make some changes

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ContextProvider from "./context/context";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import Alertbox from "./components/alertbox/Alertbox";
import Reload from "./components/reload/Reload";
import { checkAuth } from "./auth0/http";
import { login, handleAuthentication } from "./auth0/auth0";
import Landing from "./components/Landing/Landing";
//import { API_ROOT } from "./auth0/api_config";
import FinalPage from "./components/FinalPage/FinalPage";
//import { get } from "./auth0/http";
import MainURL from "./components/main/MainURL";
import Rules from "./components/Rules/Rules";

function App() {
  const [screen, setScreen] = useState(true);


  useEffect(() => {
    if (window.innerWidth < window.innerHeight) {
      setScreen(false);
    }
  }, []);

  return (
    <ContextProvider>
        <Rules/>
      <Reload screen={screen} setScreen={setScreen} />
      <Router>
        <Alertbox />
        <Routes>
          <Route
            exact
            path="/game"
            element={
              checkAuth() ? (
                <React.Fragment>
                  <Navbar/>
                  <Main />
                </React.Fragment>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
            <Route
                exact
                path="/game/:levelParam"
                element={
                    checkAuth() ? (
                        <React.Fragment>
                            <Navbar/>
                            <MainURL />
                        </React.Fragment>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
          <Route exact path="/login" element={<Navigate to={login()} />} />
          <Route
            exact
            path="/login/callback"
            element={<Navigate to={handleAuthentication()} />}
          />
          <Route exact path="/" component={Landing} />
            <Route exact path="/final" element={<FinalPage />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}
export default App;