import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("auth");

  useEffect(() => {
    if (!accessToken) {
      navigate("/auth");
    }
  }, [accessToken, navigate]);
};

export default PrivateRoute;
