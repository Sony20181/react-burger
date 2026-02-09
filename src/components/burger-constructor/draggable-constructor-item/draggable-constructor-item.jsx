import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import styles from "./draggable-constructor-item.module.css";
import { DND_TYPES } from "../../../utils/dnd-types";
import { useDispatch } from "react-redux";
import {
  removeIngredient,
  moveIngredient,
} from "../../../services/slices/constructorSlice";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const DraggableConstructorItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ isDragging }, dragRef] = useDrag({
    type: DND_TYPES.CONSTRUCTOR_INGREDIENT,
    item: () => ({ index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  function handleRemoveIngredient(id) {
    dispatch(removeIngredient(id));
  }

  function handleMoveIngredient(dragIndex, hoverIndex) {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  }

  const [, dropRef] = useDrop({
    accept: DND_TYPES.CONSTRUCTOR_INGREDIENT,
    hover: (draggedItem) => {
      if (draggedItem.index === index) return;
      handleMoveIngredient(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  dragRef(dropRef(ref));

  const opacity = isDragging ? 0.5 : 1;
  return (
    <div ref={ref} style={{ opacity }} className={`${styles.ingredientRow}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleRemoveIngredient(item.uuid)}
      />
    </div>
  );
};

DraggableConstructorItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default DraggableConstructorItem;
