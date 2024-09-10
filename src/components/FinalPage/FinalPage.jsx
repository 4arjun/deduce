import React from "react";
import Mascot from "./Mascot/Mascot";
import {Navigate} from 'react-router-dom';


const FinalPage = () => {

  if (localStorage.getItem('level_number') < 21) {
    return <Navigate to="/game" />;
  }  

  return <>
    <Mascot/>
  </>;
};

export default FinalPage;