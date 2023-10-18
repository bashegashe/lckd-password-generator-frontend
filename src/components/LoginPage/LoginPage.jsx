import { useState } from "react";
import logo from "../../assets/logo.svg";
import "./LoginPage.scss";
import CustomInput from "../../ui/CustomInput/CustomInput";
import CustomButton from "../../ui/CustomButton/CustomButton";

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
        <CustomInput
          label="USERNAME"
          type="text"
          placeholder="Username"
          showButton={false}
          onClickEvent={null}
        />
        <CustomInput
          label="PASSWORD"
          type={showPassword ? "text" : "password"}
          placeholder={showPassword ? "Password" : "••••••••"}
          showButton={true}
          onClickEvent={() => setShowPassword((prev) => !prev)}
          showPassword={showPassword}
        />
        <CustomButton
          label={currentPage === "login" ? "LET ME IN" : "SIGN UP"}
          onClickEvent={() => {}}
        />
      </div>
    </div>
  );
};

export default LoginPage;
