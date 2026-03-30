import { FC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { OrderInfoDetails } from "../../../components/orders-feed/order-info-details/order-info-details";
import styles from "./order-info.module.css";
import {
  connectFeed,
  disconnectFeed,
} from "../../../services/actions/feedActions";
import { useParams } from "react-router-dom";
import {
  connectProfileOrders,
  disconnectProfileOrders,
} from "../../../services/actions/profileOrdersActions";

export const OrderInfoPage: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { orders: feedOrders, status: feedStatus } = useAppSelector(
    (state) => state.feed,
  );
  const { orders: profileOrders, status: profileStatus } = useAppSelector(
    (state) => state.profileOrders,
  );

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const isProfileOrder = window.location.pathname.includes("/profile/orders");

  const [hasError, setHasError] = useState(false);
  const currentStatus = isProfileOrder ? profileStatus : feedStatus;
  const order = [...(feedOrders || []), ...(profileOrders || [])].find(
    (order) => order.number === Number(id),
  );

  useEffect(() => {
    if (isProfileOrder && isAuthenticated) {
      dispatch(connectProfileOrders());
    } else if (!isProfileOrder) {
      dispatch(connectFeed());
    }
    return () => {
      if (isProfileOrder && isAuthenticated) {
        dispatch(disconnectProfileOrders());
      } else if (!isProfileOrder) {
        dispatch(disconnectFeed());
      }
    };
  }, [dispatch, isProfileOrder, isAuthenticated]);

  useEffect(() => {
    setHasError(false);
  }, [id, currentStatus]);

  useEffect(() => {
    if (currentStatus === "ONLINE" && !order) {
      const timer = setTimeout(() => {
        setHasError(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentStatus, order]);

  if (currentStatus === "CONNECTING") {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">Подключение...</p>
      </div>
    );
  }

  if (currentStatus === "OFFLINE") {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-default">
          Ошибка подключения, обновите страницу
        </p>
      </div>
    );
  }
  if (currentStatus === "ONLINE" && !order && !hasError) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">Загрузка заказа...</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">Заказ не найден</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <OrderInfoDetails />
    </div>
  );
};
