// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// page to test html5 bar code scanner

import React, { useState } from 'react';
import Quagga from 'quagga';
import './App.css';

function App() {
  const [scannedCode, setScannedCode] = useState('');

  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#scanner-container'),
          constraints: {
            width: 480,
            height: 320,
            facingMode: 'environment',
          },
        },
        decoder: {
          readers: ['ean_reader'],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      setScannedCode(data.codeResult.code);
      Quagga.stop();
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>HTML5 Barcode Scanner</h1>
        <button onClick={startScanner}>Start Scanner</button>
        <div id="scanner-container"></div>
        <h2>Scanned Code: {scannedCode}</h2>
      </header>
    </div>
  );
}

export default App;

