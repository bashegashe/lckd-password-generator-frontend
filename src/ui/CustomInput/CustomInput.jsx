import PropTypes from "prop-types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./CustomInput.scss";

const CustomInput = (props) => {
  const {
    label,
    type,
    placeholder,
    showButton,
    onClickEvent,
    showPassword,
    value,
    onChange,
  } = props;
  return (
    <div className="customInput">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {showButton && (
        <span onClick={onClickEvent}>
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </span>
      )}
    </div>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  showButton: PropTypes.bool,
  onClickEvent: PropTypes.func,
  showPassword: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default CustomInput;
