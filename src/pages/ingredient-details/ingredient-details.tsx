import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import styles from "./ingredient-details.module.css";

function IngredientDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { items, loading } = useAppSelector((state) => state.ingredients);

  if (loading) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">Загрузка...</p>
      </div>
    );
  }
  const ingredient = items.find((item) => item._id === id);
  if (!ingredient) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">Ингредиент не найден</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-large mb-8">Детали ингредиента</h1>
      <div className={styles.ingredientDetails}>
        <img
          src={ingredient.image_large}
          alt={ingredient.name}
          className={`${styles.image} pl-4 pr-4 pb-4`}
        />
        <h3 className="text text_type_main-medium pt-4 mb-8">
          {ingredient.name}
        </h3>
        <div className={`${styles.nutrients} mb-15`}>
          <div className={styles.nutrient}>
            <p className="text text_type_main-small">Калории,ккал</p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredient.calories}
            </p>
          </div>
          <div className={styles.nutrient}>
            <p className="text text_type_main-small">Белки, г</p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredient.proteins}
            </p>
          </div>
          <div className={styles.nutrient}>
            <p className="text text_type_main-small">Жиры, г</p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredient.fat}
            </p>
          </div>
          <div className={styles.nutrient}>
            <p className="text text_type_main-small">Углеводы, г</p>
            <p className="text text_type_main-default text_color_inactive">
              {ingredient.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetailsPage;
