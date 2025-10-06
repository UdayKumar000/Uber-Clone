import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token);

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Logout failed:", error.message);
        console.error("Full error:", error.response?.data || error);
      }
    };

    logout();
  }, [navigate, token]);

  return <div>Logging out...</div>;
};

export default UserLogout;
