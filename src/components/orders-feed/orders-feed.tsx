import { FC } from "react";
import { OrderCard } from "./order-card/order-card";
import styles from "./orders-feed.module.css";
import { Order } from "../../utils/types";

type OrdersFeedProps = {
  orders: Order[];
  title?: string;
  showStatus?: boolean;
};
export const OrdersFeed: FC<OrdersFeedProps> = ({
  orders,
  title,
  showStatus = false,
}) => {
  return (
    <div className={styles.feed}>
      {title && <h1 className="text text_type_main-large mb-5">{title}</h1>}
      <div className={styles.ordersList}>
        {orders.map((order) => (
          <OrderCard
            order={order}
            key={`${order._id}-${order.status}-${order.number}`}
            showStatus={showStatus}
          />
        ))}
      </div>
    </div>
  );
};
