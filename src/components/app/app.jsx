import { useEffect, useState } from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import AppHeader from "../header/header";
import styles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/slices/ingredientsSlice";

function App() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.ingredients);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  function openIngredientModal() {
    setIsIngredientModalOpen(true);
  }

  function closeIngredientModal() {
    setIsIngredientModalOpen(false);
  }

  function openOrderModal() {
    setIsOrderModalOpen(true);
  }

  function closeOrderModal() {
    setIsOrderModalOpen(false);
  }

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={`${styles.app}`}>
        <AppHeader />
        <div>Пожалуйста, подождите. Ваши бургеры загружаются...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={`${styles.app}`}>
        <AppHeader />
        <div>
          Просим прощение за неудобства,попробуйте перезагрузить страницу или
          вернуться позже...
        </div>
      </div>
    );
  }
  if (!items || items.length === 0) {
    return (
      <div className={`${styles.app}`}>
        <AppHeader />
        <div>Продукты закончились... Приходите позже!</div>
      </div>
    );
  }
  return (
    <div className={`${styles.app}`}>
      <AppHeader />
      <main className={`${styles.main} p-4`}>
        <section className={`${styles.sectionBurgerIngredients}`}>
          <BurgerIngredients
            isOpenModal={isIngredientModalOpen}
            closeModal={closeIngredientModal}
            openModal={openIngredientModal}
          />
        </section>
        <section className={`${styles.sectionBurgerConstructor} p-4`}>
          <BurgerConstructor
            isOpenModal={isOrderModalOpen}
            closeModal={closeOrderModal}
            openModal={openOrderModal}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
