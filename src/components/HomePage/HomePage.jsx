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
import "./HomePage.scss";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("testTijeb2323");
  const [activePassword, setActivePassword] = useState("");
  const [textCopied, setTextCopied] = useState(false);
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
                {activePassword === item.password ? <LiaEdit /> : null}
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
          <div className="homePage__plain-sight">
            <label>PLAIN SIGHT</label>
            <div>{activePassword}</div>
            <span className={textCopied ? "active" : ""} onClick={copyText}>
              {textCopied ? <AiOutlineCheck /> : <AiOutlineCopy />}
            </span>
          </div>
        )}
      </div>
      <CustomButton label="NEW LCKD" />
    </div>
  );
};

export default HomePage;
