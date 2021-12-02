import React from 'react';
import logo from './logo.svg';
import Node from './tree/Node';
import SideBar from './main/SideBar';
import MainContent from './main/MainContent';

function App() {
  return (
    <div className="page-container">
      <SideBar />
      <MainContent></MainContent>
    </div>
  );
}
export default App;
