import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./LoginPage.scss";
import CustomInput from "../../ui/CustomInput/CustomInput";
import CustomButton from "../../ui/CustomButton/CustomButton";
import instance from "../../../axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [postData, setPostData] = useState({
    username: "",
    password: "",
  });

  const togglePage = () => {
    setCurrentPage((prev) => (prev === "login" ? "signup" : "login"));
  };

  const registerFunction = async () => {
    try {
      const response = await instance.post(
        `${instance.getUri()}/register`,
        postData
      );
      if (response.status === 200) {
        // alert(`User ${response.data.message}!`);
        setCurrentPage("login");
      }
    } catch (error) {
      // alert(`${error.response.data.message}!`);
    }
  };

  const loginUser = async () => {
    try {
      const response = await instance.post(
        `${instance.getUri()}/login`,
        postData
      );
      if (response.status === 200) {
        localStorage.setItem("auth", response.data.token);
        navigate("/");
      }
    } catch (error) {
      // alert(`${error.response.data.message}!`);
    }
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
          value={postData.username}
          onChange={(e) =>
            setPostData({ ...postData, username: e.target.value })
          }
        />
        <CustomInput
          label="PASSWORD"
          type={showPassword ? "text" : "password"}
          placeholder={showPassword ? "Password" : "••••••••"}
          showButton={true}
          onClickEvent={() => setShowPassword((prev) => !prev)}
          showPassword={showPassword}
          value={postData.password}
          onChange={(e) =>
            setPostData({ ...postData, password: e.target.value })
          }
        />
        <CustomButton
          label={currentPage === "login" ? "LET ME IN" : "SIGN UP"}
          onClickEvent={currentPage === "login" ? loginUser : registerFunction}
        />
      </div>
    </div>
  );
};

export default LoginPage;
