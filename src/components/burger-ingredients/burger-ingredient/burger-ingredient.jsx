
import React from "react";
import { Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredient.module.css'

class BurgerIngredient extends React.Component {
    render(){
        const {item} = this.props;
        if (!item) return null;
        return(
            <div className={styles.ingredientCard}>
                <div className={styles.imageContainer}>
                    <Counter count={1} size="default" extraClass={`${styles.counter} m-1`} />
                    <img src={item.image} alt={item.name} className={styles.image}/>
                </div>
                
                <div className={`${styles.priceContainer} p-1`}>
                    <p className="text text_type_main-default">{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${styles.name} text text_type_main-default`}>
                    {item.name}
                </p>
            </div>
        );
    };
}


export default BurgerIngredient;