import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import MainPanel from './MainPanel';

import { useEffect } from "react";

const LoggedInLayout = ({ children }) => {

  useEffect(()=>{
      alert("Eu estou no componente LoggedInLayout.jsx e serei executado 01 unica vez, sempre que esta pagina for carregada");
    }, []);
    
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
