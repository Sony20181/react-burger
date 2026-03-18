import { FC, useEffect, useRef } from "react";
import styles from "./profile-orders.module.css";
import { OrdersFeed } from "../../../../components/orders-feed/orders-feed";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  connectProfileOrders,
  disconnectProfileOrders,
} from "../../../../services/actions/profileOrdersActions";

export const ProfileOrdersPage: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.profileOrders);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      dispatch(connectProfileOrders());
    }
    return () => {
      if (isMounted.current) {
        isMounted.current = false;
        dispatch(disconnectProfileOrders());
      }
    };
  }, [dispatch]);

  if (status === "CONNECTING") {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">
          Получаем историю заказов...
        </p>
      </div>
    );
  }
  if (status === "OFFLINE") {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">
          Ошибка подключения.Что-то пошло не так..
        </p>
      </div>
    );
  }
  if (orders.length === 0) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">
          История заказов отсутствуют. Сделайте свой первый заказ!
        </p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <OrdersFeed orders={orders} showStatus={true} />
    </div>
  );
};
