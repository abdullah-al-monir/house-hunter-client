import { useRef } from "react";
import logo from "../../assets/house-hunter-logo.png";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const axiosPublic = useAxiosPublic();
  const { setEmail, setUser } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(enteredEmail, password);
    if (enteredEmail === "" || password === "") {
      return enqueueSnackbar("Please fill all the field", {
        variant: "error",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
    axiosPublic
      .post("/login", { email: enteredEmail, password })
      .then(async (res) => {
        setEmail(enteredEmail);

        const { token, user } = await res.data;
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        enqueueSnackbar("User logged in successfully", {
          variant: "success",
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        emailRef.current.value = "";
        passwordRef.current.value = "";
        navigate("/");
      });
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
                  <label className="text-primary">Email</label>
                  <input
                    type="email"
                    ref={emailRef}
                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 mt-2"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="text-primary">Password</label>
                  <input
                    type="password"
                    ref={passwordRef}
                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 mt-2"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="flex flex-col mt-4 lg:space-y-2">
                  <a
                    href="#"
                    type="button"
                    className="inline-flex justify-center  text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm"
                  >
                    Forgot your Password?{" "}
                  </a>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full py-4 font-medium text-center text-white transition duration-500 ease-in-out transform bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-primary rounded-xl "
                  >
                    Login
                  </button>

                  <p className="inline-flex justify-center text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm py-5">
                    Don't have account?{" "}
                    <Link
                      to="/register"
                      className="text-primary font-semibold ml-1"
                    >
                      Register
                    </Link>
                  </p>
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
