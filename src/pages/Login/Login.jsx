import { useRef } from "react";
import logo from "../../assets/house-hunter-logo.png";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="justify-center mx-auto text-left align-bottom transition-all transform bg-white rounded-lg sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
            <div className="w-full px-6 py-3">
              <div>
                <div className="mt-3 text-left sm:mt-5">
                  <div className="inline-flex items-center w-full">
                    <h3 className="text-lg font-bold text-primary leading-6 lg:text-5xl">
                      Login
                    </h3>
                  </div>
                  <div className="mt-4 text-base text-gray-500">
                    <p>Login to see current offers</p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleLogin} className="mt-6 space-y-2">
                <div>
                  <label className="sr-only">Email</label>
                  <input
                    type="email"
                    ref={emailRef}
                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="sr-only">Password</label>
                  <input
                    type="password"
                    ref={passwordRef}
                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex flex-col mt-4 lg:space-y-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full py-4 font-medium text-center text-white transition duration-500 ease-in-out transform bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-primary rounded-xl "
                  >
                    Login
                  </button>
                  <a
                    href="#"
                    type="button"
                    className="inline-flex justify-center py-4 text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm"
                  >
                    Forgot your Password?{" "}
                  </a>
                </div>
              </form>
            </div>
            <div className="order-first hidden w-full lg:block">
              <img
                className="object-cover h-full bg-cover rounded-l-lg mx-auto"
                src={logo}
                alt=""
              />
              <h2
                className="text-center font-bold text-2xl uppercase mt-5"
                style={{
                  background: `linear-gradient(90deg, #023047, #219ebc)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                House Hunter
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
