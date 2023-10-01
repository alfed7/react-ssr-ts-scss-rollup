import { Link } from "react-router-dom";
import './Footer.scss'

export const Footer = (props: IFooterProps) => {

  return (<footer className="footer">
    <div className="footer-content">
      <p>&copy; 2023 Your Website Name. All rights reserved.</p>
      <ul className="footer-links">
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms-of-service">Terms of Service</Link></li>
      </ul>
    </div>
  </footer>);
};

export interface IFooterProps {
};

export default Footer;
