import { FC, useEffect } from "react";
import styles from "./feed.module.css";

import { OrdersFeed } from "../../components/orders-feed/orders-feed";
import { OrdersStatus } from "../../components/orders-feed/orders-status/orders-status";
import { Helmet } from "react-helmet-async";

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
      <>
        <Helmet>
          <title>Лента заказов</title>
          <meta name="description" content="Следите за актуальными заказами." />
          <meta
            name="keywords"
            content="лента заказов, статистика, заказы, бургеры"
          />
        </Helmet>
        <div className={styles.container}>
          <p className="text text_type_main-medium">
            Подключение к ленте заказов...
          </p>
        </div>
      </>
    );
  }
  if (status === "OFFLINE") {
    return (
      <>
        <Helmet>
          <title>Лента заказов</title>
          <meta name="description" content="Следите за актуальными заказами" />
        </Helmet>
        <div className={styles.container}>
          <p className="text text_type_main-medium">
            Произошла ошибка, попробуйте перезагрузить страницу
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Лента заказов - Stellar Burger</title>
        <meta
          name="description"
          content={`Актуальные заказы: ${orders.length} шт. Всего выполнено: ${total} заказов, за сегодня: ${totalToday}`}
        />
        <meta
          name="keywords"
          content="лента заказов, статистика, заказы, бургеры"
        />
      </Helmet>
      <div className={styles.container}>
        <OrdersFeed orders={orders} title="Лента заказов" />
        <OrdersStatus total={total} totalToday={totalToday} orders={orders} />
      </div>
    </>
  );
};
