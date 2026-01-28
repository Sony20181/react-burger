import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import PropTypes from "prop-types";
import { IngredientType } from "../../../utils/types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { DND_TYPES } from "../../../utils/dnd-types";

function BurgerIngredient({ item, openModal }) {
  const { bun, main } = useSelector((state) => state.burgerConstructor);

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

  if (!item) return null;

  return (
    !isDrag && (
      <div
        className={styles.ingredientCard}
        onClick={() => openModal()}
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
}

BurgerIngredient.propTypes = {
  item: IngredientType.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredient;
