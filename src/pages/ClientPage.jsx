import React, { useEffect, useState } from "react";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import top2 from "../assets/top2.png";

const ClientPage = ({ onMount }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // Enable autoslide
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // For screens smaller than 1024px
        settings: {
          slidesToShow: 3, // Show 3 slides on medium screens
        },
      },
      {
        breakpoint: 768, // For screens smaller than 768px
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2, // Show 2 slides on small screens
        },
      },
      {
        breakpoint: 480, // For screens smaller than 480px
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
          // Show 1 slide on very small screens
        },
      },
    ],
  };

  const [data, setData] = useState([]);
  const [images, setImages] = useState();
  const [setError] = useState(null);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection7?id=1`
        );
        setData([response.data.data]);
        setImages(response.data.data.clientSectionImages);
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
    <div
      className="happy_cliets_main text-white py-10"
      // style={{ backgroundImage: `url(${backicon})` }}
    >
      <div
        style={{
          backgroundImage: `url(${top2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          height: "100%",
          backgroundPosition: "center",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="container mx-auto happy_client_top_main"
          >
            <div className="heading_client_page flex flex-col justify-center items-center border-t border-t-[#FF00B8]  ">
              <span className="tracking-wider md:text-[36.82px] text-[30px] leading-5 font-bold uppercase font-Poppins pt-10">
                {item.heading1}
              </span>
              <h2 className="md:text-[52px] text-[40px] font-semibold font-Poppins capitalize pt-4 ">
                {item.heading2}
              </h2>
            </div>
            <div className="slider_our_clients_page pt-16">
              <Slider {...settings} className="">
                {images.map((img) => (
                  <div key={img.id}>
                    <img src={img.image} alt="" className="" />
                  </div>
                ))}
              </Slider>
            </div>
            <p className="client_page_slider_para md:text-[16.67px] text-[15px] md:font-medium font-Poppins  pt-16">
              {item.body}
            </p>
          </div>
        ))}
        <AboutUs />
        <ContactUs />
      </div>
    </div>
  );
};

export default ClientPage;
