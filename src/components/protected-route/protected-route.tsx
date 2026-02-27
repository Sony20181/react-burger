import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { ReactNode, FC } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  anonymous?: boolean;
};

export const ProtectedRouteElement: FC<ProtectedRouteProps> = ({
  children,
  anonymous = false,
}) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && isAuthenticated) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};
