import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import styles from './burger-constructor.module.css'
import PropTypes from 'prop-types'


interface BurgerConstructorProps {
    data: Array<{
        _id: string;
        name: string;
        type: string;
        price: number;
        image: string;
    }>;
}

class BurgerConstructor extends React.Component<BurgerConstructorProps> {
   
    constructor(props: BurgerConstructorProps) {
        super(props);
    }

    render(){
        console.log('Данные при рендере:', this.props.data);
        return (
            <div className={`${styles.container}`}>
                <div className={`${styles.containerBurger}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
                    <div className={`${styles.containerTopping}`}>
                        <ConstructorElement
                            text="Говяжий метеорит (отбивная)"
                            price={50}
                            thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
                        />
                        <ConstructorElement
                            text="Биокотлета из марсианской Магнолии"
                            price={50}
                            thumbnail="https://code.s3.yandex.net/react/code/meat-01.png"
                        />
                        <ConstructorElement
                            text="Соус Spicy-X"
                            price={50}
                            thumbnail="https://code.s3.yandex.net/react/code/sauce-02.png"
                        />
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={50}
                            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
                        />
                        <ConstructorElement
                            text="Соус Spicy-X"
                            price={50}
                            thumbnail="https://code.s3.yandex.net/react/code/sauce-02.png"
                        />
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={50}
                            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
                        />
                        <ConstructorElement
                            text="Соус Spicy-X"
                            price={50}
                            thumbnail="https://code.s3.yandex.net/react/code/sauce-02.png"
                        />
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={50}
                            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
                        />
                        <ConstructorElement
                            text="Соус Spicy-X"
                            price={50}
                            thumbnail="https://code.s3.yandex.net/react/code/sauce-02.png"
                        />
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={50}
                            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
                        />
                        
                    </div>
                    <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={200}
                            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                        />
                    
                </div>
        
                <div className={`${styles.footer}`}>
                    <div className={`${styles.footerPrice}`}>
                        <p className="text text_type_digits-medium">600</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        );
    }
}

export default BurgerConstructor;