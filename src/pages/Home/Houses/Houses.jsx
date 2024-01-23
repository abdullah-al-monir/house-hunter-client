import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Title from "../../../components/Title";
import HouseCard from "./HouseCard";
const Houses = () => {
  const axiosPublic = useAxiosPublic();
  const [houses, setHouses] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [totalRooms, setTotalRooms] = useState("");

  const [rentRange, setRentRange] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosPublic(
      `/houses?search=${search}&city=${city}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&totalRooms=${totalRooms}&rentRange=${rentRange}`
    ).then((res) => {
      setHouses(res.data);
      setLoading(false);
    });
  }, [axiosPublic, city, bedrooms, bathrooms, totalRooms, search, rentRange]);
  const cardsPerPage = 9;
  const totalSlides = Math.ceil(houses.length / cardsPerPage);
  const slides = Array.from({ length: totalSlides }, (_, index) => index);
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const handlePaginationClick = (index) => {
    if (swiper) {
      swiper.slideTo(index);
      setActiveIndex(index);
    }
  };
  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };
  const handleSearchInputChange = (event) => {
    setSearch(event.target.value);
  };
  const handleBedroomsChange = (event) => {
    console.log(event.target.value);
    setBedrooms(event.target.value);
  };
  const handleBathroomsChange = (event) => {
    console.log(event.target.value);
    setBathrooms(event.target.value);
  };
  const handleTotalRoomsChange = (event) => {
    console.log(event.target.value);
    setTotalRooms(event.target.value);
  };
  const handleCityChange = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);
  };
  const handleSelectRange = (event) => {
    const selectedRange = event.target.value;
    setRentRange(selectedRange);
  };

  return (
    <div className="my-20 max-w-screen-xl mx-auto">
      <Title
        heading={"Discover Your Dream Rental Home"}
        subHeading={"Your Next Home Awaits – Start Your Search Now!"}
      />

      <div className="mt-5  w-full flex flex-col md:flex-row flex-wrap justify-between gap-5">
        <form onSubmit={handleSearch} action="">
          <label className="text-sm mb-1 block  font-medium">
            Search by keywords
          </label>
          <div className="flex relative items-center border-slate-800 border-2 rounded-md">
            <input
              className="border-r-0 w-full  px-2 rounded-md py-1  shadow-sm focus:border-slate-800 focus:ring focus:ring-slate-800 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-secondary"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearchInputChange}
            />
            <button
              className="absolute px-2 py-1 right-0 text-white bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-primary  duration-300"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
        <div className="">
          <label className=" text-sm mb-1 block  font-medium">
            Filter by city
          </label>
          <div className="min-w-[200px]">
            <select
              className="block w-full rounded-md px-2 py-1 border-slate-800 border-2 shadow-sm focus:border-slate-800 focus:ring focus:ring-slate-800 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-secondary"
              value={city}
              onChange={handleCityChange}
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
        </div>
        <div className="">
          <label className="text-sm mb-1 block font-medium">
            Filter by rent (bdt)
          </label>
          <div className="min-w-[200px]">
            <select
              className="block w-full rounded-md px-2 py-1 border-slate-800 border-2 shadow-sm focus:border-slate-800 focus:ring focus:ring-slate-800 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-secondary"
              value={rentRange}
              onChange={handleSelectRange}
            >
              <option value="">Select</option>
              <option value="5000-10000">5,000-10,000</option>
              <option value="10000-15000">10,000-15,000</option>
              <option value="15000-20000">15,000-20,000</option>
              <option value="20000-25000">20,000-25,000</option>
              <option value="25000-30000">25,000-30,000</option>
              <option value="30000-35000">30,000-35,000</option>
              <option value="35000-40000">35,000-40,000</option>
              <option value="40000-45000">40,000-45,000</option>
              <option value="45000-50000">45,000-50,000</option>
            </select>
          </div>
        </div>
        <div className="">
          <label className=" text-sm mb-1 block  font-medium">
            Filter by rooms
          </label>
          <div className="min-w-[200px]">
            <select
              className="block w-full rounded-md px-2 py-1 border-slate-800 border-2 shadow-sm focus:border-slate-800 focus:ring focus:ring-slate-800 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-secondary"
              value={totalRooms}
              onChange={handleTotalRoomsChange}
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
        <div className="">
          <label className=" text-sm mb-1 block  font-medium">
            Filter by bedrooms
          </label>
          <div className="min-w-[200px]">
            <select
              className="block w-full rounded-md px-2 py-1 border-slate-800 border-2 shadow-sm focus:border-slate-800 focus:ring focus:ring-slate-800 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-secondary"
              value={bedrooms}
              onChange={handleBedroomsChange}
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>

        <div className="">
          <label className=" text-sm mb-1 block  font-medium">
            Filter by bathrooms
          </label>
          <div className="min-w-[200px]">
            <select
              className="block w-full rounded-md px-2 py-1 border-slate-800 border-2 shadow-sm focus:border-slate-800 focus:ring focus:ring-slate-800 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-secondary"
              value={bathrooms}
              onChange={handleBathroomsChange}
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center my-20">
          <ClipLoader className="text-slate-800" size={50} />
        </div>
      ) : (
        <>
          {houses.length === 0 ? (
            <div className="text-slate-800 text-2xl lg:text-4xl md:text-3xl font-semibold my-20 w-full">
              <h2 className="text-center">Sorry! No data found</h2>
            </div>
          ) : (
            <Swiper
              className="mySwiper"
              onSwiper={(swiperInstance) => {
                setSwiper(swiperInstance);
              }}
              onSlideChange={(swiperInstance) => {
                setActiveIndex(swiperInstance.activeIndex);
              }}
            >
              {slides.map((slideIndex) => (
                <SwiperSlide key={slideIndex}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-10">
                    {houses
                      .slice(
                        slideIndex * cardsPerPage,
                        (slideIndex + 1) * cardsPerPage
                      )
                      .map((house, idx) => (
                        <HouseCard key={idx} house={house} />
                      ))}
                  </div>
                </SwiperSlide>
              ))}
              <div className="flex justify-center mt-4">
                {slides.map((slideIndex) => (
                  <button
                    key={slideIndex}
                    className={`cursor-pointer text-lg border border-black font-bold rounded-full mx-2 py-1 px-3 ${
                      activeIndex === slideIndex
                        ? "bg-slate-800 text-white"
                        : "bg-slate-200"
                    }`}
                    onClick={() => handlePaginationClick(slideIndex)}
                  >
                    {slideIndex + 1}
                  </button>
                ))}
              </div>
            </Swiper>
          )}
        </>
      )}
    </div>
  );
};

export default Houses;
