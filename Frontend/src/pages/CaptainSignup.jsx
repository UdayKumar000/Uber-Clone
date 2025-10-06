import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [vehicalColor, setVehicalColor] = useState("");
  const [vehicalPlate, setVehicalPlate] = useState("");
  const [vehicalCapacity, setVehicalCapacity] = useState("");
  const [vechicalType, setVechicalType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
      vehicle: {
        color: vehicalColor,
        plate: vehicalPlate,
        capacity: vehicalCapacity,
        vehicleType: vechicalType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/register`,
      newCaptain
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicalColor("");
    setVehicalPlate("");
    setVehicalCapacity("");
    setVechicalType("");
  };
  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
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

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>

          <div className="flex gap-4 mb-4">
            <input
              required
              value={vehicalColor}
              onChange={(e) => {
                setVehicalColor(e.target.value);
              }}
              className="bg-[#eeeeee] rounded px-4 py-3 border w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
            />

            <input
              required
              value={vehicalPlate}
              onChange={(e) => {
                setVehicalPlate(e.target.value);
              }}
              className="bg-[#eeeeee] rounded px-4 py-3 border w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
            />
          </div>

          <div className="flex gap-4 mb-6">
            <input
              required
              value={vehicalCapacity}
              onChange={(e) => {
                setVehicalCapacity(e.target.value);
              }}
              className="bg-[#eeeeee] rounded px-4 py-3 border w-1/2 text-lg placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
              min="1"
            />

            <select
              required
              value={vechicalType}
              onChange={(e) => {
                setVechicalType(e.target.value);
              }}
              className="bg-[#eeeeee] rounded px-4 py-3 border w-1/2 text-lg"
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Moto</option>
            </select>
          </div>

          <button className="bg-[#111] font-semibold text-white mb-3 rounded px-4 py-3 border w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Already have account?
          <Link to="/captain-login" className="text-blue-600">
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

export default CaptainSignup;
