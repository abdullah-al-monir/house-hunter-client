import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/house-hunter-logo.png";
const Footer = () => {
  const presentDate = new Date();
  const currentYear = presentDate.getFullYear();
  return (
    <div className="p-5 bg-orangeColor">
      <div className="flex justify-center items-center mt-4">
        <img className="h-[55px]" src={logo} alt="" />
        <div className="text-2xl font-extrabold uppercase text-primary">
          <span className="tracking-[6px]">ouse</span> <br />
          unter
        </div>
      </div>
      <div className="flex justify-center items-center gap-5 max-w-screen-xl mx-auto my-5">
        <hr className="border-primary border w-full hidden md:flex" />
        <div className="flex justify-between items-center gap-5 md:gap-8 lg:gap-10">
          <FaFacebookF className="size-5 md:size-6 lg:size-7 text-primary hover:text-[#03045e] cursor-pointer" />
          <FaInstagram className="size-5 md:size-6 lg:size-7 text-primary hover:text-[#03045e] cursor-pointer" />
          <FaYoutube className="size-5 md:size-6 lg:size-7 text-primary hover:text-[#03045e] cursor-pointer" />
          <FaTwitter className="size-5 md:size-6 lg:size-7 text-primary hover:text-[#03045e] cursor-pointer" />
          <FaLinkedin className="size-5 md:size-6 lg:size-7 text-primary hover:text-[#03045e] cursor-pointer" />
          <FaTiktok className="size-5 md:size-6 lg:size-7 text-primary hover:text-[#03045e] cursor-pointer" />
        </div>
        <hr className="border-primary border w-full hidden md:flex" />
      </div>

      <div className="flex justify-center items-center gap-10 max-w-screen-xl mx-auto mb-5 flex-wrap">
        <a
          href="/"
          className="font-semibold text-primary hover:text-[#03045e] text-base md:text-lg hover:underline lg:text-xl "
        >
          Legal Stuff
        </a>
        <a
          href="/"
          className="font-semibold text-primary hover:text-[#03045e] text-base md:text-lg hover:underline lg:text-xl"
        >
          Privacy policy
        </a>
        <a
          href="/"
          className="font-semibold text-primary hover:text-[#03045e] text-base md:text-lg hover:underline lg:text-xl"
        >
          Security
        </a>
        <a
          href="/"
          className="font-semibold text-primary hover:text-[#03045e] text-base md:text-lg hover:underline lg:text-xl"
        >
          Accessibility Policy
        </a>
        <a
          href="/"
          className="font-semibold text-primary hover:text-[#03045e] text-base md:text-lg hover:underline lg:text-xl"
        >
          Terms of Service
        </a>
      </div>
      <p className="text-center text-slate-100">
        Copyright © {currentYear} HouseHunter, Inc.
      </p>
    </div>
  );
};

export default Footer;
