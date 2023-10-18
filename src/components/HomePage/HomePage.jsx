import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCopy,
  AiOutlineCheck,
} from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import logo from "../../assets/logo.svg";
import CustomButton from "../../ui/CustomButton/CustomButton";
import CustomInput from "../../ui/CustomInput/CustomInput";
import "./HomePage.scss";
import PasswordGenerator from "../../ui/PasswordGenerator/PasswordGenerator";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("12edawdasd22dwa");
  const [activePassword, setActivePassword] = useState("");
  const [textCopied, setTextCopied] = useState(false);
  const [page, setPage] = useState("home");
  useEffect(() => {
    if (!user) {
      setUser(sessionStorage.getItem("auth"));
      navigate("/auth");
    }
  }, [user, navigate]);

  const copyText = () => {
    navigator.clipboard.writeText(activePassword);
    setTextCopied(true);
    setTimeout(() => {
      setTextCopied(false);
    }, 2000);
  };

  const testObject = [
    {
      www: "www.google.com",
      password: "1231231231awdw21e1dwad",
    },
    {
      www: "www.facebook.com",
      password: "wadawdwdgee",
    },
    {
      www: "www.twitter.com",
      password: "ggdfedawd",
    },
    {
      www: "www.snigel.com",
      password: "wda#€%#€%31231",
    },
  ];

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
              {testObject.map((item, index) => (
                <div
                  className={`homePage__stored--item ${
                    activePassword === item.password ? "active" : null
                  }`}
                  key={index}
                >
                  <p>{item.www}</p>
                  <span>
                    {activePassword === item.password ? (
                      <LiaEdit onClick={() => setPage("update")} />
                    ) : null}
                    {activePassword === item.password ? (
                      <AiOutlineEye onClick={() => setActivePassword("")} />
                    ) : (
                      <AiOutlineEyeInvisible
                        onClick={() => setActivePassword(item.password)}
                      />
                    )}
                  </span>
                </div>
              ))}
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
            <main className="homePage__form">
              <CustomInput
                label="WWW"
                type="text"
                placeholder="www.example.com"
              />
              <CustomInput
                label="USERNAME"
                type="text"
                placeholder="Username"
              />
              <PasswordGenerator />
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
            <main className="homePage__form">
              <CustomInput
                label="WWW"
                type="text"
                placeholder="www.example.com"
              />
              <CustomInput
                label="USERNAME"
                type="text"
                placeholder="Username"
              />
              <PasswordGenerator />
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
          page === "home" ? () => setPage("create") : () => setPage("home")
        }
      />
    </div>
  );
};

export default HomePage;
