import { FC, useMemo, useState, useEffect } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-info-details.module.css";
import { useAppSelector } from "../../../hooks/redux";
import { useParams } from "react-router-dom";

export const OrderInfoDetails: FC = () => {
  const { items, loading: ingredientsLoading } = useAppSelector(
    (state) => state.ingredients,
  );
  const { id } = useParams<{ id: string }>();
  const { orders: feedOrders, status: feedStatus } = useAppSelector(
    (state) => state.feed,
  );
  const { orders: profileOrders, status: profileStatus } = useAppSelector(
    (state) => state.profileOrders,
  );
  const [isReady, setIsReady] = useState(false);

  const order = [...(feedOrders || []), ...(profileOrders || [])].find(
    (order) => order.number === Number(id),
  );

  useEffect(() => {
    if (order && !ingredientsLoading && items.length > 0) {
      const allIngredientsExist = order.ingredients.every((ingredientId) =>
        items.some((item) => item._id === ingredientId),
      );
      if (allIngredientsExist) {
        setIsReady(true);
      } else {
        const timer = setTimeout(() => {
          setIsReady(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } else {
      setIsReady(false);
    }
  }, [order, items, ingredientsLoading]);

  const ingredientsWithCount = useMemo(() => {
    if (!order || !items.length) return [];

    const counts: { [key: string]: number } = {};
    order.ingredients.forEach((id) => (counts[id] = (counts[id] || 0) + 1));

    return Object.entries(counts)
      .map(([id, count]) => ({
        ingredient: items.find((item) => item._id === id),
        count,
      }))
      .filter((item) => item.ingredient);
  }, [order, items]);

  const totalPrice = useMemo(() => {
    return ingredientsWithCount.reduce((sum, { ingredient, count }) => {
      return sum + (ingredient?.price || 0) * count;
    }, 0);
  }, [ingredientsWithCount]);

  if (
    feedStatus === "CONNECTING" ||
    profileStatus === "CONNECTING" ||
    ingredientsLoading ||
    !isReady
  ) {
    return (
      <div className={styles.details}>
        <p className="text text_type_main-medium">Загрузка...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.details}>
        <p className="text text_type_main-medium">Заказ не найден...</p>
      </div>
    );
  }

  if (ingredientsWithCount.length === 0 && order.ingredients.length > 0) {
    return (
      <div className={styles.details}>
        <p className="text text_type_main-medium">Загрузка состава...</p>
      </div>
    );
  }

  const dateFromServer = order.createdAt;

  const statusText = {
    done: "Выполнен",
    pending: "Готовится",
    created: "Создан",
  }[order.status];

  const statusColor = order.status === "done" ? "#00CCCC" : "#F2F2F3";
  return (
    <div className={styles.details}>
      <p className={`${styles.number} text text_type_digits-default`}>
        #{order.number}
      </p>
      <h2 className="text text_type_main-medium mt-10">{order.name}</h2>
      <p
        className={`${styles.status} text text_type_main-default mt-3`}
        style={{ color: statusColor }}
      >
        {statusText}
      </p>
      <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>

      <div className={styles.ingredients}>
        {ingredientsWithCount.map(({ ingredient, count }, index) => (
          <div key={index} className={styles.ingredient}>
            <div className={styles.imageWrapper}>
              <img
                src={ingredient?.image_mobile || ingredient?.image}
                alt={ingredient?.name}
                className={styles.image}
              />
            </div>
            <span className={`${styles.name} text text_type_main-default`}>
              {ingredient?.name}
            </span>
            <div className={styles.price}>
              <span className="text text_type_digits-default">
                {count} х {ingredient?.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <FormattedDate
          date={new Date(dateFromServer)}
          className="text text_type_main-default text_color_inactive"
        />
        <div className={styles.total}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
