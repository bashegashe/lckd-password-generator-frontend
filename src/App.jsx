import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";

import "./App.scss";
import LoginPage from "./components/LoginPage/LoginPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";

const App = () => {
  return (
    <div className="app">
      <div className="app__container">
        <Routes>
          <Route
            path="/"
            exact
            element={
              <PrivateRoute>
                <h1>home</h1>
              </PrivateRoute>
            }
          />
          <Route path="/auth" exact element={<LoginPage />} />
          <Route path="/*" exact element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
