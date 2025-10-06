import React, { useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token, navigate]);

  if (!token) {
    return null; // prevent rendering children until redirect
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
