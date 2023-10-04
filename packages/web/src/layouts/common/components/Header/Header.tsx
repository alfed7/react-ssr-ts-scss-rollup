import { Link } from "react-router-dom";
import AppIcon from "../../../../assets/appIcon.svg"
import './Header.scss'
import { Navbar } from '@webssr/design-system'

export interface IHeaderProps {
}

export const Header = (props: IHeaderProps) => {
  return (
    <header className="header">
      <div className="logo">
        <AppIcon style={{width: "48px"}} />
      </div>

      <Navbar>
        <Link to="/">Home</Link>
        <Link to="/shibe">Shibe</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </Navbar>
    </header>
  )
}

export default Header