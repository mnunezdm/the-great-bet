import React, { useState } from 'react';

import './App.css';

import { Card, Navbar, Button } from 'react-bootstrap';

import Icon from '@mdi/react';
import { mdiChartLine, mdiFormatListBulleted } from '@mdi/js';

import { Timeline } from './components/timeline';
import { BitcoinViewer } from './components/bitcoinViewer';
import { AboutMe } from './components/aboutMe';
import { Countdown } from './components/countdown';
import { UserContext } from './components/userContext';
import { NavbarUser } from './components/userMenu';
import { Burndown } from './components/burndown';

function App() {
  const [showTimeline, setShowTimeline] = useState(false);

  const toggleTimeline = () => {
    setShowTimeline(!showTimeline);
  };

  return (
    <UserContext>
      <header className="sticky-top">
        <Navbar bg="dark" variant="dark" className="justify-content-between">
          <Navbar.Brand href="#home">The Great Bet</Navbar.Brand>
          <NavbarUser />
        </Navbar>
      </header>
      <main className="container">
        <Card bg="dark">
          <Button
            style={{ right: 0 }}
            onClick={toggleTimeline}
            className="position-absolute float-right p-1 m-2"
          >
            <Icon
              path={showTimeline ? mdiChartLine : mdiFormatListBulleted}
              size={1}
            />
          </Button>
          <Card.Body>
            {showTimeline ? (
              <>
                <Countdown />
                <Timeline />
              </>
            ) : (
              <Burndown />
            )}
          </Card.Body>
        </Card>
      </main>
      <footer className="text-center">
        <BitcoinViewer />
        <AboutMe />
      </footer>
    </UserContext>
  );
}

export default App;
