import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { IngredientType } from "../../../utils/types";
import { useAppSelector } from "../../../hooks/redux";
import { useDrag } from "react-dnd";
import { DND_TYPES } from "../../../utils/dnd-types";
import { useLocation, useNavigate } from "react-router-dom";
import { FC } from "react";

type IngredientProps = {
  item: IngredientType;
};

export const BurgerIngredient: FC<IngredientProps> = ({ item }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bun, main } = useAppSelector((state) => state.burgerConstructor);

  // считаем кол-во ингредиентов
  let count = 0;
  if (item.type === "bun") {
    if (bun && bun._id === item._id) {
      count = 2;
    }
  } else {
    count = main.filter((topping) => topping._id === item._id).length;
  }

  const [{ isDrag }, dragRef] = useDrag({
    type: DND_TYPES.INGREDIENT,
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const handleClick = () => {
    navigate(`/ingredients/${item._id}`, {
      state: { background: location },
    });
  };

  if (!item) return null;
  if (isDrag) {
    return null;
  }

  return (
    !isDrag && (
      <div
        className={styles.ingredientCard}
        onClick={handleClick}
        ref={dragRef}
      >
        <div className={styles.imageContainer}>
          {count > 0 && (
            <Counter
              count={count}
              size="default"
              extraClass={`${styles.counter} m-1`}
            />
          )}
          <img src={item.image} alt={item.name} className={styles.image} />
        </div>
        <div className={`${styles.priceContainer} p-1`}>
          <p className="text text_type_main-default">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>
          {item.name}
        </p>
      </div>
    )
  );
};
