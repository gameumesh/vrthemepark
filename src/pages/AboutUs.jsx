import axios from "axios";
import React, { useEffect, useState } from "react";

const AboutUs = () => {
  const [data, setData] = useState([]);
  const [setError] = useState(null);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection8?id=1`
        );
        setData([response.data.data]);
      } catch (err) {
        console.error(
          "Error fetching data:",
          err.response ? err.response.data : err.message
        );
        setError(err);
      
      }
    };

    fetchData();
  }, []);
  return (
    <div className="About_tp_main text-white pt-10 pb-20">
      {data.map((item, index) => (
        <div key={index} className="container mx-auto">
          <div className="about_tp_heading flex flex-col justify-center items-center gap-2 pt-10 border-t border-t-[#FF00B8]">
            <h4 className="md:text-[36.78px] text-[30px] tracking-wider uppercase font-Poppins font-bold">
              {item.heading1}
            </h4>
            <h2 className="md:text-[52px] text-[40px] uppercase font-Poppins font-semibold">
              {item.heading2}
            </h2>
          </div>
          <div className="abt_tp_img_bottom flex flex-col lg:flex-row justify-center items-start gap-10 pt-10">
            <div className="lg:w-[50%] w-full">
              <img src={item.image} alt="" />
            </div>
            <div className="lg:w-[50%] w-full">
              <p className="md:text-[16.67px] text-[15px] md:font-medium  font-Poppins">
                {item.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
