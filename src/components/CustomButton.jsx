import PropTypes from 'prop-types';
const CustomButton = ({ btnType, title, handleClick, styles }) => {
    return (
        <button
            type={btnType}
            className={`rounded-[10px] px-4 font-epilogue text-[16px] font-semibold leading-[26px] text-white ${styles}`}
            onClick={handleClick}
        >
            {title}
        </button>
    );
};
CustomButton.propTypes = {
    btnType: PropTypes.oneOf(['button', 'submit', 'reset']), 
    title: PropTypes.string.isRequired,                  
    handleClick: PropTypes.func,                          
    styles: PropTypes.string,                               
};


export default CustomButton;