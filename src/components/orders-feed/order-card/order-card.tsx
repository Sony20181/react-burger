import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";
import { Order } from "../../../utils/types";
import { useAppSelector } from "../../../hooks/redux";

type OrderCardProps = {
  order: Order;
  showStatus?: boolean;
};
export const OrderCard: FC<OrderCardProps> = ({
  order,
  showStatus = false,
}) => {
  const location = useLocation();
  const { items } = useAppSelector((state) => state.ingredients);
  const dateFromServer = order.createdAt;

  const visibleIngredients = useMemo(() => {
    return order.ingredients
      .slice(0, 6)
      .map((id) => items.find((item) => item._id === id))
      .filter(Boolean);
  }, [order.ingredients, items]);

  const totalPrice = useMemo(() => {
    return order.ingredients.reduce((sum, id) => {
      const ingredient = items.find((item) => item._id === id);
      return sum + (ingredient?.price || 0);
    }, 0);
  }, [order.ingredients, items]);

  const statusText = {
    done: "Выполнен",
    pending: "Готовится",
    created: "Создан",
  }[order.status];

  const statusColor = order.status === "done" ? "#00CCCC" : "#F2F2F3";
  const linkPath = location.pathname.includes("/profile/orders")
    ? `/profile/orders/${order.number}`
    : `/feed/${order.number}`;

  return (
    <Link to={linkPath} state={{ background: location }}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className="text text_type_digits-default">#{order.number}</span>
          <FormattedDate date={new Date(dateFromServer)} />
        </div>
        <h3 className={`${styles.name} text text_type_main-medium mt-6 mb-6`}>
          {order.name}
        </h3>
        {showStatus && (
          <p
            className={`text text_type_main-default mt-2`}
            style={{ color: statusColor }}
          >
            {statusText}
          </p>
        )}
        <div className={styles.footer}>
          <div className={styles.ingredients}>
            <div className={styles.ingredient}>
              {visibleIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  className={styles.iconWrapper}
                  style={{ zIndex: 6 - index }}
                >
                  <img
                    src={ingredient?.image_mobile || ingredient?.image}
                    alt={ingredient?.name}
                    className={styles.icon}
                  />
                  {index === 5 && order.ingredients.length > 6 && (
                    <div className={styles.overlay}>
                      <span className="text text_type_main-default">
                        +{order.ingredients.length - 6}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.price}>
            <span className="text text_type_digits-default">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};
