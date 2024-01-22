import { FaAngleRight } from "react-icons/fa6";
import contactImage from "../../assets/contact.jpg";
const Contact = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded shadow-sm lg:flex-row sm:mx-auto">
        <div className="relative lg:w-1/2">
          <img
            src={contactImage}
            alt="House Hunter Contact Image"
            className="object-cover w-full lg:absolute h-80 lg:h-full"
          />
          <svg
            className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
            viewBox="0 0 20 104"
            fill="currentColor"
          >
            <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
          </svg>
        </div>
        <div className="flex flex-col justify-center p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Contact Us
            </p>
          </div>
          <h5 className="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
            Let's Connect
          </h5>
          <p className="mb-5 text-gray-800">
            Have any questions or need assistance with House Hunter? Reach out
            to us! Our team is ready to help you with any inquiries about
            property listings, rentals, or using our platform.
          </p>
          <div className="flex items-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-primary py-2 px-4 rounded-lg duration-300 text-white mr-5"
            >
              Contact Now
            </button>
            <a
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Learn More
              <FaAngleRight className="text-md" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
