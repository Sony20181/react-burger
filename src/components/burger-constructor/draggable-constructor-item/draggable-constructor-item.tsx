import { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "./draggable-constructor-item.module.css";
import { DND_TYPES } from "../../../utils/dnd-types";
import { useAppDispatch } from "../../../hooks/redux";
import {
  removeIngredient,
  moveIngredient,
} from "../../../services/slices/constructorSlice";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientType } from "../../../utils/types";

type ConstructorItem = IngredientType & {
  uuid: string;
};
type DraggableConstructorProps = {
  item: ConstructorItem;
  index: number;
};

type DragItem = {
  index: number;
};
const DraggableConstructorItem: FC<DraggableConstructorProps> = ({
  item,
  index,
}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, dragRef] = useDrag({
    type: DND_TYPES.CONSTRUCTOR_INGREDIENT,
    item: () => ({ index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  function handleRemoveIngredient(id: string) {
    dispatch(removeIngredient(id));
  }

  function handleMoveIngredient(dragIndex: number, hoverIndex: number) {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  }

  const [, dropRef] = useDrop({
    accept: DND_TYPES.CONSTRUCTOR_INGREDIENT,
    hover: (draggedItem: DragItem) => {
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

export default DraggableConstructorItem;
