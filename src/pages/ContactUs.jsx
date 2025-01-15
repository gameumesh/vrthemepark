import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const ContactUs = () => {
  const [data, setData] = useState([]);
  const [setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    review: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const url = process.env.REACT_APP_API_BASE_URL;

  const validateForm = () => {
    let errorMessages = {};

    // Name validation
    if (!formData.name) {
      errorMessages.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]{1,50}$/.test(formData.name)) {
      errorMessages.name =
        "Name can have max 50 characters, no special characters or numbers.";
    }

    // DOB validation
    if (!formData.dob) {
      errorMessages.dob = "Date of Birth is required.";
    } else if (!/^\d+$/.test(formData.dob.replace(/-/g, ""))) {
      errorMessages.dob = "DOB should only contain numbers.";
    }

    // Email validation
    if (!formData.email) {
      errorMessages.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errorMessages.email = "Invalid email address.";
    }

    // Review validation
    if (!formData.review) {
      errorMessages.review = "Review is required.";
    } else if (formData.review.length > 200) {
      errorMessages.review = "Review can have a maximum of 200 characters.";
    }

    // Terms acceptance validation
    if (!formData.termsAccepted) {
      errorMessages.termsAccepted = "You must accept the terms and conditions.";
    }

    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "dob") {
      // Store the date in DD-MM-YYYY format
      const formattedDate = moment(value).format("DD-MM-YYYY");
      setFormData((prevFormData) => ({
        ...prevFormData,
        dob: formattedDate,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          `${url}/VRThemePark/user/submit-contact`,
          formData
        );

        if (response.data.success) {
          setFormData({
            name: "",
            dob: "",
            email: "",
            review: "",
            termsAccepted: false,
          });
          alert(
            "Thank you! Your form has been submitted successfully and we will get back to you shortly."
          );
        } else {
          alert("error submitting review!", response.data.message);
        }
      } catch (err) {
        console.error(
          "Error submitting form:",
          err.response ? err.response.data : err.message
        );
        setError(err);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${url}/VRThemePark/user/getSection9?id=1`
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

  return data.map((item, index) => (
    <div key={index} className="text-white">
      <div className="container mx-auto">
        <div className="contact_tp_heading flex justify-center items-center border-t border-t-[#FF00B8] pt-10">
          <h3 className="md:text-[52px] text-[40px] text-center font-Poppins font-semibold">
            {item.title}
          </h3>
        </div>
        <div className="contact_tp_form_main flex flex-col lg:flex-row justify-center items-start gap-20 py-10">
          <div className="md:w-[50%] w-full">
            <form className="Contact_form" onSubmit={handleSubmit}>
              <div
                className="bg-[#B85CFF61] text-white px-4 pt-12 pb-7"
                style={{
                  boxShadow: "0px 17px 38px #00000036",
                  border: "2px solid #FFFFFF",
                  borderRadius: "49px",
                }}
              >
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col justify-start items-start">
                    <label className="font-Poppins text-[12px] md:font-medium pb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Name Here"
                      className="bg-white w-[300px] placeholder:text-[16px] rounded-r-full py-1 px-2 rounded-bl-full"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && (
                      <div className="text-red-500 text-sm">{errors.name}</div>
                    )}
                  </div>
                  <div className="flex flex-col justify-start items-start pb-1">
                    <label className="font-Poppins text-[12px] md:font-medium">
                      D.O.B
                    </label>
                    <input
                      type="date"
                      placeholder="Enter Your Date Of Birth"
                      className="bg-white placeholder:text-[16px] rounded-r-full py-1 px-2 rounded-bl-full"
                      name="dob"
                      value={
                        formData.dob
                          ? moment(formData.dob, "DD-MM-YYYY").format(
                              "YYYY-MM-DD"
                            )
                          : ""
                      }
                      onChange={handleInputChange}
                    />
                    {errors.dob && (
                      <div className="text-red-500 text-sm">{errors.dob}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start pt-3 pb-3 mb-3">
                  <label className="font-Poppins text-[12px] md:font-medium pb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Your Email Address"
                    className="bg-white w-full placeholder:text-[16px] rounded-r-full py-1 px-2 rounded-bl-full"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}
                </div>
                <div className="flex flex-col justify-start items-start pt-3">
                  <label className="font-Poppins text-[12px] md:font-medium pb-1">
                    Review
                  </label>
                  <textarea
                    placeholder="Enter Your Review Here"
                    className="bg-white h-[150px] w-full placeholder:text-[16px] rounded-r-[20px] py-1 px-2 rounded-bl-[40px]"
                    name="review"
                    value={formData.review}
                    onChange={handleInputChange}
                  />
                  {errors.review && (
                    <div className="text-red-500 text-sm">{errors.review}</div>
                  )}
                </div>
              </div>
              <div className="Bottom_form_tc pt-5 flex justify-between items-center">
                <div className="flex justify-center items-center gap-3">
                  <input
                    type="checkbox"
                    className="appearance-none w-6 h-6 border-2 border-secondary rounded-md checked:appearance-auto checked:border-secondary  focus:outline-none"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                  />

                  <p className="text-[12px] font-Poppins uppercase md:font-medium">
                    By accepting terms and conditions
                  </p>
                  {errors.termsAccepted && (
                    <div className="text-red-500 text-sm">
                      {errors.termsAccepted}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-secondary rounded-full px-7 py-2  uppercase font-Poppins font-bold tracking-widest text-[16.67px] text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="md:w-[50%] w-full md:pt-[100px]">
            <a href={item.imageEditLink}>
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default ContactUs;
