import { useContext } from 'react';
import './App.css';
import RouterApp from './Router/router';
import { MenuContext } from './Context/MenuContext';

function App() {
const {isactive}=useContext(MenuContext)

  return (
    <div id={isactive && 'afterMenuClicked'} className="App">
      <RouterApp />
    </div>
  );
}

export default App;