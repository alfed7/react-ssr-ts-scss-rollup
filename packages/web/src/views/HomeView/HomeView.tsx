import { Fragment } from "react";
import { HelmetHead } from '../../components';
import { Link } from "react-router-dom";
import './HomeView.scss';

const Home = () => {
  return (
    <Fragment>
      <HelmetHead title="Home page" />
      <h1>Home page</h1>
      <div className='home-container'><Link to="/about">About</Link></div>      
    </Fragment>
  );
};

export default { component: Home };
