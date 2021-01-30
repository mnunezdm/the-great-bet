import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { Spinner } from 'react-bootstrap';

import Price from '../models/price';

import './bitcoinViewer.css';

export const BitcoinViewer = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState();
  const [lastSync, setLastSync] = useState();
  const [relativeLastSync, setRelativeLastSync] = useState();
  const [syncError, setSyncError] = useState();

  useEffect(() => {
    (async () => {
      try {
        const bitcoinPrice = await Price.getPrice('bitcoin');
        setLastSync(bitcoinPrice.lastSync.toISOString());
        setBitcoinPrice(bitcoinPrice.price);
        setRelativeLastSync(moment(lastSync).fromNow());
      } catch (e) {
        setSyncError(e);
      }
    })();
  }, [bitcoinPrice, lastSync, syncError, relativeLastSync]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeLastSync(moment(lastSync).fromNow());
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, [relativeLastSync, lastSync]);

  return bitcoinPrice ? (
    <div className="price-viewer">
      <div className="price">1BTC = {bitcoinPrice}€</div>
      <div className="text-muted">{relativeLastSync}</div>
    </div>
  ) : (
    <Spinner />
  );
};
