import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineUndo } from "react-icons/ai";
import "./PasswordGenerator.scss";

const PasswordGenerator = ({ setGeneratedPassword, setValue }) => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);

  useEffect(() => {
    if (setValue) setPassword(setValue);
  }, [setValue]);

  const generatePassword = () => {
    if (passwordLength > 30) setPasswordLength(30);
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_-+=<>?";

    let chars = lowercaseChars;
    if (includeUppercase) chars += uppercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    setPassword(newPassword);
    setGeneratedPassword(newPassword);
  };

  return (
    <div className="password-generator">
      <label className="main-label ">SECURE PASSWORD</label>
      <input
        className="password-generator__result"
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span>
        <AiOutlineUndo onClick={generatePassword} className="update-icon" />
      </span>
      <div className="password-generator__settings">
        <div>
          <label>Password Length:</label>
          <input
            className="length-input"
            type="number"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>
        <div>
          <label>Include Numbers:</label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
        </div>
        <div>
          <label>Include Symbols:</label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
        </div>
        <div>
          <label>Include Uppercase:</label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
        </div>
      </div>
    </div>
  );
};

PasswordGenerator.propTypes = {
  setGeneratedPassword: PropTypes.func.isRequired,
  setValue: PropTypes.any,
};

export default PasswordGenerator;
