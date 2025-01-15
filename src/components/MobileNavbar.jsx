import React, { useEffect, useState } from "react";
import {
  MdChat,
  MdLocalOffer,
  MdLocationPin,
  MdPriceChange,
} from "react-icons/md";
import axios from "axios";

const MobileNavbar = ({ onMount }) => {
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
    <div className="Mobile_menu_bottom bg-purple-700 lg:hidden shadow-lg w-full rounded-t-2xl z-[9999] fixed bottom-0 text-white py-2 px-8">
      {data.map((item, index) => (
        <ul key={index} className="flex justify-between items-center">
          <li className="flex flex-col justify-center items-center">
            <MdChat className="text-[25px] font-bold" />
            <p className="font-Poppins font-medium tracking-wide text-[12px] mt-1 uppercase">
              <a href={item.navEditLink1}>{item.navlink1}</a>
            </p>
          </li>
          <li className="flex flex-col justify-center items-center">
            <MdLocationPin className="text-[25px] font-bold" />
            <p className="font-Poppins font-medium tracking-wide text-[12px] mt-1 uppercase">
              <a href={item.navEditLink2}>{item.navlink2}</a>
            </p>
          </li>
          <li className="flex flex-col justify-center items-center">
            <MdLocalOffer className="text-[25px] font-bold" />
            <p className="font-Poppins font-medium tracking-wide text-[12px] mt-1 uppercase">
              <a href={item.navEditLink3}>{item.navlink3}</a>
            </p>
          </li>
          <li className="flex flex-col justify-center items-center">
            <MdPriceChange className="text-[25px] font-bold" />
            <p className="font-Poppins font-medium tracking-wide text-[12px] mt-1 uppercase">
              <a href={item.navEditLink4}>{item.navlink4}</a>
            </p>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default MobileNavbar;
