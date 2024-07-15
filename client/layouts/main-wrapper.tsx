import React from "react";
interface PorpsType {
  children: React.ReactNode;
  classes: string;
}
const MainWrapper = ({ children, classes }: PorpsType) => {
  return <div className={classes}>{children}</div>;
};

export default MainWrapper;
