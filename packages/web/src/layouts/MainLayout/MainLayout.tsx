import type { ReactNode } from "react";
import { Footer, Header } from "../common/components";
import "./MainLayout.scss"

export interface IMainProps {
  children: ReactNode;
}

export const MainLayout = ({children}: IMainProps) => {

  return (
    <div className="main-layout">
      <Header/>
      <div className="content">{children}</div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
