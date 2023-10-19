import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCopy,
  AiOutlineCheck,
} from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import { BsTrash3 } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import logo from "../../assets/logo.svg";
import CustomButton from "../../ui/CustomButton/CustomButton";
import CustomInput from "../../ui/CustomInput/CustomInput";
import "./HomePage.scss";
import PasswordGenerator from "../../ui/PasswordGenerator/PasswordGenerator";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("auth"));
  const [activePassword, setActivePassword] = useState("");
  const [textCopied, setTextCopied] = useState(false);
  const [page, setPage] = useState("home");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [savePassword, setSavePassword] = useState({
    domain: "",
    username: "",
    password: generatedPassword,
  });
  const [updatePassword, setUpdatePassword] = useState({
    domain: "",
    username: "",
    newPassword: generatedPassword,
  });
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    if (!user) {
      setUser(localStorage.getItem("auth"));
      navigate("/auth");
    }
    if (user) {
      getAllPasswords();
    }
  }, [user, navigate]);

  const copyText = () => {
    navigator.clipboard.writeText(activePassword);
    setTextCopied(true);
    setTimeout(() => {
      setTextCopied(false);
    }, 2000);
  };

  const editUserBtn = (domain, username, password) => {
    setPage("update");
    setUpdatePassword({
      domain: domain,
      username: username,
      newPassword: password,
    });
    setActivePassword("");
  };

  useEffect(() => {
    if (generatedPassword) {
      setSavePassword({ ...savePassword, password: generatedPassword });
      setUpdatePassword({ ...updatePassword, newPassword: generatedPassword });
    }
  }, [generatedPassword]);

  const saveNewPassword = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/password`,
        savePassword,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      if (response.status === 200) {
        setActivePassword("");
        await getAllPasswords();
        setPage("home");
        alert("Password saved!");
        setSavePassword({
          domain: "",
          username: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error.response.data.error);
      alert(`${error.response.data.error}!`);
    }
  };

  const getAllPasswords = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/password`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      if (response.status === 200) {
        setPasswords(response.data.domains);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const updatePasswordBtn = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/password`,
        updatePassword,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      if (response.status === 200) {
        await getAllPasswords();
        setPage("home");
        alert("Password updated!");
      }
    } catch (error) {
      alert(`${error.response.data.error}!`);
    }
  };

  const deletePassword = async (domain) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/password/${domain}`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      if (response.status === 200) {
        await getAllPasswords();
        setActivePassword("");
        alert("Password deleted!");
      }
    } catch (error) {
      alert(`${error.response.data.error}!`);
    }
  };

  return (
    <div className="homePage">
      <header>
        <img src={logo} alt="logo" />
        <h2>LCKD</h2>
      </header>
      <div className="homePage__main--container">
        {page === "home" && (
          <>
            <main className="homePage__stored">
              <label>STORED PASSWORDS</label>
              {passwords.length > 0 ? (
                passwords?.map((item, index) => (
                  <div
                    className={`homePage__stored--item ${
                      activePassword === item.password ? "active" : null
                    }`}
                    key={index}
                  >
                    <p>{item.domain}</p>
                    <span>
                      {activePassword === item.password ? (
                        <>
                          <BsTrash3
                            onClick={() => deletePassword(item.domain)}
                          />
                          <LiaEdit
                            onClick={() =>
                              editUserBtn(
                                item.domain,
                                item.username,
                                item.password
                              )
                            }
                          />
                        </>
                      ) : null}
                      {activePassword === item.password ? (
                        <AiOutlineEye onClick={() => setActivePassword("")} />
                      ) : (
                        <AiOutlineEyeInvisible
                          onClick={() => {
                            setActivePassword(item.password);
                          }}
                        />
                      )}
                    </span>
                  </div>
                ))
              ) : (
                <p>Time to save ur first password</p>
              )}
            </main>
            {activePassword && (
              <>
                <br />
                <br />
                <div className="homePage__plain-sight">
                  <label>PLAIN SIGHT</label>
                  <div>{activePassword}</div>
                  <span
                    className={textCopied ? "active" : ""}
                    onClick={copyText}
                  >
                    {textCopied ? <AiOutlineCheck /> : <AiOutlineCopy />}
                  </span>
                </div>
              </>
            )}
          </>
        )}
        {page === "create" && (
          <>
            <h2>
              NEW SECURE
              <br />
              CREDENTIALS
            </h2>
            <p className="update__go-back" onClick={() => setPage("home")}>
              <BiExit />
              Go back
            </p>
            <main className="homePage__form">
              <CustomInput
                label="WWW"
                type="text"
                placeholder="www.example.com"
                value={savePassword.domain}
                onChange={(e) =>
                  setSavePassword({ ...savePassword, domain: e.target.value })
                }
              />
              <CustomInput
                label="USERNAME"
                type="text"
                placeholder="Username"
                value={savePassword.username}
                onChange={(e) =>
                  setSavePassword({ ...savePassword, username: e.target.value })
                }
              />
              <PasswordGenerator setGeneratedPassword={setGeneratedPassword} />
            </main>
          </>
        )}
        {page === "update" && (
          <>
            <h2>
              EDIT YOUR
              <br />
              CREDENTIALS
            </h2>
            <p className="update__go-back" onClick={() => setPage("home")}>
              <BiExit />
              Go back
            </p>
            <main className="homePage__form">
              <CustomInput
                label="WWW"
                type="text"
                placeholder="www.example.com"
                value={updatePassword.domain}
                onChange={(e) =>
                  setUpdatePassword({
                    ...updatePassword,
                    domain: e.target.value,
                  })
                }
              />
              <CustomInput
                label="USERNAME"
                type="text"
                placeholder="Username"
                value={updatePassword.username}
                onChange={(e) =>
                  setUpdatePassword({
                    ...updatePassword,
                    username: e.target.value,
                  })
                }
              />
              <PasswordGenerator
                setGeneratedPassword={setGeneratedPassword}
                setValue={updatePassword.newPassword}
              />
            </main>
          </>
        )}
      </div>
      <CustomButton
        label={
          page === "home"
            ? "NEW LCKD"
            : page === "create"
            ? "CREATE LCKD"
            : page === "update" && "UPDATE LCKD"
        }
        onClickEvent={
          page === "home"
            ? () => setPage("create")
            : page === "create"
            ? saveNewPassword
            : page === "update" && updatePasswordBtn
        }
      />
    </div>
  );
};

export default HomePage;
