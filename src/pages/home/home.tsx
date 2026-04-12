import styles from "./home.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { useAppSelector } from "../../hooks/redux";
import { FC } from "react";
import { Helmet } from "react-helmet-async";

type HomePageProps = {
  isOrderModalOpen: boolean;
  closeOrderModal: () => void;
  openOrderModal: () => void;
};

export const HomePage: FC<HomePageProps> = ({
  isOrderModalOpen,
  closeOrderModal,
  openOrderModal,
}) => {
  const { items, loading, error } = useAppSelector(
    (state) => state.ingredients,
  );
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
    <>
      <Helmet>
        <title>Соберите свой бургер</title>
        <meta
          name="description"
          content="Соберите бургер из космических ингредиентов"
        />
        <meta name="keywords" content="бургер, космос, доставка, еда" />
      </Helmet>
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
    </>
  );
};
