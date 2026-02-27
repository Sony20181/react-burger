import NavItemBlock from "./navItem.module.css";
import { FC, ReactNode } from "react";

type NavItemProps = {
  icon: ReactNode;
  text: string;
};

export const NavItem: FC<NavItemProps> = ({ icon, text }) => {
  return (
    <div className={`${NavItemBlock.navItem} pb-4 pt-4 pl-5 pr-5 `}>
      <span>{icon}</span>
      <p className={`text text_type_main-default `}>{text}</p>
    </div>
  );
};
