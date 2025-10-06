import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");
  const { user, setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = { gmail: email, password };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/login`,
      userData
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="../src/assets/images/Uber-Logo.png"
          alt="Uber Logo"
        />
        <form
          action=""
          onSubmit={(e) => {
            setUserData({ email, password });
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-3 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="Enter your email"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-3 rounded px-4 py-3 border w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            placeholder="Enter your password"
          />
          <button className="bg-[#111] font-semibold text-white mb-3 rounded px-4 py-3 border w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          New Here?
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          className="flex items-center justify-center bg-[#10b461] font-semibold text-white mb-7 rounded px-4 py-3 border w-full text-lg placeholder:text-base"
          to="/captain-login"
        >
          Sign as a Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
