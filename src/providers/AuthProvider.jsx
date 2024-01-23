import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [email, setEmail] = useState(
    () => localStorage.getItem("email") || null
  );
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    if (email) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  }, [email]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  const { data: userInfo, isLoading: loading } = useQuery({
    queryKey: ["user"],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${email}`);
      return res.data;
    },
  });
  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  const authInfo = { user, email, setEmail, loading,setUser };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
