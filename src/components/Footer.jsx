import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaYoutube,
  FaWifi,
} from "react-icons/fa";
import backicon from "../assets/backicon.png";
import footerImg from "../assets/footer.png";
import sharebottom from "../assets/share_bottom.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = ({ onMount }) => {
  const [data, setData] = useState([]);
  const [footerData, setFooterData] = useState([]);
  const [setError] = useState(null);
  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection9?id=1`
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

    const fetchFooterData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection10?id=1`
        );
        setFooterData([response.data.data]);
      } catch (err) {
        console.error(
          "Error fetching data:",
          err.response ? err.response.data : err.message
        );
      }
    };

    fetchData();
    fetchFooterData();
  }, [onMount]);

  const [mediaUrls, setMediaUrls] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://partoftrading.com/VRThemePark/user/instagramFeed")
      .then((response) => response.json())
      .then((data) => {
        // Extract media URLs and randomly select 8
        const urls = data.map((item) => item.media_url);
        const shuffledUrls = urls.sort(() => 0.5 - Math.random()); // Shuffle the URLs
        setMediaUrls(shuffledUrls.slice(0, 8)); // Get the top 8 items
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className=" text-white  "
      style={{
        backgroundImage: `url(${backicon})`,
      }}
    >
      <div
        style={{
          backgroundImage: `url(${footerImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100%",
          backgroundPosition: "center",
        }}
      >
        {data.map((item, index) => (
          <div key={index} className="container mx-auto">
            <div className="insta_feed_main py-10">
              <div className="top_heading_insta flex justify-center items-center ">
                <div className=" flex gap-3 justify-center items-center xl:ml-[410px] 2xl:ml-[440px]">
                  <img src={item.socialMediaImage} alt="" />
                  <div className="flex flex-col ">
                    <p className="text-[8px] font-Poppins font-semibold tracking-wide">
                      {item.socialMediaHeading1}
                    </p>
                    <h5 className="md:text-[16px] text-[14px] font-Poppins font-bold tracking-wide">
                      {item.socialMediaHeading2}
                    </h5>
                  </div>
                </div>
                <div className=" 2xl:ml-80 xl:ml-72">
                  <button className="rounded-md p-3 text-[14px] font-Poppins font-semibold text-white bg-blue-400 uppercase tracking-wider">
                    <a href={item.contactUsButton.buttonLink}>
                      {item.contactUsButton.buttonText}
                    </a>
                  </button>
                </div>
              </div>
              <div className="insta_feed_main_vr_tp">
                <div className="inner_insta_fees_vr_tp">
                  <div className="Insta_feed_img_box lg:flex grid grid-cols-2    place-items-center justify-center items-center place-content-center gap-0 pt-10">
                    {mediaUrls.map((url, index) => (
                      <a
                        key={index}
                        href="https://www.instagram.com/vrthemeparkind" // Replace with your Instagram account URL
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          key={index}
                          src={url}
                          className="md:w-[270px] md:h-[270px] w-full h-full object-cover"
                          alt="Instagram Post"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-2">
                <div>
                  <a href="" target="_black">
                    <img src={item.contactUslinkImages.img1} alt="" />
                  </a>
                </div>
                <div>
                  <a href="" target="_black">
                    <img src={item.contactUslinkImages.img2} alt="" />
                  </a>
                </div>
                <div>
                  <a href="" target="_black">
                    <img src={item.contactUslinkImages.img4} alt="" />
                  </a>
                </div>
                <div>
                  <a href="" target="_black">
                    <img src={item.contactUslinkImages.img3} alt="" />
                  </a>
                </div>
              </div>
            </div>

            <div className="we_are_footer_heading mt-5">
              <h3 className="uppercase font-Poppins font-bold tracking-widest text-[20px] text-center">
                {item.featuredTitle}
              </h3>
            </div>
            <div className="news_logos flex flex-col justify-center items-center gap-5 py-12">
              <div className="flex flex-wrap justify-center items-center gap-9 mb-10">
                <img src={item.contactUsFeaturedImages.img1} alt="" />
                <img src={item.contactUsFeaturedImages.img2} alt="" />
                <img src={item.contactUsFeaturedImages.img6} alt="" />
              </div>
              <div className="flex flex-wrap justify-center items-center gap-9">
                <img src={item.contactUsFeaturedImages.img3} alt="" />
                <img src={item.contactUsFeaturedImages.img4} alt="" />
                <img src={item.contactUsFeaturedImages.img5} alt="" />
              </div>
            </div>
            {footerData.map((element, index) => (
              <div
                key={index}
                className="menu_footer_main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-20 gap-10 border-t border-t-[#FF00B8] pt-20 "
              >
                <ul className="fooetr_menu_inner one flex flex-col justify-center items-center gap-3">
                  <li className="font-Poppins text-gray-400 text-center tracking-wider">
                    <a href="">{element.navLink1}</a>
                  </li>
                  <li className="font-Poppins text-gray-400 text-center tracking-wider">
                    <a href="">{element.navLink2}</a>
                  </li>
                  <li className="font-Poppins text-gray-400 text-center tracking-wider">
                    <a href="">{element.navLink3}</a>
                  </li>
                  <li className="font-Poppins text-gray-400 text-center tracking-wider">
                    <a href="">{element.navLink4}</a>
                  </li>
                  <li className="font-Poppins text-gray-400 text-center tracking-wider">
                    <a href="">{element.navLink5}</a>
                  </li>
                </ul>
                <div className="Footer_menu_logo flex flex-col justify-center items-center gap-2">
                  <a href="">
                    <img
                      src={element.image}
                      alt=""
                      className="h-full w-[170px] object-content"
                    />
                  </a>
                  <p className="font-Poppins text-[14px] text-gray-400 text-center pt-5 ">
                    {element.body}
                  </p>
                </div>
                <ul className="fooetr_menu_inner  flex flex-col justify-center items-center gap-3">
                  <li className="font-Poppins text-gray-400 text-center tracking-wider">
                    <a href="">{element.navLink6}</a>
                  </li>
                  <li className="font-Poppins text-gray-400 text-center tracking-wider">
                    <a href="">{element.navLink7}</a>
                  </li>
                  <li className="font-Poppins text-gray-400 text-center tracking-wider">
                    <a href="">{element.navLink8}</a>
                  </li>
                  <li className="font-Poppins text-gray-400 text-center tracking-wider">
                    <a href="">{element.navLink9}</a>
                  </li>
                  <li className="font-Poppins text-gray-400 text-center tracking-wider">
                    <a href=""> {element.navLink10}</a>
                  </li>
                </ul>
              </div>
            ))}
            <ul className="Footer_social_icons flex justify-center items-center gap-8 pt-10  pb-20">
              <li>
                <a href="">
                  <FaFacebookF className="text-[20px] font-bold" />
                </a>
              </li>
              <li>
                <a href="">
                  <FaInstagram className="text-[20px] font-bold" />
                </a>
              </li>
              <li>
                <a href="">
                  <FaTwitter className="text-[20px] font-bold" />
                </a>
              </li>
              <li>
                <a href="">
                  <FaPinterestP className="text-[20px] font-bold" />
                </a>
              </li>
              <li>
                <a href="">
                  <FaYoutube className="text-[20px] font-bold" />
                </a>
              </li>
              <li>
                <a href="">
                  <FaInstagram className="text-[20px] font-bold" />
                </a>
              </li>

              <li>
                <a href="">
                  <FaWifi className="text-[20px] font-bold" />
                </a>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="social_icons">
        <span
          className={`close-btn ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <img src={sharebottom} alt="" />
        </span>

        <div className={`media-icons ${isOpen ? "open" : ""}`}>
          <a
            href="https://www.instagram.com/vrthemeparkind"
            target="black"
            style={{ background: "#0e76a8" }}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" style={{ background: "#ff0000" }}>
            <FontAwesomeIcon icon={faYoutube} />
          </a>

          <a href="#" style={{ background: "#4267b2" }}>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#" style={{ background: "#1da1f2" }}>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
