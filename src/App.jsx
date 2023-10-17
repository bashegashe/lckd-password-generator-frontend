import { Routes, Route } from "react-router-dom";

import "./App.scss";
import LoginPage from "./components/LoginPage/LoginPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import HomePage from "./components/HomePage/HomePage";

const App = () => {
  return (
    <div className="app">
      <div className="app__container">
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/auth" exact element={<LoginPage />} />
          <Route path="/*" exact element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
