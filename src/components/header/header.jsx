import { Logo, BurgerIcon,ListIcon,ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles  from './header.module.css'
import navStyles from '../navMenu/navItem.module.css'
import NavItem from '../navMenu/navItem';

function AppHeader () {
        return (
            <header className={`${headerStyles.headerContainer} p-4`}>
                <Logo className = {headerStyles.headerlogo}/>
                <nav  className={`${headerStyles.headerNavMenu}`}>
                    <div className={`${navStyles.navSection}`}>
                        <NavItem 
                        icon={<BurgerIcon type="primary" />}
                        text="Конструктор"
                        />
                        <NavItem 
                            icon={<ListIcon type="secondary" />}
                            text="Лента заказов"
                        />
                    </div>
                    <div className={`${navStyles.navSection}`}>
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
