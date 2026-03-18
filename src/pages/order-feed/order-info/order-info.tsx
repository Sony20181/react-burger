import { FC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { OrderInfoDetails } from "../../../components/orders-feed/order-info-details/order-info-details";
import styles from "./order-info.module.css";
import {
  connectFeed,
  disconnectFeed,
} from "../../../services/actions/feedActions";

export const OrderInfoPage: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.feed);
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    dispatch(connectFeed());
    return () => {
      dispatch(disconnectFeed());
    };
  }, [dispatch]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      setIsWaiting(false);
    }
  }, [orders]);

  if (status === "CONNECTING" || isWaiting) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">Загрузка заказа...</p>
      </div>
    );
  }

  if (status === "OFFLINE") {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">Ошибка подключения</p>
        <p className="text text_type_main-default text_color_inactive mt-2">
          Попробуйте обновить страницу
        </p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">Заказы не найдены</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <OrderInfoDetails />
    </div>
  );
};
