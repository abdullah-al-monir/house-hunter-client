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
  const [loading, setLoading] = useState(true);
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
      setLoading(false)
    } else {
      localStorage.removeItem("user");
      setLoading(false)
    }
  }, [user]);
  const { data: userInfo } = useQuery({
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
  
  const authInfo = { user, email, setEmail, setUser, loading };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
