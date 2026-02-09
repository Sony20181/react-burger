import styles from "./modal.module.css";
import orderDone from "../../images/orderDone.svg";
import orderLoad from "../../images/orderLoad.svg";
import { useSelector } from "react-redux";

function OrderDetails() {
  const { currentOrder, loading } = useSelector((state) => state.order);
  if (loading) {
    return (
      <div className={styles.orderDetails}>
        <img
          src={orderLoad}
          alt="Загрузка заказа"
          className="order-image mb-15"
        />
        <p className="text text_type_main-large mb-2">Оформляем ваш заказ...</p>
        <p className="text text_type_main-small text_color_inactive mb-30">
          Пожалуйста,подождите!
        </p>
      </div>
    );
  }
  return (
    <div className={styles.orderDetails}>
      <p className="text text_type_digits-large mb-8">{currentOrder.number}</p>
      <p className="texts text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={orderDone} alt="Заказ принят" className="order-image mb-15" />
      <p className="text text_type_main-small mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
