import React from 'react';
import PricesManager from './components/PricesManager';
import ReactGA from 'react-ga4';

function App() {

  ReactGA.initialize('G-GGL2SMQLJY')
  ReactGA.send("pageview")

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <PricesManager />
    </div >
  )
}

export default App;
