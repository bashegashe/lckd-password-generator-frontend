import PropTypes from "prop-types";
import "./CustomButton.scss";

const CustomButton = (props) => {
  const { label, onClickEvent } = props;
  return (
    <button className="customButton" onClick={onClickEvent}>
      {label}
    </button>
  );
};

CustomButton.propTypes = {
  label: PropTypes.any.isRequired,
  onClickEvent: PropTypes.func.isRequired,
};

export default CustomButton;
