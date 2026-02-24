import styles from "./home.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
function HomePage({ isOrderModalOpen, closeOrderModal, openOrderModal }) {
  const { items, loading, error } = useSelector((state) => state.ingredients);
  if (loading) {
    return <div>Пожалуйста, подождите. Ваши бургеры загружаются...</div>;
  }
  if (error) {
    return (
      <div>
        Просим прощение за неудобства,попробуйте перезагрузить страницу или
        вернуться позже...
      </div>
    );
  }
  if (!items || items.length === 0) {
    return <div>Продукты закончились... Приходите позже!</div>;
  }
  return (
    <div className={`${styles.main} p-4`}>
      <section className={`${styles.sectionBurgerIngredients}`}>
        <BurgerIngredients />
      </section>
      <section className={`${styles.sectionBurgerConstructor} p-4`}>
        <BurgerConstructor
          isOpenModal={isOrderModalOpen}
          closeModal={closeOrderModal}
          openModal={openOrderModal}
        />
      </section>
    </div>
  );
}

HomePage.propTypes = {
  isOrderModalOpen: PropTypes.bool,
  closeOrderModal: PropTypes.func.isRequired,
  openOrderModal: PropTypes.func.isRequired,
};

export default HomePage;
