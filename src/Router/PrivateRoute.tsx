import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import type { TRole } from "@/types";
import type { JSX } from "react/jsx-runtime";

interface Props {
  roles: TRole[];
  children: JSX.Element;
}

const PrivateRoute = ({  children }: Props) => {
  const role = useAppSelector((s) => s.auth.role);

  if (!role) {
    return <Navigate to="/auth/login" replace />;
  }



  return children;
};

export default PrivateRoute;
