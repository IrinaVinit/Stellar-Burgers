import AppHeader from "../app-header/AppHeader";
import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ProtectedRouteElement } from "../protected-route/ProtectedRouteElement";
import { OnlyForAuthElement } from "../only-for-auth/OnlyForAuthElement";
import { useDispatch } from "react-redux";
import Main from "../main/Main";
import Register from "../../pages/register";
import Login from "../../pages/login";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import NotFound404 from "../../pages/not-found";
import ProfilePage from "../../pages/profile";
import { Modal } from "../modal/Modal";
import Feed from "../feed/Feed";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";
import { checkAuth } from "../../services/actions/user";
import { getIngredients } from "../../services/actions/ingredients";
import { getCookie } from "../../components/utils/cookie";

export default function App() {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookie = getCookie("accessToken");
  console.log(cookie);
  console.log(localStorage.getItem("refreshToken"));

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkAuth());
  }, [dispatch]);

  const handleCloseModal = (evt) => {
    evt.stopPropagation();
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route
          path="/register"
          element={<OnlyForAuthElement element={<Register />} />}
        />
        <Route
          path="/login"
          element={<OnlyForAuthElement element={<Login />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyForAuthElement element={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyForAuthElement element={<ResetPassword />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route
          path="/feed/"
          element={<ProtectedRouteElement element={<Feed />} />}
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal closePopup={handleCloseModal} title="Детали ингредиента">
                <IngredientDetails bac />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}
