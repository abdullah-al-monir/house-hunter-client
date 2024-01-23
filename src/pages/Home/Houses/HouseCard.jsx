const HouseCard = ({ house }) => {
  const { houseName, availability, location, rentPerMonth } = house;
  return (
    <div>
      <div className="flex flex-col mb-12 overflow-hidden cursor-pointer">
        <a href="/blog-post">
          <div className="flex-shrink-0">
            <img
              className="object-cover w-full rounded-lg"
              src="https://images.rentals.ca/property-pictures/medium/lorraine-qc/583721/house-6911686.jpg"
              alt=""
            />
          </div>
        </a>
        <div className="flex flex-col justify-between flex-1">
          <p></p>
          <div className="flex-1">
            <a href="/blog-post">
              <div className="flex pt-6 space-x-1 text-sm text-gray-500">
                <time> {availability} </time>
                <span aria-hidden="true"> · </span>
                <span> </span>
              </div>
            </a>
            <div href="#" className="block mt-2 space-y-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
                {houseName}
              </h3>
              <p>{rentPerMonth} bdt / month</p>
              <p className="text-lg font-normal text-gray-500">{location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
