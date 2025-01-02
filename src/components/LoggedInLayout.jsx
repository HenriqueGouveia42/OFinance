import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import MainPanel from './MainPanel';

const LoggedInLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="grid grid-cols-2">
        <SideBar />
        <MainPanel>{children}</MainPanel>
      </div>
    </div>
  );
};
export default LoggedInLayout;
