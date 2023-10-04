import { ReactNode, Children } from "react"
import './Navbar.scss'

export interface INavbarProps {
  children: ReactNode
}
export const Navbar = ({children}: INavbarProps) => {
  return (<nav className="navbar">
    <ul>
      {
        Children.map(children, (c) => (
          <li>{c}</li>
        ))
      }
    </ul>
  </nav>
  )
}