import './App.css';

import { Card, Navbar } from 'react-bootstrap';

import { Timeline } from './components/timeline';
import { BitcoinViewer } from './components/bitcoinViewer';

function App() {
  return (
    <>
      <header className="sticky-top">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">The Great Bet</Navbar.Brand>
        </Navbar>
      </header>
      <main className="container">
        <Card bg="dark">
          <Card.Body>
            <Timeline />
          </Card.Body>
        </Card>
      </main>
      <footer>
        <BitcoinViewer />
      </footer>
    </>
  );
}

export default App;
