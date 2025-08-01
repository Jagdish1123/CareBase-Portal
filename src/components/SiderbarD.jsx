import PropTypes from 'prop-types';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sun } from "../assets";
import { navlinksDoctor } from '../constants';
import { IconHeartHandshake } from "@tabler/icons-react";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`h-[48px] w-[48px] rounded-[10px] ${isActive === name && "bg-[#2c2f32]"} flex items-center justify-center ${!disabled && "cursor-pointer"} ${styles}`}
    onClick={disabled ? null : handleClick}
  >
    <img
      src={imgUrl}
      alt={name}
      className={`h-6 w-6 ${isActive !== name && "grayscale"}`}
    />
  </div>
);

const DoctorSidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("doctor-dashboard");

  return (
    <div className="sticky top-5 flex h-[93vh] flex-col items-center justify-between">
      <Link to="/doctor-dashboard">
        <div className="rounded-[10px] bg-[#2c2f32] p-2">
          <IconHeartHandshake size={40} color="#1ec070" />
        </div>
      </Link>

      <div className="mt-12 flex w-[76px] flex-1 flex-col items-center justify-between rounded-[20px] bg-[#1c1c24] py-4">
        <div className="flex flex-col items-center justify-center gap-3">
          {navlinksDoctor.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                setIsActive(link.name);
                navigate(link.link);
              }}
            />
          ))}
        </div>
        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} name="sun-icon" disabled handleClick={() => {}} />
      </div>
    </div>
  );
};

Icon.propTypes = {
  styles: PropTypes.string,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  isActive: PropTypes.string,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

DoctorSidebar.propTypes = {
  navlinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      imgUrl: PropTypes.string,
    })
  ).isRequired,
};

export default DoctorSidebar;