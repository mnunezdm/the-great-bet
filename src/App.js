import './App.css';

import { Navbar } from 'react-bootstrap';

import { Timeline } from './components/timeline';
import { BitcoinViewer } from './components/bitcoinViewer';

function App() {
  return (
    <>
      <header className="App-header sticky-top">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">The Great Bet</Navbar.Brand>
        </Navbar>
      </header>
      <main>
        <Timeline />
      </main>
      <footer>
        <BitcoinViewer />
      </footer>
    </>
  );
}

export default App;
