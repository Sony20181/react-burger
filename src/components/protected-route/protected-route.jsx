import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUser, refreshToken } from "../../services/slices/authSlice";

function ProtectedRouteElement({ children, anonymous = false }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { emailSent } = useSelector((state) => state.passwordReset);

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setIsChecking(false);
        return;
      }
      if (accessToken && !user) {
        try {
          await dispatch(getUser()).unwrap();
        } catch (err) {
          const refreshTokenValue = localStorage.getItem("refreshToken");
          if (refreshTokenValue) {
            try {
              await dispatch(refreshToken(refreshTokenValue)).unwrap();
              await dispatch(getUser()).unwrap();
            } catch (refreshErr) {
              console.error("Не удалось обновить токен:", refreshErr);
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
            }
          }
        }
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [dispatch, user]);

  if (isChecking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <p className="text text_type_main-medium">Загрузка...</p>
      </div>
    );
  }

  if (location.pathname === "/reset-password" && !emailSent && !anonymous) {
    return <Navigate to="/forgot-password" replace />;
  }

  if (anonymous) {
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

ProtectedRouteElement.propTypes = {
  children: PropTypes.node.isRequired,
  anonymous: PropTypes.bool,
};

export default ProtectedRouteElement;
