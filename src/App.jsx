import { HashRouter } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import './App.css';

function App() {
  return (
    <div>
      <HashRouter>
        <BaseLayout />
      </HashRouter>
    </div>
  );
}

export default App;
