import { Fragment } from "react";
import { HelmetHead } from '../../components';
import './HomeView.scss';

const Home = () => {
  return (
    <Fragment>
      <HelmetHead title="A starting template for your web project using React, Rollup,
        Yarn monorepo, and Server-side rendering (SSR)." description="Web project description" />
      <section className="guide">
        <h1>Welcome to Your Web Project</h1>
        <p>This is a starting template for your web project using React, Rollup, SASS, Yarn monorepo,
          and Server-side rendering (SSR).</p>
        <h2>Getting Started</h2>
        <ol>
          <li>To change this page open src/views/HomeView/HomeView.tsx file and make modifications.</li>
          <li>To add a new page open src/routes/routes.tsx, and add a new route. Create the associated page in src/views.</li>
          <li>To add or change a page browser title, add or change the following: 
            <code>
            &lt;HelmetHead title="New title" description="New description" /&gt;
            </code>
          </li>
        </ol>
        <p>Now you're ready to build your awesome web application!</p>
      </section>    
    </Fragment>
  );
};

export default { component: Home };
