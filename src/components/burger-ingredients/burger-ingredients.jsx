import {  Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import {useState} from 'react';
import styles from './burger-ingredients.module.css'
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import PropTypes from 'prop-types';
import Modal from '../modalWindow/modal';
import IngredientDetails from '../modalWindow/ingredientDetails';

function BurgerIngredients ({isOpenModal,closeModal,openModal,selectedIngredient,data}) {

  const [selectedTab, setSelectedTab] = useState('bun')
  const buns = data.filter(item => item.type === 'bun');
  const sauce = data.filter(item => item.type === 'sauce');
  const toppings = data.filter(item => item.type === 'main');
  const modalIngredientDetails = (
  <Modal title = "Детали ингредиента" onClose={closeModal}>
    <IngredientDetails ingredient={selectedIngredient}/>
  </Modal>);

  return (
    <div className={`${styles.container} pt-10`}>
      {isOpenModal && modalIngredientDetails }
      <h1 className="text text_type_main-large">
        Соберите бургер
      </h1>
      <div className={`${styles.tab} pt-5 pb-10`}>
        <Tab value="bun" active={selectedTab === 'bun'} onClick={() => setSelectedTab('bun')}>
          Булки
        </Tab>
        <Tab value="sauce" active={selectedTab === 'sauce'} onClick={() => setSelectedTab('sauce')}>
          Соус
        </Tab>
        <Tab value="main" active={selectedTab === 'main'} onClick={() => setSelectedTab('main')}>
          Начинки
        </Tab>
      </div>
         {selectedTab === 'bun' && (
            <section>
              <h2 className="text text_type_main-medium">
                Булки
              </h2>
              <div className={`${styles.menu} pt-6 pb-10`}>
                {buns.length > 0 ? (
                  buns.map(item => (
                    <BurgerIngredient key={item._id} item={item} openModal={() =>openModal(item)} />
                  ))
                ) : (
                  <p>Булочки закончились.</p>
                )}
              </div>
              
            </section>
          )}
          { selectedTab === 'sauce' && (
            <section className={styles.section}>
              <h2 className="text text_type_main-medium">
                Соусы
              </h2>
              <div className={`${styles.menu} pt-6 pb-10`}>
                {sauce.length > 0 ? (
                    sauce.map(item => (
                      <BurgerIngredient key = {item._id} item= {item} openModal={() =>openModal(item)}/> 
                    )) 
                  ) : (<p>Соусы закончились.</p>)
                }
              </div>
              
            </section>
          )}
          { selectedTab === 'main' && (
            <section className={styles.section} >
              <h2 className="text text_type_main-medium">
                Начинки
              </h2>
              <div className={`${styles.menu} pt-6 pb-10`}>
                {toppings.length > 0 ? (
                    toppings.map(item => (
                      <BurgerIngredient key = {item._id} item= {item} openModal={() =>openModal(item)}/> 
                    )) 
                  ) : (<p>Начинка закончилась.</p>)
                }
              </div>
              
            </section>
          )}
    </div>
  );

}

BurgerIngredients.propTypes = {
    isOpenModal: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    selectedIngredient: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    })
    )
}

export default BurgerIngredients;