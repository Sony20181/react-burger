import { FC, useEffect } from "react";
import styles from "./feed.module.css";

import { OrdersFeed } from "../../components/orders-feed/orders-feed";
import { OrdersStatus } from "../../components/orders-feed/orders-status/orders-status";

import {
  connectFeed,
  disconnectFeed,
} from "../../services/actions/feedActions";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

export const FeedPage: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, total, totalToday, status } = useAppSelector(
    (state) => state.feed,
  );

  useEffect(() => {
    dispatch(connectFeed());

    return () => {
      dispatch(disconnectFeed());
    };
  }, [dispatch]);

  if (status === "CONNECTING") {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">
          Подключение к ленте заказов...
        </p>
      </div>
    );
  }
  if (status === "OFFLINE") {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">
          Произошла ошибка, попробуйте перезагрузить страницу
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <OrdersFeed orders={orders} title="Лента заказов" />
      <OrdersStatus total={total} totalToday={totalToday} orders={orders} />
    </div>
  );
};
