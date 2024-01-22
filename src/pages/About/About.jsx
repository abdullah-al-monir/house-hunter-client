import aboutImage from "../../assets/about.jpg";
const About = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Welcome to House Hunter
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              House Hunter simplifies the house rental process, connecting house
              owners and renters. It's the bridge where property owners can
              effortlessly list their houses for rent, providing detailed
              information. Renters can easily search for available houses and
              make bookings tailored to their needs.
            </p>
          </div>
          <div className="grid gap-5 row-gap-8 sm:grid-cols-2">
            <div className="bg-white border-l-4 shadow-sm border-orangeColor">
              <div className="h-full p-5 border border-l-0 rounded-r">
                <h6 className="mb-2 font-semibold leading-5">
                  Your Personal Home Search
                </h6>
                <p className="text-sm text-gray-900">
                  House Hunter offers a seamless process for renting or listing
                  properties. Find your dream home or list effortlessly with our
                  user-friendly platform.
                </p>
              </div>
            </div>
            <div className="bg-white border-l-4 shadow-sm border-orangeColor">
              <div className="h-full p-5 border border-l-0 rounded-r">
                <h6 className="mb-2 font-semibold leading-5">
                  About Renting a Home
                </h6>
                <p className="text-sm text-gray-900">
                  House Hunter offers a seamless process for renting or listing
                  properties. Find your dream home or list effortlessly with our
                  user-friendly platform.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            className="object-cover w-full h-60 rounded shadow-lg sm:h-[400px]"
            src={aboutImage}
            alt="House Hunter About Image"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
