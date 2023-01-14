import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import './App.css';

function App() {
  useEffect(() => {
    document.title = 'Auto Classifieds - Buy & Sell Cars';
  });

  return (
    <HashRouter>
      <BaseLayout />
    </HashRouter>
  );
}

export default App;
