import NavItemBlock from './navItem.module.css'
import PropTypes from 'prop-types';
 
function NavItem ({icon, text}) {
    return (
      <div className={`${NavItemBlock.navItem} pb-4 pt-4 pl-5 pr-5 `}>
        <span>{icon}</span>
        <p className="text text_type_main-default">{text}</p>
      </div>
    );
}

NavItem.prototype = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
}

export default NavItem;