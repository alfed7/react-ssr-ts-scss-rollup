import type { ReactNode } from "react";
import { Footer } from "../common/components";

export interface ILandingProps {
  children: ReactNode;
}

export const LandingLayout = ({ children }: ILandingProps) => {

  return (
    <div>
      <div>{children}</div>
      <Footer/>
    </div>
  );
};

export default LandingLayout;
