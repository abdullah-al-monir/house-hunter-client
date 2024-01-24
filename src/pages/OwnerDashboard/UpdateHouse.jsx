import { useLoaderData } from "react-router-dom";
import { BsCalendar3 } from "react-icons/bs";
import { AiOutlineCloseSquare } from "react-icons/ai";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Title from "../../components/Title";
import { enqueueSnackbar } from "notistack";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const dp_hosting_key = import.meta.env.VITE_DP_HOSTING_KEY;
const dp_hosting_api = `https://api.imgbb.com/1/upload?key=${dp_hosting_key}`;
const UpdateHouse = () => {
  const {
    _id,
    houseName,
    city,
    ownerName,
    ownerEmail,
    contactNumber,
    rentPerMonth,
    availability,
    description,
    location,
    bedrooms,
    bathrooms,
    image,
    homeSizeSqFt,
  } = useLoaderData();
  console.log(homeSizeSqFt, availability);
  const [selectedCity, setSelectedCity] = useState(city);
  const [dateValue, onChange] = useState(availability);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
  const handleUpdateHouse = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const houseName = formData.get("houseName");
    const rentPerMonth = parseInt(formData.get("rentPerMonth"));
    const availability = formData.get("availability");
    const description = formData.get("description");
    const number = formData.get("number");
    const location = formData.get("location");
    const bedrooms = parseInt(formData.get("bedrooms"));
    const homeSizeSqFt = parseInt(formData.get("homeSizeSqFt"));
    const bathrooms = parseInt(formData.get("bathrooms"));
    const inputValue = formData.get("number");

    if (isNaN(rentPerMonth)) {
      return enqueueSnackbar("Please enter a number in Rent per month field", {
        variant: "error",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }

    const phoneNumberRegex = /^\+88\d{11}$/;
    const isValid = phoneNumberRegex.test(inputValue);
    if (!isValid) {
      setIsValidPhoneNumber(false);
      setErrorMessage(
        "Please enter a valid Bangladeshi phone number starting with +88."
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 1500);

      return;
    }
    const imageInfo = { image: formData.get("photo") };
    console.log(imageInfo);
    if (imageInfo.image.name === "") {
      const houseInfo = {
        houseName,
        city: selectedCity,
        ownerName,
        ownerEmail,
        contactNumber: number,
        rentPerMonth,
        availability,
        description,
        location,
        bedrooms,
        bathrooms,
        totalRooms: bedrooms + bathrooms,
        image,
        homeSizeSqFt,
      };
      axiosPublic
        .put(`/house/${_id}`, houseInfo)
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            enqueueSnackbar("House info updated successfully", {
              variant: "success",
              autoHideDuration: 1000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            });
            event.target.reset();
            navigate("/dashboard/manageHouses");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axiosPublic
        .post(dp_hosting_api, imageInfo, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success) {
            const image = res.data.data.display_url;
            const houseInfo = {
              houseName,
              city: selectedCity,
              ownerName,
              ownerEmail,
              contactNumber: number,
              rentPerMonth,
              availability,
              description,
              location,
              bedrooms,
              bathrooms,
              totalRooms: bedrooms + bathrooms,
              image,
              homeSizeSqFt,
            };
            axiosPublic
              .put(`/houses/${_id}`, houseInfo)
              .then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                  enqueueSnackbar("House info updated successfully", {
                    variant: "success",
                    autoHideDuration: 1000,
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                  });
                  event.target.reset();
                  navigate("/dashboard/manageHouses");
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <Title
        heading={"Update the House info"}
        subHeading={"You can update any info using this form"}
      />
      <form onSubmit={handleUpdateHouse}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700">House Name</label>
            <input
              type="text"
              name="houseName"
              defaultValue={houseName}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-black   focus:border-secondary focus:ring-secondary focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder="Enter the house name"
              required
            />
          </div>
          <div>
            <label className="text-gray-700">Posted by</label>
            <input
              type="text"
              defaultValue={ownerName}
              name="ownerName"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-black   focus:border-secondary focus:ring-secondary focus:ring-opacity-40  focus:outline-none focus:ring"
              disabled
            />
          </div>
          <div>
            <label className="text-gray-700">City</label>
            <select
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-black   focus:border-secondary focus:ring-secondary focus:ring-opacity-40  focus:outline-none focus:ring"
              name="city"
              value={selectedCity}
              onChange={handleCityChange}
              required
            >
              <option value="">Select</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Barisal">Barisal</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Khulna">Khulna</option>
              <option value="Cox's Bazar">Cox's Bazar</option>
            </select>
          </div>

          <div>
            <label className="text-gray-700">House Rent (per month)</label>
            <input
              type="text"
              name="rentPerMonth"
              defaultValue={rentPerMonth}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-black   focus:border-secondary focus:ring-secondary focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder="Enter the house rent per month"
              required
            />
          </div>
          <div>
            <label className="text-gray-700">
              Phone Number (Only Bangladeshi Number)
            </label>
            <input
              type="text"
              name="number"
              defaultValue={contactNumber}
              placeholder="+88017XXXXXXXX"
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${
                isValidPhoneNumber ? "border-black" : "border-red-500"
              }  focus:border-secondary focus:ring-secondary focus:ring-opacity-40  focus:outline-none focus:ring`}
            />

            {!isValidPhoneNumber && errorMessage && (
              <p className="text-red-500 mt-1">{errorMessage}</p>
            )}
          </div>
          <div>
            <label className="text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={location}
              placeholder="Enter the house location"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-black  focus:border-secondary focus:ring-secondary focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-gray-700">
              House Area Size (in Square Feet)
            </label>
            <input
              type="text"
              name="homeSizeSqFt"
              defaultValue={homeSizeSqFt}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-black  focus:border-secondary focus:ring-secondary focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder="Write the house area in square feet"
            />
          </div>
          <div>
            <label className="text-gray-700">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              defaultValue={bedrooms}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-black  focus:border-secondary focus:ring-secondary focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder="Number of bedrooms"
            />
          </div>
          <div>
            <label className="text-gray-700">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              defaultValue={bathrooms}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-black  focus:border-secondary focus:ring-secondary focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder="Number of bathrooms"
            />
          </div>

          <div>
            <label className="text-gray-700 mr-2">Available From</label>
            <DatePicker
              className="block w-full my-2 text-gray-700 bg-white   focus:border-secondary focus:ring-secondary focus:ring-opacity-40  focus:outline-none focus:ring"
              name="availability"
              defaultValue={availability}
              calendarIcon={
                <BsCalendar3 className="text-secondary text-xl my-1" />
              }
              clearIcon={
                <AiOutlineCloseSquare className="text-secondary text-2xl my-1" />
              }
              yearPlaceholder="yyyy"
              monthPlaceholder="mm"
              dayPlaceholder="dd"
              minDate={new Date()}
              format="y-MM-dd"
              onChange={onChange}
              value={dateValue}
              required
            />
          </div>
          <div>
            <label className="text-gray-700">House Description</label>
            <input
              type="text"
              name="description"
              defaultValue={description}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-black  focus:border-secondary focus:ring-secondary focus:ring-opacity-40  focus:outline-none focus:ring"
              placeholder="Write the house description"
            />
          </div>
          <div className="">
            <label className="text-gray-700">Picture of the house</label>
            <div className="cursor-pointer p-2 border-dashed border-2 border-gray-300 bg-secondary text-white relative mt-2 w-full">
              <input
                type="file"
                name="photo"
                className="opacity-0 absolute inset-0 w-full px-4 py-2"
              />
              Upload photo
            </div>
          </div>
        </div>

        <div className=" mt-6">
          <input
            type="submit"
            value="Update"
            className="px-8 py-2.5 w-full leading-5 text-white transition-colors duration-300 font-semibold transform bg-secondary rounded-md hover:bg-primary focus:outline-none focus:bg-secondary"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateHouse;
