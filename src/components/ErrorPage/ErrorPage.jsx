import { Link } from "react-router-dom";

import "./ErrorPage.scss";

const ErrorPage = () => {
  return (
    <div className="error">
      <h1>404</h1>
      <h3>PAGE NOT FOUND</h3>
      <Link to="/">GO BACK HOME</Link>
    </div>
  );
};

export default ErrorPage;
