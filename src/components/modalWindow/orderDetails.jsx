import styles from './modal.module.css'
import orderDone from '../../images/orderDone.svg'
import PropTypes from 'prop-types'

//C:\Users\sofya.kharinova\react-burger\src\images\orderDone.svg
function OrderDetails({numberOrder}){
console.log(numberOrder,"numberOrder")
return (
    <div className ={styles.orderDetails} >
        <p className="text text_type_digits-large mb-8">{numberOrder}</p>
        <p className="texts text_type_main-medium mb-15">
            идентификатор заказа
        </p>
         <img 
            src={orderDone} 
            alt="Заказ принят" 
            className="order-image mb-15"
         />
        <p className="text text_type_main-small mb-2">
             Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-small text_color_inactive mb-30">
            Дождитесь готовности на орбитальной станции
        </p>
    </div>
)
}

OrderDetails.propTypes = {
    numberOrder: PropTypes.string.isRequired,
}

export default OrderDetails;