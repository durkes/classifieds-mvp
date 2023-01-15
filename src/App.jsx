import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import './App.css';

function App() {
  useEffect(() => {
    document.title = 'Auto Classifieds - Buy & Sell Cars';
  });

  return (
    <BrowserRouter>
      <BaseLayout />
    </BrowserRouter>
  );
}

export default App;
