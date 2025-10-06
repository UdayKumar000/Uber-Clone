import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    const captain = { email, password };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/login`,
      captain
    );
    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-2"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
          alt="Uber Logo"
        />
        <form
          action=""
          onSubmit={(e) => {
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
          Join a fleet?
          <Link to="/captain-signup" className="text-blue-600">
            Register As Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          className="flex items-center justify-center bg-[#d5622d] font-semibold text-white mb-7 rounded px-4 py-3 border w-full text-lg placeholder:text-base"
          to="/login"
        >
          Sign as a User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
