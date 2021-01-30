import React from 'react';

import './App.css';

import { Card, Navbar } from 'react-bootstrap';

import { Timeline } from './components/timeline';
import { BitcoinViewer } from './components/bitcoinViewer';
import { AboutMe } from './components/aboutMe';
import { Countdown } from './components/countdown';

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
            <Countdown />
            <Timeline />
          </Card.Body>
        </Card>
      </main>
      <footer className="text-center">
        <BitcoinViewer />
        <AboutMe />
      </footer>
    </>
  );
}

export default App;
