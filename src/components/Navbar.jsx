import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { useStateContext } from "../context";
import CustomButton from "./CustomButton.jsx";
import { navlinks } from "../constants";
import { IconHeartHandshake, IconSearch } from "@tabler/icons-react";
import menu from "../assets/menu.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { authenticated, login, user, logout } = usePrivy();
  const { fetchUsers, users, records, fetchUserRecords, currentUser } = useStateContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

  const fetchUserInfo = useCallback(async () => {
    if (!user) return;
    try {
      await fetchUsers();
      const existingUser = users.find(
        (u) => u.createdBy === user.email.address
      );
      if (existingUser) {
        await fetchUserRecords(user.email.address);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, [user, fetchUsers, users, fetchUserRecords]);

  useEffect(() => {
    if (authenticated && user) {
      fetchUserInfo();
    }
  }, [authenticated, user, fetchUserInfo]);

  useEffect(() => {
    if (searchQuery.length > 0 && records) {
      const results = records.filter((record) =>
        record.recordName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecords(results);
    } else {
      setFilteredRecords([]);
    }
  }, [searchQuery, records]);

  const handleLoginLogout = useCallback(() => {
    if (authenticated) {
      logout();
    } else {
      login().then(() => {
        if (user) {
          fetchUserInfo();
        }
      });
    }
  }, [authenticated, login, logout, user, fetchUserInfo]);

  return (
    <div className="mb-[35px] flex flex-col-reverse justify-between gap-6 md:flex-row">
      <div className="relative flex h-[52px] max-w-[458px] flex-row rounded-[100px] bg-[#1c1c24] py-2 pl-4 pr-2 lg:flex-1">
        <input
          type="text"
          placeholder="Search for records"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex w-full bg-transparent font-epilogue text-[14px] font-normal text-white outline-none placeholder:text-[#4b5264]"
        />
        <div className="flex h-full w-[72px] cursor-pointer items-center justify-center rounded-[20px] bg-[#4acd8d]">
          <IconSearch size={15} color="white" />
        </div>
        {filteredRecords.length > 0 && searchQuery.length > 0 && (
          <div className="absolute top-[60px] left-0 right-0 z-20 flex flex-col rounded-lg bg-[#1c1c24] shadow-xl max-h-60 overflow-y-auto">
            {filteredRecords.map((record) => (
              <p
                key={record.recordName}
                className="cursor-pointer p-4 text-white hover:bg-[#3a3a43]"
                onClick={() => {
                  navigate(`/medical-records/${record.recordName}`);
                  setSearchQuery("");
                }}
              >
                {record.recordName}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="hidden flex-row justify-end gap-2 sm:flex">
        <CustomButton
          btnType="button"
          title={authenticated ? "Log Out" : "Log In"}
          styles={authenticated ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={handleLoginLogout}
        />
      </div>

      <div className="relative flex items-center justify-between sm:hidden">
        <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[10px] bg-[#2c2f32]">
          <IconHeartHandshake size={40} color="#1ec070" className="p-2" />
        </div>
        <img
          src={menu}
          alt="menu"
          className="h-[34px] w-[34px] cursor-pointer object-contain"
          onClick={() => setToggleDrawer(!toggleDrawer)}
        />
        <div
          className={`absolute left-0 right-0 top-[60px] z-10 bg-[#1c1c24] py-4 shadow-secondary ${!toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"} transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && "bg-[#3a3a43]"}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`h-[24px] w-[24px] object-contain ${isActive === link.name ? "grayscale-0" : "grayscale"}`}
                />
                <p className={`ml-[20px] font-epilogue text-[14px] font-semibold ${isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="mx-4 flex">
            <CustomButton
              btnType="button"
              title={authenticated ? "Log Out" : "Log In"}
              styles={authenticated ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={handleLoginLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
