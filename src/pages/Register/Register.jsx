import { useRef } from "react";
import logo from "../../assets/house-hunter-logo.png";
import { enqueueSnackbar } from "notistack";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const dp_hosting_key = import.meta.env.VITE_DP_HOSTING_KEY;
const dp_hosting_api = `https://api.imgbb.com/1/upload?key=${dp_hosting_key}`;
const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { setEmail, setUser } = useAuth();
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const numberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const role = roleRef.current.value;
    const number = numberRef.current.value;
    const enteredEmail = emailRef.current.value.toLowerCase();
    const password = passwordRef.current.value;

    const formData = new FormData(e.target);

    const imageFile = { image: formData.get("photo") };
    if (!imageFile) {
      return enqueueSnackbar("Please select a photo", {
        variant: "error",
        autoHideDuration: 1000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
    axiosPublic
      .post(dp_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          const dp = res.data.data.display_url;
          if (
            enteredEmail === "" ||
            password === "" ||
            role === "" ||
            number === "" ||
            name === "" ||
            imageFile == ""
          ) {
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
            .post("/users", {
              name,
              role,
              number,
              email: enteredEmail,
              password,
              dp,
            })
            .then((res) => {
              setEmail(enteredEmail);
              const { token } = res.data;
              localStorage.setItem("token", token);
              enqueueSnackbar("Registration successful!", {
                variant: "success",
                autoHideDuration: 1000,
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
              });
              nameRef.current.value = "";
              roleRef.current.value = "";
              numberRef.current.value = "";
              emailRef.current.value = "";
              passwordRef.current.value = "";
              navigate("/");
              setUser({
                name,
                role,
                number,
                email: enteredEmail,
                password,
                dp,
              });
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                enqueueSnackbar("User with this email already exists", {
                  variant: "error",
                  autoHideDuration: 1000,
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                });
              } else {
                console.error("Registration failed:", error);
              }
            });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-16 lg:py-16">
        <div className="justify-center mx-auto text-left align-bottom transition-all transform bg-white rounded-lg sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="rounded-xl w-full">
            <div className="w-full px-6 py-5">
              <div className="flex gap-5 justify-between items-center">
                <div className="mt-3 text-left sm:mt-5">
                  <div className="inline-flex items-center w-full">
                    <h3 className="text-lg font-bold text-primary leading-6 lg:text-5xl">
                      Register
                    </h3>
                  </div>
                  <div className="mt-4 text-base text-gray-500">
                    <p>Register to rent house</p>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <img className="h-[55px]" src={logo} alt="" />
                  <div className="text-2xl font-extrabold uppercase text-primary">
                    <span className="tracking-[6px]">ouse</span> <br />
                    unter
                  </div>
                </div>
              </div>
              <form onSubmit={handleRegister} className="mt-6 space-y-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="mb-2">
                    <label className="text-primary">Full Name</label>
                    <input
                      type="text"
                      ref={nameRef}
                      className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 mt-2"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="md:w-[223px] w-full">
                    <label className="text-primary">Role</label>
                    <select
                      ref={roleRef}
                      className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 mt-2"
                    >
                      <option value="">Select Role</option>
                      <option value="owner">House Owner</option>
                      <option value="renter">House Renter</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <div>
                    <label className="text-primary">Phone Number</label>
                    <input
                      type="text"
                      ref={numberRef}
                      className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 mt-2"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="text-primary">Email</label>
                    <input
                      type="text"
                      ref={emailRef}
                      className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 mt-2"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
                  <div className="w-full md:w-1/2">
                    <label className="text-primary">Profile Picture</label>
                    <div className="cursor-pointer p-2 border-dashed border-2 border-gray-300 bg-primary text-white relative mt-2 w-full">
                      <input
                        name="photo"
                        type="file"
                        className="opacity-0 absolute inset-0 w-full"
                      />
                      Upload photo
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="text-primary">Password</label>
                    <input
                      type="password"
                      ref={passwordRef}
                      className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 mt-2"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    placeholder="Your password"
                    className="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                  />
                  <label className="block ml-2 text-sm text-neutral-600">
                    Accept terms & conditions
                  </label>
                </div>
                <div className="flex flex-col mt-4 lg:space-y-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full py-4 font-medium text-center text-white transition duration-500 ease-in-out transform bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-secondary hover:to-primary rounded-xl "
                  >
                    Register
                  </button>
                  {/* <a
                    href="#"
                    type="button"
                    className="inline-flex justify-center py-4 text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm"
                  >
                    Forgot your Password?{" "}
                  </a> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
