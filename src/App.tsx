import React from 'react';
import logo from './logo.svg';
import './App.css';
import Node from './tree/Node';
import SideBar from './main/SideBar';
import MainContent from './main/MainContent';

function App() {
  return (
    <div className="flex flex-no-wrap h-screen">
      {/* <SideBar></SideBar> */}
      <MainContent></MainContent>
    </div>
  );
}
export default App;
