// hooks/useEscapeRedirect.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EscapeRedirect = (path = "/dashboard") => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        navigate(path);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, path]);
};

export default EscapeRedirect;
