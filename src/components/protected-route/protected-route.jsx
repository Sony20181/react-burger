import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function ProtectedRouteElement({ children, anonymous = false }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && isAuthenticated) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

ProtectedRouteElement.propTypes = {
  children: PropTypes.node.isRequired,
  anonymous: PropTypes.bool,
};

export default ProtectedRouteElement;
