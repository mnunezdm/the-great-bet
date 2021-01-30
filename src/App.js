import './App.css';

import { Navbar } from 'react-bootstrap';
import { Timeline } from './components/timeline';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">The Great Bet</Navbar.Brand>
        </Navbar>
      </header>
      <section>
        <Timeline />
      </section>
    </div>
  );
}

export default App;
