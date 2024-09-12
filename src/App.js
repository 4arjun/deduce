// /* eslint-disable */
// Temperorily disabling eslint to make some changes

// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import ContextProvider from "./context/context";
// import Navbar from "./components/navbar/Navbar";
// import Main from "./components/main/Main";
// import Alertbox from "./components/alertbox/Alertbox";
// import Reload from "./components/reload/Reload";
// import { checkAuth } from "./auth0/http";
// import { login, handleAuthentication } from "./auth0/auth0";
// import Landing from "./components/Landing/Landing";
// //import { API_ROOT } from "./auth0/api_config";
// import FinalPage from "./components/FinalPage/FinalPage";
// //import { get } from "./auth0/http";
// import MainURL from "./components/main/MainURL";
// import Rules from "./components/Rules/Rules";

// function App() {
//   const [screen, setScreen] = useState(true);

//   useEffect(() => {
//     if (window.innerWidth < window.innerHeight) {
//       setScreen(false);
//     }
//   }, []);

//   return (
//     <ContextProvider>
//         <Rules/>
//       <Reload screen={screen} setScreen={setScreen} />
//       <Router>
//         <Alertbox />
//         <Routes>
//           <Route
//             path="/game"
//             element={
//               checkAuth() ? (
//                 <React.Fragment>
//                   <Navbar/>
//                   <Main />
//                 </React.Fragment>
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//             <Route
//                 path="/game/:levelParam"
//                 element={
//                     checkAuth() ? (
//                         <React.Fragment>
//                             <Navbar/>
//                             <MainURL />
//                         </React.Fragment>
//                     ) : (
//                         <Navigate to="/login" />
//                     )
//                 }
//             />
//           <Route path="/login" element={<Navigate to={login()} />} />
//           <Route
//             path="/login/callback"
//             element={<Navigate to={handleAuthentication()} />}
//           />
//           <Route path="/" element={< Landing />} />
//             <Route path="/final" element={<FinalPage />} />
//         </Routes>
//       </Router>
//     </ContextProvider>
//   );
// }
// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ContextProvider from "./context/context";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import Alertbox from "./components/alertbox/Alertbox";
import Reload from "./components/reload/Reload";
import Landing from "./components/Landing/Landing";
//import { API_ROOT } from "./auth0/api_config";
import FinalPage from "./components/FinalPage/FinalPage";
//import { get } from "./auth0/http";
import MainURL from "./components/main/MainURL";
import Rules from "./components/Rules/Rules";
import ProtectedRoute from "./components/ProtectedRoute";
import { ApiState } from "./context/api/apiState";
import { UserState } from "./context/user/userState";

function App() {
  const [screen, setScreen] = useState(true);
  useEffect(() => {
    if (window.innerWidth < window.innerHeight) {
      setScreen(false);
    }
  }, []);
  return (
    <div>
      <ContextProvider>
        <ApiState>
          <UserState>
            <Rules />
            <Reload screen={screen} setScreen={setScreen} />
            <BrowserRouter>
              <Alertbox />
              <Routes>
                <Route
                  path="/game"
                  element={
                    <ProtectedRoute>
                      <>
                        <Navbar />
                        <Main />
                      </>
                    </ProtectedRoute>
                  }
                ></Route>

                <Route
                  path="/game/:levelParam"
                  element={
                    <ProtectedRoute>
                      <>
                        <Navbar />
                        <MainURL />
                      </>
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Landing />
                    </ProtectedRoute>
                  }
                ></Route>

                <Route
                  path="/final"
                  element={
                    <ProtectedRoute>
                      <FinalPage />
                    </ProtectedRoute>
                  }
                ></Route>

                <Route path="*" element={<Navigate to="/" replace={true} />} />
              </Routes>
            </BrowserRouter>
          </UserState>
        </ApiState>
      </ContextProvider>
    </div>
  );
}

export default App;
