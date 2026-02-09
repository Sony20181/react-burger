import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import Modal from "../modalWindow/modal";
import OrderDetails from "../modalWindow/orderDetails";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { DND_TYPES } from "../../utils/dnd-types";
import { useMemo } from "react";
import { addBun, addIngredient } from "../../services/slices/constructorSlice";

import { createOrder, clearOrder } from "../../services/slices/orderSlice";
import DraggableConstructorItem from "./draggable-constructor-item/draggable-constructor-item";

import { clearConstructor } from "../../services/slices/constructorSlice";

function BurgerConstructor({ isOpenModal, closeModal, openModal }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.order);
  const { bun, main: ingredients } = useSelector(
    (state) => state.burgerConstructor,
  );

  const handleOrderClick = async () => {
    if (!bun || ingredients === 0) return;
    try {
      const orderDetails = [
        bun._id,
        ...ingredients.map((item) => item.id),
        bun._id,
      ];
      const result = await dispatch(createOrder(orderDetails)).unwrap();
      if (result) {
        openModal();
        dispatch(clearConstructor());
      }
    } catch (error) {
      console.error("Ошибка создания заказа:", error);
    }
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: DND_TYPES.INGREDIENT,
    drop(item) {
      if (item.type === "bun") {
        dispatch(addBun(item));
      } else {
        dispatch(addIngredient(item));
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const boxShadowStyle = isHover
    ? "0px 0px 16px rgba(133, 133, 173, 0.5)"
    : "none";

  const modalOrderDetails = (
    <Modal title="" onClose={handleCloseModal}>
      <OrderDetails />
    </Modal>
  );

  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum, item) => sum + item.price,
      0,
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  function handleCloseModal() {
    clearOrder();
    closeModal();
  }

  return (
    <div
      className={`${styles.container}`}
      ref={dropTarget}
      style={{ boxShadow: boxShadowStyle }}
    >
      {isOpenModal && modalOrderDetails}
      {bun === null && ingredients.length === 0 && (
        <h2 className={styles.emptyConstructorMessage}>
          Собери свой бургер уже сейчас!
        </h2>
      )}
      <div className={`${styles.containerBurger}`}>
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}

        <div className={`${styles.containerTopping}`}>
          {ingredients.length > 0 &&
            ingredients.map((item, index) => (
              <DraggableConstructorItem
                key={item.uuid}
                item={item}
                index={index}
              />
            ))}
        </div>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>

      <div className={`${styles.footer}`}>
        <div className={`${styles.footerPrice}`}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          disabled={!bun || loading}
          onClick={() => handleOrderClick()}
        >
          "Оформить заказ"
        </Button>
      </div>
    </div>
  );
}

BurgerConstructor.propTypes = {
  isOpenModal: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
export default BurgerConstructor;
