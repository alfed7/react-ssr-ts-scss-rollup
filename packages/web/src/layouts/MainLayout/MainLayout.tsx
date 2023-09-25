import type { ReactNode } from "react";
import { Footer, Header } from "../common/components";

export interface IMainProps {
  children: ReactNode;
}

export const MainLayout = ({children}: IMainProps) => {

  return (
    <div>
      <Header/>
      <div>{children}</div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
