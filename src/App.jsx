import { HashRouter } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import './App.css';

function App() {
  return (
    <HashRouter>
      <BaseLayout />
    </HashRouter>
  );
}

export default App;
