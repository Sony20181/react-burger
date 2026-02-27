import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { Modal } from "../modalWindow/modal";
import OrderDetails from "../modalWindow/orderDetails";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useDrop } from "react-dnd";
import { DND_TYPES } from "../../utils/dnd-types";
import { FC, useMemo } from "react";
import { addBun, addIngredient } from "../../services/slices/constructorSlice";

import { createOrder, clearOrder } from "../../services/slices/orderSlice";
import DraggableConstructorItem from "./draggable-constructor-item/draggable-constructor-item";

import { clearConstructor } from "../../services/slices/constructorSlice";
import { useNavigate } from "react-router-dom";
import { IngredientType } from "../../utils/types";

type BurgerConstructorProps = {
  isOpenModal: boolean;
  closeModal: () => void;
  openModal: () => void;
};

type ConstructorItem = IngredientType & {
  uuid: string;
  id?: string;
};

type ConstructorState = {
  bun: IngredientType | null;
  main: ConstructorItem[];
};

export const BurgerConstructor: FC<BurgerConstructorProps> = ({
  isOpenModal,
  closeModal,
  openModal,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.order);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { bun, main: ingredients } = useAppSelector(
    (state) => state.burgerConstructor as ConstructorState,
  );

  const handleOrderClick = async () => {
    if (!bun || ingredients.length === 0) return;
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      const orderDetails = [
        bun._id,
        ...ingredients.map((item) => item._id),
        bun._id,
      ];
      // временное решение
      const result = await dispatch(
        (createOrder as any)(orderDetails),
      ).unwrap();
      if (result) {
        openModal();
        dispatch(clearConstructor({}));
      }
    } catch (error) {
      console.error("Ошибка создания заказа:", error);
    }
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: DND_TYPES.INGREDIENT,
    drop(item: IngredientType) {
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
};
