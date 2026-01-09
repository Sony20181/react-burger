import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import PropTypes from 'prop-types';
import Modal from '../modalWindow/modal';
import OrderDetails from '../modalWindow/orderDetails';


function BurgerConstructor ({isOpenModal,closeModal,openModal,numberOrder,data}) {

    const modalOrderDetails = (
    <Modal onClose={closeModal}>
        <OrderDetails numberOrder={numberOrder}></OrderDetails>
    </Modal>);

    // временные данные для конструктора
    const buns = data.filter(item => item.type === 'bun');
    const toppings = data.filter(item => item.type !== 'bun');

    // одинаковые булочки
    const topBun = buns.length > 0 ? buns[0] : null;
    const bottomBun = buns.length > 0 ? buns[0] : null; 

    // начинка
    const ingredients = [
        toppings[0],
        toppings[1],
        toppings[2],
        toppings[3],
    ];

    const totalPrice = topBun.price * 2 + ingredients.reduce((sum,item) => sum + item.price, 0)

        return (
            <div className={`${styles.container}`}>
                {isOpenModal && modalOrderDetails}
                <div className={`${styles.containerBurger}`}>
                    {topBun && (
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${topBun.name} (верх)`}
                            price={topBun.price}
                            thumbnail={topBun.image}
                        />
                    )}
                    
                    <div className={`${styles.containerTopping}`}>
                        {
                            ingredients.length > 0 && (
                                ingredients.map((item,index)=>(
                                    <ConstructorElement
                                        key = {`${item._id}-${index}`}
                                        text = {`${item.name}`}
                                        price = {`${item.price}`}
                                        thumbnail=  {`${item.image}`}
                                    />
                                ))
                            )
                        }
                        
                        
                    </div>
                    {bottomBun && (
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bottomBun.name} (низ)`}
                            price={bottomBun.price}
                            thumbnail={bottomBun.image}
                        />
                    )} 
                </div>
        
                <div className={`${styles.footer}`}>
                    <div className={`${styles.footerPrice}`}>
                        <p className="text text_type_digits-medium">{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="medium" onClick={()=> openModal('034536')}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        );
}

BurgerConstructor.propTypes = {
    isOpenModal: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    numberOrder: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
        })
    ).isRequired
};
export default BurgerConstructor;