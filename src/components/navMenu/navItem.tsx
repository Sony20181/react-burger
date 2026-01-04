import React, { Component } from 'react';
import NavItemBlock from './navItem.module.css'

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
}

interface NavItemState {}

class NavItem extends Component<NavItemProps, NavItemState> {
  render() {
    const { icon, text } = this.props;
    return (
      <div className={`${NavItemBlock.navItem} pb-4 pt-4 pl-5 pr-5 `}>
        <span>{icon}</span>
        <p className="text text_type_main-default">{text}</p>
      </div>
    );
  }
}

export default NavItem;