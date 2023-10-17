import PropTypes from "prop-types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./CustomInput.scss";

const CustomInput = (props) => {
  const { label, type, placeholder, showButton, onClickEvent, showPassword } =
    props;
  return (
    <div className="customInput">
      <label>{label}</label>
      <input type={type} placeholder={placeholder} />
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
};

export default CustomInput;
