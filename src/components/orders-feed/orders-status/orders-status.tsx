import { FC } from "react";
import { Order } from "../../../utils/types";
import styles from "./orders-status.module.css";

type OrdersStatsProps = {
  total: number;
  totalToday: number;
  orders: Order[];
};

export const OrdersStatus: FC<OrdersStatsProps> = ({
  total,
  totalToday,
  orders,
}) => {
  // максимум 20 последних  заказов
  const doneOrders = orders
    .filter((item) => item.status === "done")
    .slice(0, 20)
    .map((item) => item.number);

  const pendingOrders = orders
    .filter((item) => item.status === "pending")
    .slice(0, 20)
    .map((item) => item.number);

  const doneFirstColumn = doneOrders.slice(0, 10);
  const doneSecondColumn = doneOrders.slice(10, 20);

  const pendingFirstColumn = pendingOrders.slice(0, 10);
  const pendingSecondColumn = pendingOrders.slice(10, 20);

  return (
    <div className={styles.orderStatusContainer}>
      <div className={styles.orderTotal}>
        <div className={styles.column}>
          <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
          <div className={styles.columnsContainer}>
            {doneFirstColumn.length > 0 && (
              <div className={styles.numbersColumn}>
                {doneFirstColumn.map((number) => (
                  <p
                    key={number}
                    className={`${styles.doneNumber} text text_type_digits-default mb-2`}
                  >
                    {number}
                  </p>
                ))}
              </div>
            )}
            {doneSecondColumn.length > 0 && (
              <div className={styles.numbersColumn}>
                {doneSecondColumn.map((number) => (
                  <p
                    key={number}
                    className={`${styles.doneNumber} text text_type_digits-default mb-2`}
                  >
                    {number}
                  </p>
                ))}
              </div>
            )}
          </div>
          {doneOrders.length >= 20 && (
            <p className="text text_type_main-small text_color_inactive mt-2">
              и ещё{" "}
              {orders.filter((item) => item.status === "done").length - 20}...
            </p>
          )}
        </div>

        <div className={styles.column}>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <div className={styles.columnsContainer}>
            {pendingFirstColumn.length > 0 && (
              <div className={styles.numbersColumn}>
                {pendingFirstColumn.map((number) => (
                  <p
                    key={number}
                    className="text text_type_digits-default mb-2"
                  >
                    {number}
                  </p>
                ))}
              </div>
            )}
            {pendingSecondColumn.length > 0 && (
              <div className={styles.numbersColumn}>
                {pendingSecondColumn.map((number) => (
                  <p
                    key={number}
                    className="text text_type_digits-default mb-2"
                  >
                    {number}
                  </p>
                ))}
              </div>
            )}
          </div>
          {pendingOrders.length >= 20 && (
            <p className="text text_type_main-small text_color_inactive mt-2">
              и ещё{" "}
              {orders.filter((item) => item.status === "pending").length - 20}
              ...
            </p>
          )}
        </div>
      </div>

      <div className={styles.totalSection}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div className={styles.totalSection}>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </div>
  );
};
