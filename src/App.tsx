import React from 'react';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Sidebar from './components/Sidebar';


function App() {
  return (
    <div className="App">
      <Sidebar/>
      <div className="AppContent">
      <Header/>
      <Body/>
      </div>
    </div>
  );
}

export default App;
