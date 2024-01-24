import { FaLocationCrosshairs, FaMoneyBill1, FaPhone } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";

const HouseCard = ({ house }) => {
  const { user } = useAuth();
  const {
    houseName,
    availability,
    location,
    rentPerMonth,
    bedrooms,
    bathrooms,
    city,
    contactNumber,
  } = house;
  return (
    <div>
      <div className="flex flex-col mb-12 overflow-hidden px-5 py-8 rounded-lg bg-lightColor">
        <div className="flex-shrink-0">
          <img
            className="object-cover w-full rounded-lg"
            src="https://images.rentals.ca/property-pictures/medium/lorraine-qc/583721/house-6911686.jpg"
            alt=""
          />
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <p></p>
          <div className="flex-1">
            <div className="flex gap-2">
              <button className="p-2 rounded-lg space-x-1 text-sm bg-primary text-white cursor-default">
                <p>Available from {availability} </p>
              </button>
              <button className="flex p-2 rounded-lg space-x-1 text-sm bg-primary text-white cursor-default font-semibold">
                <p>{city}</p>
              </button>
            </div>

            <div className="block mt-2 space-y-3">
              <h3 className="text-2xl font-semibold leading-none tracking-tighter text-primary">
                {houseName}
                <span className="text-lg ml-2">
                  ( {bedrooms} Bedrooms, {bathrooms} Bathrooms )
                </span>
              </h3>
              <p className="flex gap-2 items-center">
                <FaMoneyBill1 /> {rentPerMonth} bdt / month
              </p>
              <p className="flex gap-2 items-center">
                <FaPhone /> {contactNumber}
              </p>
              <p className="flex gap-2 items-center text-lg font-normal text-gray-700">
                <FaLocationCrosshairs /> {location}
              </p>
            </div>
            {user?.role !== "owner" && (
              <div className="mt-5">
                <button className="w-full py-4 font-medium text-center text-white transition duration-500 ease-in-out transform bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-primary rounded-xl ">
                  Book now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
