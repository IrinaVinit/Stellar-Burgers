import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getUserData } from "../../services/actions/user";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { saveUserPath } from "../../services/actions/user";
import { getUser } from "../utils/data";

export const ProtectedRouteElement = ({ element }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userData } = useSelector(getUser);

  useEffect(() => {
    {
      dispatch(saveUserPath(location.pathname));
    }
  }, []);

  return userData ? element : <Navigate to="/login" replace />;
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.element,
};
