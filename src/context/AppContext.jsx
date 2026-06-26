import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserdata] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth", {
        withCredentials: true,
      });
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

const getUserData = async () => {
  try {
    const { data } = await axios.get(
      backendUrl + "/api/user/data",
      {
        withCredentials: true,
      }
    );

    console.log("USER DATA API RESPONSE:", data);

    data.success
      ? setUserdata(data.userData)
      : toast.error(data.message);

  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserdata,
    getUserData,
    getAuthState,
  };

  useEffect(() => {
  console.log("Context userData changed:", userData);
}, [userData]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};


// 3. Export a custom hook to use the context (Vite is okay with this!)
export function useApp() {
  return useContext(AppContext);
}