import React from 'react'; 
import '@shared-styles/style.css';
import Header from './components/Header';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='flex flex-row justify-between gap-2'>  
      <Header />
      <Navbar />
    </div>
  );
}

export default App;
