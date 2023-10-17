import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem("auth")
  );

  useEffect(() => {
    setAccessToken(sessionStorage.getItem("auth"));
    if (!accessToken) {
      navigate("/auth");
    }
  }, [accessToken, navigate]);
};

export default PrivateRoute;
