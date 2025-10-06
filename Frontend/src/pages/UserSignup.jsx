import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [userData, setUserData] = useState("");

  const { user, setUser } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: { firstname: firstName, lastname: lastName },
      gmail: email,
      password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/login");
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
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
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your Name</h3>

          <div className="flex gap-4 mb-6">
            <input
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="bg-[#eeeeee] rounded px-4 py-3 border w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="First name"
            />

            <input
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-[#eeeeee] rounded px-4 py-3 border w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="Last name"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-3 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="Enter your email"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-3 border w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            placeholder="Enter your password"
          />
          <button className="bg-[#111] font-semibold text-white mb-3 rounded px-4 py-3 border w-full text-lg placeholder:text-base">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have account?
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight text-center text-gray-500">
          By continuing, you agree to calls, including by autodialer, WhatsApp,
          or texts from Uber and its affiliates.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
