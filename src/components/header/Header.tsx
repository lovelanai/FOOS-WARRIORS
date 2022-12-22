import { Link } from "react-router-dom";
import "./Header.sass";

interface HeaderProps {
  link: string;
  icon: JSX.Element;
  title: string;
  altField?: JSX.Element;
}

export const Header = ({ link, icon, title, altField }: HeaderProps) => {
  return (
    <div className="header">
      <Link to={link}>{icon}</Link>
      <h2>{title}</h2>
      <div className="altField">{altField ? altField : null}</div>
    </div>
  );
};
