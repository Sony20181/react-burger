import { ConstructorElement, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import styles from './burger-ingridients.module.css'
import BurgerIngredient from './burger-ingredient/burger-ingredient';

class BurgerIngridients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'bun'
    };
  }

  setCurrent = (value) =>{
    this.setState({current: value}); 
  }
  
 render(){
  const {current} = this.state;
  const {data} = this.props;
  const buns = data.filter(item => item.type === 'bun');
  const sauce = data.filter(item => item.type === 'sauce');
  const toppings = data.filter(item => item.type === 'main');


  return (
    <div className={`${styles.container}`}>
      <h1 className="text text_type_main-large">
        Соберите бургер
      </h1>
      <div className={`${styles.tab}`}>
        <Tab value="bun" active={current === 'bun'} onClick={() => this.setCurrent('bun')}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => this.setCurrent('sauce')}>
          Соус
        </Tab>
        <Tab value="toppings" active={current === 'toppings'} onClick={() => this.setCurrent('toppings')}>
          Начинки
        </Tab>
      </div>
         {current == 'bun' && (
            <section>
              <h2 className="text text_type_main-medium">
                Булки
              </h2>
              <div className={styles.menu}>
                {buns.length > 0 ? (
                  buns.map(item => (
                    <BurgerIngredient key={item._id} item={item} />
                  ))
                ) : (
                  <p>Булочки закончились.</p>
                )}
              </div>
              
            </section>
          )}
          { current === 'sauce' && (
            <section className={styles.section}>
              <h2 className="text text_type_main-medium">
                Соусы
              </h2>
              <div className={styles.menu}>
                {sauce.length > 0 ? (
                    sauce.map(item => (
                      <BurgerIngredient key = {item._id} item= {item}/> 
                    )) 
                  ) : (<p>Соусы закончились.</p>)
                }
              </div>
              
            </section>
          )}
          { current === 'toppings' && (
            <section className={styles.section} >
              <h2 className="text text_type_main-medium">
                Начинки
              </h2>
              <div className={styles.menu}>
                {toppings.length > 0 ? (
                    toppings.map(item => (
                      <BurgerIngredient key = {item._id} item= {item}/> 
                    )) 
                  ) : (<p>Начинка закончилась.</p>)
                }
              </div>
              
            </section>
          )}
    </div>
  );
}
}

export default BurgerIngridients;