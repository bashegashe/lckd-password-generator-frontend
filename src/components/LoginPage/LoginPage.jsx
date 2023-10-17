import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import logo from "../../assets/logo.svg";
import "./LoginPage.scss";

const LoginPage = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const togglePage = () => {
    setCurrentPage((prev) => (prev === "login" ? "signup" : "login"));
  };
  return (
    <div className="login">
      <button className="login__signup-btn" onClick={togglePage}>
        {currentPage === "login" ? "SIGN UP" : "LOGIN"}
      </button>
      <div className="login__logo">
        <img src={logo} alt="logo" />
        <h1>LCKD</h1>
        <h3>
          KEEPING YOUR
          <br />
          PASSWORDS SAFE
        </h3>
      </div>
      <div className="login__form">
        <div className="login__form--input">
          <label>USERNAME</label>
          <input type="text" placeholder="Username" />
        </div>
        <div className="login__form--input">
          <label>PASSWORD</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={showPassword ? "Password" : "••••••••"}
          />
          <span onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
        </div>
        <button>{currentPage === "login" ? "LET ME IN" : "SIGN UP"}</button>
      </div>
    </div>
  );
};

export default LoginPage;
