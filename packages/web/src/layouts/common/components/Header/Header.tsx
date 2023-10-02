import { Link } from "react-router-dom";
import AppIcon from "../../../../assets/appIcon.svg"
import './Header.scss'

export interface IHeaderProps {
}

export const Header = (props: IHeaderProps) => {
  return (
    <header className="header">
      <div className="logo">
        <AppIcon style={{width: "48px"}} />
      </div>
      <nav className="navbar">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shibe">Shibe</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header