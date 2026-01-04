import { Logo, BurgerIcon,ListIcon,ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Header  from './header.module.css'
import Nav from '../navMenu/navItem.module.css'
import NavItem from '../navMenu/navItem';

function AppHeader () {
        return (
            <header className={`${Header.headerContainer} p-4`}>
                <Logo className = {Header.headerlogo}/>
                <nav  className={`${Header.headerNavMenu}`}>
                    <div className={`${Nav.navSection}`}>
                        <NavItem 
                        icon={<BurgerIcon type="primary" />}
                        text="Конструктор"
                        />
                        <NavItem 
                            icon={<ListIcon type="secondary" />}
                            text="Лента заказов"
                        />
                    </div>
                    <div className={`${Nav.navSection}`}>
                        <NavItem 
                            icon={<ProfileIcon type="secondary" />}
                            text="Личный кабинет"
                        />
                    </div>    
                </nav>
            </header>
        );
  }

export default AppHeader;
