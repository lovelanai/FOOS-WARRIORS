import "./Header.sass";

interface HeaderProps {
  element?: JSX.Element;
  asideElement?: JSX.Element 
  title: string;
}

export const Header = ({ element, asideElement, title }: HeaderProps) => {
  return (
    <div className="header">
      <div className="icon">{element}</div>
      <div className="text">
        <h2 className="title">{title}</h2>
      </div>
      <div className="icon">{asideElement}</div>
    </div>
  );
};
