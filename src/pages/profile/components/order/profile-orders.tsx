import { FC, useEffect, useRef } from "react";
import { ProfileNav } from "../profile-nav/profile-nav";
import { OrdersFeed } from "../../../../components/orders-feed/orders-feed";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  connectProfileOrders,
  disconnectProfileOrders,
} from "../../../../services/actions/profileOrdersActions";
import styles from "../../profile.module.css";

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

  return (
    <div className={`${styles.containerProfile} mb-6`}>
      <ProfileNav />
      <div className={`${styles.content}`}>
        {status === "CONNECTING" ? (
          <p className="text text_type_main-default">
            Получаем историю заказов...
          </p>
        ) : status === "OFFLINE" ? (
          <p className="text text_type_main-default">Ошибка подключения...</p>
        ) : orders.length === 0 ? (
          <p className="text text_type_main-default">
            История заказов отсутствует. Сделайте свой первый заказ!
          </p>
        ) : (
          <OrdersFeed orders={orders} showStatus={true} />
        )}
      </div>
    </div>
  );
};
