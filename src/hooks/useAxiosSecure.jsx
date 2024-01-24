import axios from "axios";
const axiosSecure = axios.create({
  baseURL: "house-hunter-server-wheat-three.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
