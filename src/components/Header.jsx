import axios from "axios";
import React, { useEffect, useState } from "react";

const Header = ({ onMount }) => {
  const [data, setData] = useState([]);
  const [setError] = useState(null);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection1?id=1`
        );
        setData([response.data.data]);
        if (response.data.statusCode === 200) {
          onMount();
        }
      } catch (err) {
        console.error(
          "Error fetching data:",
          err.response ? err.response.data : err.message
        );
        setError(err);
      }
    };

    fetchData();
  }, [onMount]);
  return (
    <div className="Site_header text-white">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center mx-4 pt-2"
        >
          <div className="flex justify-center items-center   gap-2">
            <a href="/"><img
              src={item.logoImage1}
              alt=""
              className="md:w-[290px] w-[160px] h-full object-cover"
            /></a>
          </div>
          <div className="flex  justify-center items-center gap-10">
            <ul className=" hidden lg:flex  justify-center items-center gap-8 Site_menu_main">
              <li className="font-Poppins font-bold text-[13px] tracking-widest uppercase cursor-pointer">
                <a href={item.navEditLink1}>{item.navlink1}</a>
              </li>
              <li className="font-Poppins font-bold text-[13px] uppercase">
                |
              </li>
              <li className="font-Poppins font-bold text-[13px] tracking-widest uppercase cursor-pointer">
                <a href={item.navEditLink2}>{item.navlink2}</a>
              </li>
              <li className="font-Poppins font-bold text-[13px] uppercase">
                |
              </li>
              <li className="font-Poppins font-bold text-[13px] tracking-widest uppercase cursor-pointer">
                <a href={item.navEditLink3}>{item.navlink3}</a>
              </li>
              <li className="font-Poppins font-bold text-[13px] uppercase">
                |
              </li>
              <li className="font-Poppins font-bold text-[13px] tracking-widest uppercase cursor-pointer">
                <a href={item.navEditLink4}>{item.navlink4}</a>
              </li>
            </ul>
            <div className="flex justify-center items-center gap-3">
              <div className="nav_btn   md:py-[8px] md:px-[20px] py-[5px] px-[12px] header_buttons">
                <span className="uppercase font-Poppins md:tracking-wider cursor-pointer font-bold md:text-[16px] text-[12px]">
                  <a href={item.buttonEditText1}>{item.buttonText1}</a>
                </span>
              </div>
              <div className="nav_btn md:py-[8px] md:px-[20px] py-[5px] px-[12px] header_buttons">
                <span className="uppercase font-Poppins md:tracking-wider cursor-pointer font-bold md:text-[16px] text-[12px]">
                  <a href={item.buttonEditText2}>{item.buttonText2}</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Header;
