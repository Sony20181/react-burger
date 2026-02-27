import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Routes, Route, useLocation } from "react-router-dom";
import styles from "./app.module.css";
import { fetchIngredients } from "../../services/slices/ingredientsSlice";
import { getUser, refreshToken } from "../../services/slices/authSlice";

import AppHeader from "../header/header";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import { HomePage } from "../../pages/home/home";
import ProfilePage from "../../pages/profile/profile";
import ProfileForm from "../../pages/profile/components/profile-form/profile-form";
import OrdersHistory from "../../pages/profile/components/orders-history/orders-history";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import IngredientDetailsPage from "../../pages/ingredient-details/ingredient-details";

import { Modal } from "../modalWindow/modal";
import { IngredientDetails } from "../modalWindow/ingredientDetails";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const background = location.state?.background;

  function openOrderModal() {
    setIsOrderModalOpen(true);
  }

  function closeOrderModal() {
    setIsOrderModalOpen(false);
  }

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !user) {
      dispatch((getUser as any)(accessToken)).catch(() => {
        const refreshTokenValue = localStorage.getItem("refreshToken");
        if (refreshTokenValue) {
          dispatch((refreshToken as any)(refreshTokenValue)).then(() => {
            dispatch(getUser());
          });
        }
      });
    }
  }, [dispatch, user]);

  return (
    <div className={`${styles.app}`}>
      <AppHeader />
      <main>
        <Routes location={background || location}>
          {/* Публичные маршруты */}
          <Route
            path="/"
            element={
              <HomePage
                isOrderModalOpen={isOrderModalOpen}
                closeOrderModal={closeOrderModal}
                openOrderModal={openOrderModal}
              />
            }
          />
          <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />

          {/* Маршруты только для неавторизованных */}
          <Route
            path="/login"
            element={
              <ProtectedRouteElement anonymous={true}>
                <LoginPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteElement anonymous={true}>
                <RegisterPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElement anonymous={true}>
                <ForgotPasswordPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteElement anonymous={true}>
                <ResetPasswordPage />
              </ProtectedRouteElement>
            }
          />

          {/* Защищённые маршруты */}
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement anonymous={false}>
                <ProfilePage />
              </ProtectedRouteElement>
            }
          >
            <Route index element={<ProfileForm />} />
            <Route path="orders" element={<OrdersHistory />} />
          </Route>

          {/*<Route path="*" element={<NotFoundPage />} />*/}
        </Routes>
        {/*для модального окна/ страницы ингредиентов */}
        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal
                  title="Детали ингредиента"
                  onClose={() => window.history.back()}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
