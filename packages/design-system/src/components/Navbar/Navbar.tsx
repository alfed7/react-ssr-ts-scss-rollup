import { ReactNode, Children } from "react"
import './Navbar.scss'

export interface INavbarProps {
  children: ReactNode
}
export const Navbar = ({children}: INavbarProps) => {
  return (<nav className="navbar">
    <ul>
      {
        Children.map(children, (c, i) => (
          <li key={i}>{c}</li>
        ))
      }
    </ul>
  </nav>
  )
}